import React, { Component } from 'react';
import * as THREE from 'three';
import Menu from './components/Menu';
import BasePlate, {HoverableMesh} from './components/three/BasePlate';
import Columns from './components/three/Columns';
import {basePlateLength, basePlateWidth} from './constants';
import './App.css';
import { OrbitControls } from 'three-orbitcontrols-ts';

class App extends Component<{}, {interfaceState: string}> {
  mount: HTMLDivElement | null;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  frameId: number | null;
  basePlate: BasePlate;
  columns: Columns;
  controls: OrbitControls | null;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  clickedMouse?: THREE.Vector2;

  constructor(props: {}) {
    super(props);
    this.state = {
      interfaceState: 'VIEW',
    };
    this.mount = null;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xffffff );
    this.camera = new THREE.PerspectiveCamera( 70, 1, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = null;

    this.basePlate = new BasePlate(this.scene, basePlateLength, basePlateWidth, this.placeColumn);
    this.columns = new Columns(this.scene, basePlateLength, basePlateWidth);

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
      this.controls.maxPolarAngle = Math.PI/2 -0.02;
      this.controls.minDistance = 0;
      this.controls.maxDistance = Infinity;

      this.controls.enableZoom = true;
      this.controls.zoomSpeed = 1.0;

      window.addEventListener( 'mousemove', this.onMouseMove, false );
      
      this.start()
    }
  }

  componentWillUnmount(){
    this.stop()
    if(this.mount) {
      this.mount.removeChild(this.renderer.domElement)
    }
  }

  onMouseMove = ( event: MouseEvent ) => {
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
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
    this.checkRayCollisions();
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  checkRayCollisions = () => {
    const {interfaceState} = this.state;
    if(interfaceState == "ADD_COLUMN") {
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects( this.basePlate.getHoverableObjects() );

      if(intersects.length) {
        (intersects[0].object as HoverableMesh).onHover(this.state.interfaceState);
      }
    } else if (interfaceState == "RESIZE_COLUMN" && this.clickedMouse && this.controls) {
      const zoomDistance = this.controls.target.distanceTo( this.controls.object.position )
      this.columns.resizeSelectedColumn(Math.round((this.mouse.y - this.clickedMouse.y) * zoomDistance / 2));
    }
  }

  clickOnScene = () => {
    const {interfaceState} = this.state;
    if(interfaceState == "ADD_COLUMN") {
      this.clickedMouse = this.mouse.clone();
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects( this.basePlate.getHoverableObjects() );
  
      if(intersects.length) {
        (intersects[0].object as HoverableMesh).onClick(this.state.interfaceState);
      }
    } else if (interfaceState == "RESIZE_COLUMN") {
      this.clickedMouse = undefined;
      this.setState({
        interfaceState: "VIEW",
      });
      this.columns.deselectColumn();
    }
  }

  placeColumn = (length: number, width: number) => {
    if(this.state.interfaceState == "ADD_COLUMN"){
      this.changeInterfaceState("RESIZE_COLUMN");
      this.columns.addColumn(length, width);
    }
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  public changeInterfaceState = (newState: string) => {
    this.setState({
      interfaceState: newState,
    })
  }

  render(){
    return(
      <div className={`App ${this.state.interfaceState}`}>
        <div
          style={{ width: '100%', height: '100%' }}
          ref={(mount) => { this.mount = mount }}
          onClick={this.clickOnScene}
        />
        <Menu interfaceState={this.state.interfaceState} changeInterfaceState={this.changeInterfaceState} />
      </div>
    )
  }
}
export default App;
