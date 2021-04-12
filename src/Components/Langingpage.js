import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/game.png';
import { motion } from 'framer-motion';
const Langingpage = (props) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className='page landing-page'
    >
      <div className='pagecontent'>
        <h1>Tic-Tac-Toe</h1>
        <motion.img
          initial={{ rotate: 178, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          src={image}
          alt='tic-tac-toe'
          className='img-fluid'
        />
        <Link to='/tic-tac-toe/player'>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 1,
            }}
          >
            Get Started
          </motion.button>
        </Link>
      </div>
      <p className='developer'>
        by{' '}
        <a
          href='https://www.linkedin.com/in/ashutoshbisoyi/'
          target='_blank'
          rel='noreferrer'
        >
          ashutoshbisoyi
        </a>
      </p>
    </motion.div>
  );
};

export default Langingpage;
