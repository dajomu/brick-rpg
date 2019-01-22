import { brickHeight, brickLength } from '../../constants';
import * as THREE from 'three';

export default class BasePlate {
  squares = new THREE.Group();
  hoverableObjects: Array<HoverableMesh> = [];

  constructor(scene: THREE.Scene, basePlateLength: number, basePlateWidth: number) {
    this.initSquares(basePlateLength, basePlateWidth);
    this.squares.position.add(new THREE.Vector3(-(basePlateLength * brickLength /2), 0, -(basePlateWidth * brickLength /2) ));
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
    const material = new THREE.MeshBasicMaterial( {color: 0xdddddd} );
    const cube = new THREE.Mesh( geometry, material );

    const outlineGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry( geometry )
    const outlineMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 100 } );
    const cubeOutline = new THREE.LineSegments( outlineGeometry, outlineMaterial );

    square.add(cube);
    square.add(cubeOutline);
    square.position.add(new THREE.Vector3(length * brickLength, 0, width * brickLength));
    square.name = `brick-${length}-${width}`;
    this.squares.add(square)
  }
}
