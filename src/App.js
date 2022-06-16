import "./App.css";
import GameUi from "./Components/Ui/GameUi";
import GEUI from "./Components/GameEngine/GameEngineUi/GEUI";
import { useEffect, useState } from "react";
import textfile from "./test.txt";
import { type } from "@testing-library/user-event/dist/type";
import Game from "./Components/GameEngine/GameScripts/Game";
const DUMMY_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//WIN_DATA i use it to collect all way to win in on array to be able to use it with loop
const WIN_DATA = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let X_arr = [];
let O_arr = [];
let make_des = false;
let o_game = 0;
function App() {
  // X for player one state
  const [X, setX] = useState(true);

  const [Game_Start, Set_Game_Start] = useState(false);
  const [Game_Type, Set_Game_Type] = useState("");
  const [Game_End, Set_Game_End] = useState(false);

  const Check_Arr = (X_Arr, O_Arr, md) => {
    X_arr = X_Arr;
    O_arr = O_Arr;
    make_des = md;
  };

  const [playerData_X, setPlayerData_X] = useState({
    player: "x",
    move: [],
    win: 0,
    tie: 0,
    lose: 0,
    key: Math.random(),
  });

  const [playerData_O, setPlayerData_O] = useState({
    player: "o",
    move: [],
    key: Math.random(),
  });

  const onGetPlayer = (AllPlayerData) => {
    setX((prev) => !prev);
    if (!X) {
      setPlayerData_O({
        player: "o",
        move: [AllPlayerData, ...playerData_O.move],
      });
    } else {
      setPlayerData_X({
        ...playerData_X,
        move: [AllPlayerData, ...playerData_X.move],
      });
    }
  };

  //i used this loop to check all Data from Win_Data
  for (let i = 0; i < WIN_DATA.length; i++) {
    let win = 0;

    for (let x = 0; x < WIN_DATA[i].length; x++) {
      if (X) {
        // O Check Data and if O win or not
        for (let y = 0; y < playerData_O.move.length; y++) {
          if (WIN_DATA[i][x] === +playerData_O.move[y]) {
            win += 1;
          }
        }
      } else {
        // X Check Data and if X win or not
        for (let y = 0; y < playerData_X.move.length; y++) {
          if (WIN_DATA[i][x] === +playerData_X.move[y]) {
            win += 1;
          }
        }
      }

      if (win === 3) {
        //If player get 3 point ===> 3 in row it's he is win
        if (!Game_End) {
          //Game_End to handle when game fisish because loop broke the code

          if (X) {
            //If X lose then O will take the point
            setPlayerData_X({ ...playerData_X, lose: ++playerData_X.lose });
          } else {
            //If X win then it will take point
            setPlayerData_X({ ...playerData_X, win: ++playerData_X.win });
          }
          Set_Game_End(true);
        }
        break;
      }

      if (win === 2) {
        for (const x in WIN_DATA[i]) {
          if (
            !X_arr.includes(WIN_DATA[i][x]) &&
            !O_arr.includes(WIN_DATA[i][x])
          ) {
            o_game = WIN_DATA[i][x];
            make_des = true;
          }
        }
      }
    }
  }

  //for tie
  useEffect(() => {
    if (
      playerData_O.move.length + playerData_X.move.length === 9 &&
      !Game_End
    ) {
      /*
      I use Game_End here because there is a change to win in last move so it will broke the game
      last move it equal all move lenght because there is only 9 block not more or less so i get PLayer_O move length and Player_X move length to run this fun()
      */
      setPlayerData_X({ ...playerData_X, tie: ++playerData_X.tie });
      window.location.reload();
    }
  }, [playerData_X.move]);

  //i use useEffect to get Data from localStorage before a game start
  useEffect(() => {
    /* str is use to Transform Data from normal Data to a active Data
    to be able to react to use it and read it 

    # get items must be before setItem why
    => because you can't forget Data (setItem will be eraser by refersh) before you save it
    so you should to get Data first and save it then when code move to setItem will take the Data you get from getItem and save it in setItem

    # there is error could happend when Data will be null so if this error happend with you just use try and catch and in catch save a default data
    (this error happend when you remove cookies or there is no Defualt Data)
    */
   if(Game_Type === 'bot') {
    const str = localStorage.getItem("bot_game_data");
    const parse = JSON.parse(str);
    try {
      setPlayerData_X({
        ...playerData_X,
        win: parse.win,
        lose: parse.lose,
        tie: parse.tie,
      });
    } catch (error) {
      //Handle Error you will find answer in the second (#)
      setPlayerData_X({
        ...playerData_X,
        win: 0,
        lose: 0,
        tie: 0,
      });
    }
   } else {
    const str = localStorage.getItem("game_data");
    const parse = JSON.parse(str);
    try {
      setPlayerData_X({
        ...playerData_X,
        win: parse.win,
        lose: parse.lose,
        tie: parse.tie,
      });
    } catch (error) {
      //Handle Error you will find answer in the second (#)
      setPlayerData_X({
        ...playerData_X,
        win: 0,
        lose: 0,
        tie: 0,
      });
    }
   }
  }, [Game_Type]);

  useEffect(() => {
    /*
    if you use localstorage you should first Transform Data from object to
    normal text to be able to save in localStorage
    */
    if (Game_Type === "bot") {
      const jsonObj = JSON.stringify(playerData_X);
      localStorage.setItem("bot_game_data", jsonObj);
    } else {
      const jsonObj = JSON.stringify(playerData_X);
      localStorage.setItem("game_data", jsonObj);
    }
  }, [playerData_X]);

  const onGame_Start = (e, Game_Type) => {
    Set_Game_Start(e);
    Set_Game_Type(Game_Type);
  };
  return (
    <div className="App">
      {Game_Start ? (
        Game_Type === "normal" ? (
          <GEUI
            Data={DUMMY_DATA}
            onGame_Start={onGame_Start}
            playerData_X={playerData_X}
            onGetPlayer={onGetPlayer}
            game_end={Game_End}
          />
        ) : (
          <Game
            Data={DUMMY_DATA}
            onGame_Start={onGame_Start}
            playerData_X={playerData_X}
            onGetPlayer={onGetPlayer}
            game_end={Game_End}
            Check_Arr={Check_Arr}
            make_des={make_des}
            o_game={o_game}
          />
        )
      ) : (
        <GameUi onGame_Start={onGame_Start} />
      )}
    </div>
  );
}

export default App;
