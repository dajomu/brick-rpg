import { brickHeight, brickLength } from '../../constants';
import * as THREE from 'three';

export default class BasePlate {
  squares = new THREE.Group();

  constructor(scene: THREE.Scene, basePlateLength: number, basePlateWidth: number) {
    this.initSquares(basePlateLength, basePlateWidth);
    scene.add(this.squares);
  }

  private initSquares = (basePlateLength: number, basePlateWidth: number) => {
    for(let length = 1; length <= basePlateLength; length++) {
      for(let width = 1; width <= basePlateWidth; width++) {
        this.createSquare(length, width);
      }
    }
  }
  private createSquare = (length: number, width: number) => {
    const square = new THREE.Group();
    const geometry = new THREE.BoxGeometry( brickLength, 0.1, brickLength );
    const material = new THREE.MeshNormalMaterial(  );
    const cube = new THREE.Mesh( geometry, material );
    cube.scale.multiplyScalar(0.99);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    const cubeOutline = new THREE.Mesh( geometry, wireframeMaterial );
    square.add(cube);
    square.add(cubeOutline);
    square.position.add(new THREE.Vector3(length, 0, width));
    this.squares.add(square)
  }
}
