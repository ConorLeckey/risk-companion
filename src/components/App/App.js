import './App.css';
import React from "react";
import DiceRoller from "../DiceRoller/DiceRoller";
import {Fade, Tab, Tabs} from "react-bootstrap";
import Blitz from "../Blitz/Blitz";
import Battle from "../Battle/Battle";

function App() {
    return (
        <div className="App">
            <Tabs
              defaultActiveKey="roller"
              id="uncontrolled-tab-example"
              transition={Fade}
              className="mb-3"
              justify
            >
              <Tab eventKey="roller" title="Dice Roller">
                  <DiceRoller/>
              </Tab>
              <Tab eventKey="battle" title="Battle">
                  <Battle/>
              </Tab>
              <Tab eventKey="blitz" title="Blitz">
                  <Blitz/>
              </Tab>
            </Tabs>
        </div>
    );
}

export default App;
