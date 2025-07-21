import Hs from '../styles/Header.module.css';

const Header = ({ onRestart }) => {
  return (
    <header className={Hs.header}>
      <h1>WOR(2D)UEL</h1>
      <button className={Hs.restartButton} onClick={onRestart}>
        Restart Game
      </button>
    </header>
  );
};

export default Header;