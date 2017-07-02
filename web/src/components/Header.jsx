import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom'

const Header = () => (
  <Toolbar>
    <ToolbarGroup firstChild={true}>
      <ToolbarTitle text=" ..eeboo.com" />
    </ToolbarGroup>
    <ToolbarGroup>
      <div>
      <FlatButton
        label="Home"
        primary={true}
        containerElement={<Link to="/"/>}
      />
      <FlatButton
        label="About"
        primary={true}
        containerElement={<Link to="/about"/>}
      />
      <FlatButton
        label="Admin"
        primary={true}
        containerElement={<Link to="/admin"/>}
      />
      </div>
    </ToolbarGroup>
  </Toolbar>

)

export default Header;
