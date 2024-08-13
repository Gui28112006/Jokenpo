import React, { useState } from 'react';
import './joknepo.css'; 
import { Container } from 'postcss';


const getComputerChoice = () => {
  const choices = ['pedra', 'papel', 'tesoura'];
  return choices[Math.floor(Math.random() * choices.length)];
};


const determineWinner = (player1Choice, player2Choice) => {
  if (player1Choice === player2Choice) return 'empate';
  if (
    (player1Choice === 'pedra' && player2Choice === 'tesoura') ||
    (player1Choice === 'papel' && player2Choice === 'pedra') ||
    (player1Choice === 'tesoura' && player2Choice === 'papel')
  ) {
    return 'jogador1';
  }
  return 'jogador2';
};

const Jokenpo = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [friendChoice, setFriendChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('pc'); 
  const [score, setScore] = useState({ jogador1: 0, jogador2: 0, empate: 0 });
  const [showChoices, setShowChoices] = useState(false);

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    if (gameMode === 'pc') {
      const computerChoice = getComputerChoice();
      setComputerChoice(computerChoice);
      setShowChoices(true); 
      const result = determineWinner(choice, computerChoice);
      setWinner(result);
      updateScore(result);
    } else if (gameMode === 'amigo') {
      setFriendChoice(null);
      setShowChoices(false); 
    }
  };

  const handleFriendChoice = (choice) => {
    setFriendChoice(choice);
    setShowChoices(true); 
    const result = determineWinner(playerChoice, choice);
    setWinner(result);
    updateScore(result);
  };

  const updateScore = (result) => {
    setScore(prevScore => ({
      ...prevScore,
      [result]: prevScore[result] + 1
    }));
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setFriendChoice(null);
    setWinner(null);
    setShowChoices(false);
  };

  const choiceIcon = (choice) => {
    switch (choice) {
      case 'pedra':
        return '✊';
      case 'papel':
        return '✋';
      case 'tesoura':
        return '✌️';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h1 className='agaum'>Jogo de Pedra, Papel e Tesoura</h1>
      <div className="mode-selector">
        <button className="mode-button" onClick={() => setGameMode('pc')}> <img src="https://cdn.pixabay.com/photo/2014/12/05/13/51/monitor-558021_1280.png"/>Jogar contra o PC</button>
        <button className="mode-button" onClick={() => setGameMode('amigo')}><img src="https://cdn.icon-icons.com/icons2/2574/PNG/512/profile_picture_user_icon_153847.png"/>Jogar contra um amigo</button>
      </div>

      <div className="scoreboard">
        <div className="score-item">Você: {score.jogador1}</div>
        <div className="score-item">Amigo: {score.jogador2}</div>
        <div className="score-item">Empates: {score.empate}</div>
      </div>

      {gameMode === 'pc' && (
        <div className="choice-buttons">
          <h2 className='esco'>Escolha sua jogada:</h2>
          <div className="butoenses">
          <button className="choice-button" onClick={() => handlePlayerChoice('pedra')}><img src="https://images.vexels.com/media/users/3/145827/isolated/preview/357f06ecbaaa77d750259c459c0ed55f-ilustracao-de-pedra-redonda.png"  /></button>
          <button className="choice-button" onClick={() => handlePlayerChoice('papel')}><img src="https://png.pngtree.com/png-clipart/20240416/original/pngtree-blank-paper-illustration-png-image_14827730.png"/></button>
          <button className="choice-button" onClick={() => handlePlayerChoice('tesoura')}><img src="https://images.emojiterra.com/google/android-nougat/512px/2702.png"/></button>
          </div>
        </div>
      )}

      {gameMode === 'amigo' && friendChoice === null && playerChoice === null && (
        <div className="choice-info">
          <h2>Jogador 1: Escolha sua jogada:</h2>
          <div className="choice-buttons">
            <button className="choice-button" onClick={() => handlePlayerChoice('pedra')}><img src="https://images.vexels.com/media/users/3/145827/isolated/preview/357f06ecbaaa77d750259c459c0ed55f-ilustracao-de-pedra-redonda.png"  /></button>
            <button className="choice-button" onClick={() => handlePlayerChoice('papel')}><img src="https://png.pngtree.com/png-clipart/20240416/original/pngtree-blank-paper-illustration-png-image_14827730.png"/></button>
            <button className="choice-button" onClick={() => handlePlayerChoice('tesoura')}><img src="https://images.emojiterra.com/google/android-nougat/512px/2702.png"/></button>
          </div>
        </div>
      )}

      {gameMode === 'amigo' && playerChoice && friendChoice === null && (
        <div className="choice-info">
          <h2>Amigo, escolha sua jogada:</h2>
          <div className="choice-buttons">
            <button className="choice-button" onClick={() => handleFriendChoice('pedra')}><img src="https://images.vexels.com/media/users/3/145827/isolated/preview/357f06ecbaaa77d750259c459c0ed55f-ilustracao-de-pedra-redonda.png"  /></button>
            <button className="choice-button" onClick={() => handleFriendChoice('papel')}><img src="https://png.pngtree.com/png-clipart/20240416/original/pngtree-blank-paper-illustration-png-image_14827730.png"/></button>
            <button className="choice-button" onClick={() => handleFriendChoice('tesoura')}><img src="https://images.emojiterra.com/google/android-nougat/512px/2702.png"/></button>
          </div>
        </div>
      )}

      {showChoices && (
        <div className="result-info">
          <h2>Você escolheu: {choiceIcon(playerChoice)}</h2>
          {gameMode === 'pc' && computerChoice && <h2>O PC escolheu: {choiceIcon(computerChoice)}</h2>}
          {gameMode === 'amigo' && friendChoice && <h2>O amigo escolheu: {choiceIcon(friendChoice)}</h2>}
        </div>
      )}

      {winner && (
        <div className="result-info">
          <h2>Resultado: {winner === 'empate' ? 'Empate!' : `Vencedor: ${winner === 'jogador1' ? 'Você' : 'Amigo'}`}</h2>
          <button className="reset-button" onClick={resetGame}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
};

export default Jokenpo;
