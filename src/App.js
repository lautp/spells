import React from "react";
import Main from "./components/layout/Main";
import MainState from "./context/main/MainState";
import CardState from "./context/cards/CardState";



function App() {
    
  return (
    <CardState>
      <MainState>
        <div className="App">
          <Main />
        </div>
      </MainState>
    </CardState>
  );
}

export default App;
