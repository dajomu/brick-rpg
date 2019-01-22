import React, { Component } from 'react';
import * as THREE from 'three';
import BasePlate from './components/three/BasePlate';
import {basePlateLength, basePlateWidth} from './constants';
import './App.css';

class App extends Component {
  mount: HTMLDivElement | null;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  frameId: number | null;
  basePlate: BasePlate;

  constructor(props: any) {
    super(props);
    this.mount = null;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xffffff );
    this.camera = new THREE.PerspectiveCamera();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

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
      this.camera.position.z = 4
      
      this.renderer.setClearColor('#000000')
      this.renderer.setSize(width, height)
      this.mount.appendChild(this.renderer.domElement)
      
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
