import React, { Component } from 'react';
import { basePlateLength, basePlateWidth, interfaceStates } from '../constants';
import { initBlankSquares } from '../utils';
import './Menu.css';



interface MenuProps {
  changeInterfaceState: (newState: string) => void;
  interfaceState: string;
}

interface MenuState {
  selectedSquares: {[key: string]: boolean};
}

class Menu extends Component<MenuProps, MenuState> {

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      selectedSquares: initBlankSquares(basePlateLength, basePlateWidth),
    }
  }

  selectSquare = (squareKey: string) => {
    console.log('selectSquare', squareKey);
    this.setState({
      selectedSquares: {...this.state.selectedSquares, [squareKey]: !this.state.selectedSquares[squareKey]}
    })
  }

  render () {
    const { changeInterfaceState, interfaceState } = this.props;
    const { selectedSquares } = this.state;
    console.log(this.state.selectedSquares);
    return (
      <div className="Menu">
        <button
          className={`menu-button ${interfaceState == interfaceStates.ADD_COLUMN ? 'selected' : ''}`}
          onClick={() => {changeInterfaceState(interfaceState == interfaceStates.ADD_COLUMN ? interfaceStates.VIEW : interfaceStates.ADD_COLUMN)}}
          >Add Column</button>
        <button
          className={`menu-button ${interfaceState == interfaceStates.CREATE_PLATFORM ? 'selected' : ''}`}
          onClick={() => {changeInterfaceState(interfaceState == interfaceStates.CREATE_PLATFORM ? interfaceStates.VIEW : interfaceStates.CREATE_PLATFORM)}}
          >Add Platform</button>
          {interfaceState == interfaceStates.CREATE_PLATFORM && <div className="platform-editor">
            {Object.keys(selectedSquares).map(squareKey => 
            <div
              className={`platform-square ${selectedSquares[squareKey] ? 'selected' : ''}`}
              key={squareKey}
              onClick={() => {this.selectSquare(squareKey)}}
              ></div>)}
          </div>}
      </div>
    )
  }
}
export default Menu;