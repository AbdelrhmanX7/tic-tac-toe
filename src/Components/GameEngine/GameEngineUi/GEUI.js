import "../GameEngine.css";
import logo from "../../../images/SVG/logo.svg";
import restart_btn from "../../../images/SVG/icon-restart.svg";
import x from "../../../images/SVG/icon-x-default.svg";
import o from "../../../images/SVG/icon-o-default.svg";
import x_outline from "../../../images/SVG/icon-x-outline.svg";
import o_outline from "../../../images/SVG/icon-o-outline.svg";
import x_player from "../../../images/SVG/icon-x.svg";
import o_player from "../../../images/SVG/icon-o.svg";
import { useState } from "react";
const x_desing = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="icon-x-default"
    viewBox="0 0 64 64"
    fill="#a8bfc9"
  >
    <path
      d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
      fillRule="evenodd"
    />
  </svg>
);
const o_desing = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="icon-o-default"
    viewBox="0 0 64 64"
    fill="#a8bfc9"
  >
    <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
  </svg>
);

const GEUI = (props) => {
  const [X, setX] = useState(true);
  const changeplayer = (e) => {
    e.target.nextElementSibling.remove();
    e.target.nextElementSibling.setAttribute("src", X ? x_player : o_player);
    e.target.nextElementSibling.removeAttribute("hidden");
    setX((prev) => !prev);
    props.onGetPlayer(e.target.getAttribute("number"));
    e.target.setAttribute("disabled", "");
  };

  const restart_game = () => {
    window.location.reload();
  };
  const Start_Game = () => {
    props.onGame_Start(false)
    window.location.reload()
}
  return (
    <div className="container">
      <div className="GameUi">
        <div
          className="win_background"
          style={props.game_end ? { display: "flex" } : { display: "none" }}
        >
          <div className="win">
            <p>{!X ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"}</p>
            <div className="the_winner">
              <img src={!X ? x_player : o_player} alt="" />
              <h1 style={!X ? { color: "#31c3bd" } : { color: "#f2b137" }}>
                TAKES THE ROUND
              </h1>
            </div>
            <div className="win_btns">
              <button onClick={Start_Game} className="quit_btn">Quit</button>
              <button className="Next_Round_btn" onClick={restart_game}>
                Next ROUND
              </button>
            </div>
          </div>
        </div>
        <header>
          <img src={logo} alt="" />
          <div className="Turn">
            {X === true ? x_desing : o_desing}
            <p>TURN</p>
          </div>
          <button className="restart" onClick={restart_game}>
            <img src={restart_btn} alt="" />
          </button>
        </header>

        <main>
          {props.Data.map((x) => {
            return (
              <div className="game_floor">
                <button
                  number={x}
                  onClick={changeplayer}
                  className="game_floor_btn"
                ></button>
                <img
                  className="player_outline"
                  src={X === true ? x_outline : o_outline}
                  alt=""
                />
                <img className={"player_turn"} hidden alt="" />
              </div>
            );
          })}
        </main>

        <footer>
          <div className="points-continer x-wins">
            <div className="points">
              <img src={x} alt="" />
              <p>(P1)</p>
            </div>
            <h1>{props.playerData_X.win}</h1>
          </div>

          <div className="points-continer ties">
            <div>
              <p>TIES</p>
            </div>
            <h1>{props.playerData_X.tie}</h1>
          </div>

          <div className="points-continer o-wins">
            <div className="points">
              <img src={o} alt="" />
              <p>(P2)</p>
            </div>
            <h1>{props.playerData_X.lose}</h1>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GEUI;
