import { brickHeight, brickLength, wireFrameColour, selectedWireFrameColour } from '../../constants';
import * as THREE from 'three';

export interface HoverableMesh extends THREE.Mesh {
  onHover: any;
  onClick: any;
}

export default class Columns {
  scene: THREE.Scene
  columns = new THREE.Group();
  basePlateLength: number;
  basePlateWidth: number;
  resizeColumn?: THREE.Group;

  constructor(scene: THREE.Scene, basePlateLength: number, basePlateWidth: number) {
    this.scene = scene;
    this.basePlateLength = basePlateLength;
    this.basePlateWidth = basePlateWidth;
    this.columns.position.add(new THREE.Vector3(-(basePlateLength * brickLength /2), 0, -(basePlateWidth * brickLength /2) ));
    scene.add(this.columns);
  }

  public addColumn = (length: number, width: number) => {
    const column = new THREE.Group();
    const geometry = new THREE.BoxGeometry( brickLength, brickHeight, brickLength );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    const cube = new THREE.Mesh( geometry, material );

    const outlineGeometry = new THREE.EdgesGeometry( geometry );
    const outlineMaterial = new THREE.LineBasicMaterial( { color: selectedWireFrameColour, linewidth: 100 } );
    const cubeOutline = new THREE.LineSegments( outlineGeometry, outlineMaterial );

    column.add(cube);
    column.add(cubeOutline);
    column.position.add(new THREE.Vector3(length * brickLength, 0.56, width * brickLength));
    column.name = `column-${length}-${width}`;
    this.columns.add(column);
    this.resizeColumn = column;
  }

  public resizeSelectedColumn = (length: number) => {
    if(this.resizeColumn && length > 0) {
      this.resizeColumn.children.forEach(child => {
        child.scale.setY(length);
      });
      this.resizeColumn.position.setY(length/2)
    }
  }

  public deselectColumn() {
    if(this.resizeColumn) {
      ((this.resizeColumn.children[1] as THREE.LineSegments).material as any).color.set(wireFrameColour);
      this.resizeColumn = undefined;
    }
  }
}