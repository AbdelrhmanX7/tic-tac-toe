import "./GameUi.css";
import logo from "../../images/SVG/logo.svg";
const GameUi = (props) => {
  const Start_Game = () => {
    props.onGame_Start(true, 'normal');
  };
  const Start_bot_Game = () => {
    props.onGame_Start(true, 'bot');
  };
  return (
    <div className="Main-Menu">
      <img className="logo" src={logo} alt="" />
      <div className="player-choose">
        <h4>player 1's Mark</h4>
        <div className="All-choose">
          <div className="the-choose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="icon-x-default"
              viewBox="0 0 64 64"
            >
              <path
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div className="the-choose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="icon-o-default"
              viewBox="0 0 64 64"
            >
              <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
            </svg>
          </div>
        </div>
        <p>Remeber: X goes first</p>
      </div>
      <button onClick={Start_bot_Game} className="option cpu">
        <p>New Game (vs Cpu)</p>
      </button>
      <button onClick={Start_Game} className="option player">
        <p>New Game (vs player)</p>
      </button>
    </div>
  );
};

export default GameUi;
