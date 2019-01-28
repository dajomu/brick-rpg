import { brickLength, wireFrameColour } from './constants';
import * as THREE from 'three';

export const initBlankSquares = function(basePlateLength: number, basePlateWidth: number) {
  const squares:{[key: string]: boolean} = {};
  for(let length = 1; length <= basePlateLength; length++) {
    for(let width = 1; width <= basePlateWidth; width++) {
      squares[`${length}-${width}`] = false;
    }
  }
  return squares;
}

const geometry = new THREE.BoxGeometry( brickLength, 0.1, brickLength );
const material = new THREE.MeshBasicMaterial( {color: 0xeeeeee} );
const outlineGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry( geometry )
const outlineMaterial = new THREE.LineBasicMaterial( { color: wireFrameColour, linewidth: 100 } );

export const createPlateSquareComponents = function() {
  const cube = new THREE.Mesh( geometry, material );
  const cubeOutline = new THREE.LineSegments( outlineGeometry, outlineMaterial );
  return { cube, cubeOutline };
}
