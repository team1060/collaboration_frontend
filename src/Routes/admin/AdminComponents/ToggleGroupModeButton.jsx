// 관리자 버튼 기능 
import { Button } from '@mui/material';
import React from 'react';

const ToggleGroupModeButton = ({ groupMode, setGroupMode }) => (
    <Button  variant="contained" color="primary" onClick={() => setGroupMode(groupMode === 'stacked' ? 'grouped' : 'stacked')}>
       보기전환
    </Button>
  //   <Button variant="contained" color="primary">
  //   이벤트 전체보기
  // </Button>
);

export default ToggleGroupModeButton;
