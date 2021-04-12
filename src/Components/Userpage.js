import React, { useState } from 'react';
import image from '../assets/joystick.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { ImCross } from 'react-icons/im';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const Userpage = () => {
  const [player1Name, setplayer1Name] = useState();
  const [player2Name, setplayer2Name] = useState();
  const history = useHistory();

  const submitUser = () => {
    if (
      player1Name === undefined ||
      player2Name === undefined ||
      player1Name === '' ||
      player2Name === ''
    ) {
      toast.error('Enter the player name');
    } else {
      localStorage.setItem('player1Name', player1Name.slice(0, 10));
      localStorage.setItem('player2Name', player2Name.slice(0, 10));
      localStorage.setItem('player1Score', 0);
      localStorage.setItem('player2Score', 0);
      history.push('/game');
    }
  };

  return (
    <>
      <ToastContainer position='bottom-center' closeOnClick width='300px' />
      <div className='page player-page'>
        <div className='pagecontent'>
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            src={image}
            alt='player selection'
            className='img-fluid'
          />
          <>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='input-group mb-3'
            >
              <input
                type='text'
                className='form-control'
                placeholder='Player 1'
                onChange={(e) => setplayer1Name(e.target.value)}
              />
              <span className='input-group-text' id='basic-addon1'>
                <ImCross />
              </span>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='input-group mb-3'
            >
              <input
                type='text'
                className='form-control'
                placeholder='Player 2'
                onChange={(e) => setplayer2Name(e.target.value)}
              />
              <span className='input-group-text' id='basic-addon1'>
                <RiCheckboxBlankCircleLine />
              </span>
            </motion.div>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0.6,
              }}
              type='submit'
              className='btn btn-primary'
              onClick={submitUser}
            >
              Start Playing
            </motion.button>
          </>
        </div>
      </div>
    </>
  );
};

export default Userpage;
