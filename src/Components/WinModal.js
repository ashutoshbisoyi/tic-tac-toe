import React from 'react';
import winnerGif1 from '../assets/win.gif';
const WinModal = () => {
  return (
    <div className='modal win-modal'>
      <div className='content'>
        <img src={winnerGif1} alt='winner' className='img-fluid' />
        <h1>Text</h1>
      </div>
    </div>
  );
};

export default WinModal;
