import React, { Component } from 'react';
import * as THREE from 'three';
import BasePlate from './components/three/BasePlate';
import {basePlateLength, basePlateWidth} from './constants';
import './App.css';
import { OrbitControls } from 'three-orbitcontrols-ts';

class App extends Component {
  mount: HTMLDivElement | null;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  frameId: number | null;
  basePlate: BasePlate;
  controls: OrbitControls | null;

  constructor(props: any) {
    super(props);
    this.mount = null;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xffffff );
    this.camera = new THREE.PerspectiveCamera( 70, 1, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = null;

    this.basePlate = new BasePlate(this.scene, basePlateLength, basePlateWidth);

    this.frameId = null;
  }

  componentDidMount = () => {
    if (this.mount) {
      const width = this.mount.clientWidth
      const height = this.mount.clientHeight

      this.camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      )
      this.camera.position.z = basePlateLength / 2;
      this.camera.position.y = 5;
      
      this.renderer.setClearColor('#000000')
      this.renderer.setSize(width, height)
      this.mount.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minPolarAngle = 0;
      this.controls.maxPolarAngle = Math.PI;
      this.controls.minDistance = 0;
      this.controls.maxDistance = Infinity;

      this.controls.enableZoom = true;
      this.controls.zoomSpeed = 1.0;
      
      this.start()
    }
  }

  componentWillUnmount(){
    this.stop()
    if(this.mount) {
      this.mount.removeChild(this.renderer.domElement)
    }
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId)
    }
  }

  animate = () => {
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render(){
    return(
      <div className="App">
        <div
          style={{ width: '100%', height: '100%' }}
          ref={(mount) => { this.mount = mount }}
        />
      </div>
    )
  }
}
export default App;
