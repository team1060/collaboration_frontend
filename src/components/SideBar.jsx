// src/components/SideBar.jsx
import React, { useState } from 'react';
import { Button, Drawer } from '@mui/material';

const SideBar = () => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ left: open });
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Add your sidebar content here */}
      <p>This is the left sidebar.</p>
    </div>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Open Left Sidebar</Button>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default SideBar;
