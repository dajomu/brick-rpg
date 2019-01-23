import React, { Component } from 'react';
import './Menu.css';

interface MenuProps {
  changeInterfaceState: (newState: string) => void;
  interfaceState: string;
}

class Menu extends Component<MenuProps> {

  constructor(props: MenuProps) {
    super(props);
    console.log(props);
  }


render () {
  const { changeInterfaceState, interfaceState } = this.props;
    return(
      <div className="Menu">
        <button
          className={`menu-button ${interfaceState == "ADD_COLUMN" ? 'selected' : ''}`}
          onClick={() => {changeInterfaceState(interfaceState == "ADD_COLUMN" ? "VIEW" : "ADD_COLUMN")}}
          >Add Column</button>
      </div>
    )
  }
}
export default Menu;