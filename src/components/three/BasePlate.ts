import { brickHeight, brickLength, interfaceStates, selectedWireFrameColour } from '../../constants';
import { createPlateSquareComponents } from '../../utils';
import * as THREE from 'three';

export interface HoverableMesh extends THREE.Mesh {
  onHover: any;
  onClick: any;
}

const createGhostBrick = () => {
  const geometry = new THREE.BoxGeometry( brickLength, brickHeight, brickLength );
  const outlineGeometry = new THREE.EdgesGeometry( geometry );
  const outlineMaterial = new THREE.LineBasicMaterial( { color: selectedWireFrameColour, linewidth: 100 } );
  return new THREE.LineSegments( outlineGeometry, outlineMaterial );
}

export default class BasePlate {
  ghostBrick = createGhostBrick();
  hoverableObjects: Array<HoverableMesh> = [];
  scene: THREE.Scene
  squares = new THREE.Group();
  basePlateLength: number;
  basePlateWidth: number;
  placeColumn: (length: number, width: number) => void;

  constructor(scene: THREE.Scene, basePlateLength: number, basePlateWidth: number, placeColumn: (length: number, width: number) => void) {
    this.scene = scene;
    this.basePlateLength = basePlateLength;
    this.basePlateWidth = basePlateWidth;
    this.placeColumn = placeColumn;
    this.initSquares(basePlateLength, basePlateWidth);
    this.squares.position.add(new THREE.Vector3(-(basePlateLength * brickLength /2), 0, -(basePlateWidth * brickLength /2) ));
    this.initGhostBrick();
    scene.add(this.squares);
  }

  initGhostBrick() {
    this.ghostBrick.position.set(0, 0.6, 0);
    this.ghostBrick.visible = false;
    this.scene.add(this.ghostBrick);
  }

  placeGhostBrick(length: number, width: number) {
    this.ghostBrick.position.set(((length - this.basePlateLength/2) * brickLength), brickHeight/2, ((width - this.basePlateWidth/2) * brickLength));
    this.ghostBrick.visible = true;
  }

  hideGhostBrick () {
    this.ghostBrick.visible = false;
  }

  public getHoverableObjects() {
    return this.hoverableObjects;
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
    const { cube, cubeOutline } = createPlateSquareComponents();
    (cube as HoverableMesh).onHover = (interfaceState: string) => {if(interfaceState == interfaceStates.ADD_COLUMN) {this.placeGhostBrick(length, width)}}
    (cube as HoverableMesh).onClick = (interfaceState: string) => {
      this.hideGhostBrick();
      if(interfaceState == interfaceStates.ADD_COLUMN) {
        this.placeColumn(length, width);
      }
    }

    square.add(cube);
    square.add(cubeOutline);
    this.hoverableObjects.push(cube as HoverableMesh)
    square.position.add(new THREE.Vector3(length * brickLength, 0, width * brickLength));
    square.name = `brick-${length}-${width}`;
    this.squares.add(square)
  }
}
