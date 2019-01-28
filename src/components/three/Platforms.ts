import { brickHeight, brickLength, wireFrameColour, selectedWireFrameColour } from '../../constants';
import { initBlankSquares } from '../../utils';
import * as THREE from 'three';

export interface HoverableMesh extends THREE.Mesh {
  onHover: any;
  onClick: any;
}

export default class Platforms {
  scene: THREE.Scene
  platforms = new THREE.Group();
  basePlateLength: number;
  basePlateWidth: number;
  editablePlatform = new THREE.Group();

  constructor(scene: THREE.Scene, basePlateLength: number, basePlateWidth: number) {
    this.scene = scene;
    this.basePlateLength = basePlateLength;
    this.basePlateWidth = basePlateWidth;
    this.platforms.position.add(new THREE.Vector3(-(basePlateLength * brickLength /2), 0, -(basePlateWidth * brickLength /2) ));
    scene.add(this.platforms);
    scene.add(this.editablePlatform);
  }

  createEditablePlatform = () => {
    this.editablePlatform.children.forEach(child => this.editablePlatform.remove(child));
    Object.keys(initBlankSquares(this.basePlateLength, this.basePlateWidth)).forEach(squareKey => {
      const coords = squareKey.split('-');
      console.log(coords);
    })
  }

  updateEditablePlatform = (squareMap: {[key: string]: boolean}) => {

  }
}