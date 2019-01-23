import { brickHeight, brickLength } from '../../constants';
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

    const outlineGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry( geometry )
    const outlineMaterial = new THREE.LineBasicMaterial( { color: 0x222222, linewidth: 100 } );
    const cubeOutline = new THREE.LineSegments( outlineGeometry, outlineMaterial );

    column.add(cube);
    column.add(cubeOutline);
    column.position.add(new THREE.Vector3(length * brickLength, 0.56, width * brickLength));
    column.name = `column-${length}-${width}`;
    this.columns.add(column);
  }
}