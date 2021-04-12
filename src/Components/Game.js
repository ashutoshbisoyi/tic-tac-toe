import React, { useState } from 'react';
import GameIcon from './GameIcon';
import vsImg from '../assets/vs.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import winnerGif1 from '../assets/win.gif';
import WinModal from './WinModal';
import { GrPowerReset } from 'react-icons/gr';
import { CgLogOut } from 'react-icons/cg';
import { Redirect, useHistory } from 'react-router';
import { motion } from 'framer-motion';

const itemArray = new Array(9).fill('empty');

const Game = () => {
  const [isCircle, setIsCircle] = useState(false);
  const [winMessage, setWinMessage] = useState();
  const [draw, setDraw] = useState(false);
  const [player1Name] = useState(localStorage.getItem('player1Name'));
  const [player2Name] = useState(localStorage.getItem('player2Name'));
  const history = useHistory();

  const player1Tag = player1Name && player1Name.slice(0, 1);
  const player2Tag = player2Name && player2Name.slice(0, 1);

  const player1Score = parseInt(localStorage.getItem('player1Score'));
  const player2Score = parseInt(localStorage.getItem('player2Score'));

  const resetGame = () => {
    setIsCircle(false);
    setWinMessage('');
    setDraw(false);
    itemArray.fill('empty', 0, 9);
  };

  const quitGame = () => {
    resetGame();
    localStorage.removeItem('player1Name');
    localStorage.removeItem('player2Name');
    localStorage.removeItem('player1Score');
    localStorage.removeItem('player2Score');
    history.push('/');
  };

  const handleDraw = () => {
    setDraw(true);
    toast.error('Oops! Game Draw');
  };
  const decideWinner = () => {
    setWinMessage(`Yeh! ${isCircle ? player2Name : player1Name} Won`);
    isCircle
      ? localStorage.setItem('player2Score', player2Score + 1)
      : localStorage.setItem('player1Score', player1Score + 1);
    toast.success(`Yeh! ${isCircle ? player2Name : player1Name} Won`);
  };
  const checkWinner = () => {
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== 'empty'
    ) {
      decideWinner();
    } else if (
      itemArray[3] === itemArray[4] &&
      itemArray[3] === itemArray[5] &&
      itemArray[3] !== 'empty'
    ) {
      decideWinner();
    } else if (
      itemArray[6] === itemArray[7] &&
      itemArray[6] === itemArray[8] &&
      itemArray[6] !== 'empty'
    ) {
      decideWinner();
    } else if (
      itemArray[0] === itemArray[3] &&
      itemArray[0] === itemArray[6] &&
      itemArray[0] !== 'empty'
    ) {
      decideWinner();
    } else if (
      itemArray[1] === itemArray[4] &&
      itemArray[1] === itemArray[7] &&
      itemArray[1] !== 'empty'
    ) {
      decideWinner();
    } else if (
      itemArray[2] === itemArray[5] &&
      itemArray[2] === itemArray[8] &&
      itemArray[2] !== 'empty'
    ) {
      decideWinner();
    } else if (
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8] &&
      itemArray[0] !== 'empty'
    ) {
      decideWinner();
    } else if (
      itemArray[2] === itemArray[4] &&
      itemArray[2] === itemArray[6] &&
      itemArray[2] !== 'empty'
    ) {
      decideWinner();
    } else if (!itemArray.includes('empty')) {
      handleDraw();
    }
  };
  const handleClick = (itemNumber) => {
    if (winMessage) {
      return toast.success(winMessage);
    }
    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCircle ? 'circle' : 'cross';
      setIsCircle(!isCircle);
    } else {
      return toast.error('Filled Already');
    }
    checkWinner();
  };

  return (
    <>
      {player1Name && player2Name ? (
        <>
          <WinModal />
          <ToastContainer position='bottom-center' closeOnClick width='300px' />
          <div className='game-page'>
            <div className='statistics'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
                className='player p1'
              >
                {player1Tag}
              </motion.div>
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <h3>Score Board</h3>
                <h4>
                  {player1Score ? player1Score : 0} :{' '}
                  {player2Score ? player2Score : 0}
                </h4>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.4,
                }}
                className='player p2'
              >
                {player2Tag}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.4,
              }}
              className='player-info'
            >
              <h5>
                {player1Name} <img src={vsImg} alt='vs' className='img-fluid' />{' '}
                {player2Name}
              </h5>
            </motion.div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className='play-board'
            >
              <div className='row'>
                {itemArray.map((value, index) => {
                  let classname = `box b${index}`;
                  let delaytime = `0.${1 + index}`;
                  return (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: delaytime }}
                      className='col-4 cols'
                      key={index}
                      onClick={() => handleClick(index)}
                    >
                      <div className={classname}>
                        <GameIcon iconName={value} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            {!draw && (
              <div className='my-3 text-center'>
                {winMessage ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 10,
                      delay: 0.2,
                    }}
                    className='my-modal'
                  >
                    <div>
                      <img src={winnerGif1} alt='winner' />
                      <h1>{winMessage}</h1>
                      <button onClick={resetGame}>
                        <GrPowerReset /> Restart Game
                      </button>
                      <button onClick={quitGame}>
                        <CgLogOut /> Quit Game
                      </button>
                    </div>
                    <p className='developer'>
                      Developed by{' '}
                      <a
                        href='https://www.linkedin.com/in/ashutoshbisoyi/'
                        target='_blank'
                        rel='noreferrer'
                      >
                        ashutoshbisoyi
                      </a>
                    </p>
                  </motion.div>
                ) : isCircle ? (
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.4,
                    }}
                    className='hint-message'
                  >
                    Circle's Turn
                  </motion.h3>
                ) : (
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.4,
                    }}
                    className='hint-message'
                  >
                    Cross's Turn
                  </motion.h3>
                )}
              </div>
            )}
            {draw && (
              <center>
                <span className='text-secondary mt-5'>
                  Seem to be powerful opponents
                </span>
                <button className='restart-btn' onClick={resetGame}>
                  <GrPowerReset /> Restart
                </button>
              </center>
            )}
            <motion.button
              initial={{ x: 80 }}
              animate={{ x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0.6,
              }}
              className='quit-btn'
              onClick={quitGame}
            >
              <CgLogOut />
            </motion.button>
          </div>
        </>
      ) : (
        <Redirect to='/player' />
      )}
    </>
  );
};

export default Game;
