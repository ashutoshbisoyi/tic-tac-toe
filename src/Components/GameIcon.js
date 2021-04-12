import React from 'react';
import circleImg from '../assets/circle.svg';
import crossImg from '../assets/cross.svg';
import questionImg from '../assets/question.svg';
const GameIcon = ({ iconName }) => {
  switch (iconName) {
    case 'circle':
      return <img src={circleImg} alt='circle' className='img-fluid' />;
    case 'cross':
      return <img src={crossImg} alt='cross' className='img-fluid' />;
    default:
      return <img src={questionImg} alt='question' className='img-fluid' />;
  }
};

export default GameIcon;
