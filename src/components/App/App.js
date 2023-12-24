import './App.css';
import Dice from "../Dice/Dice";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

function App() {
    const [dice, setDice] = useState([1, 2, 1]);

    useEffect(() => {
    }, [dice]);

    function randomiseDice(diceArray) {
        const newDice = []
        for (let i = 0; i < diceArray.length; i++) {
            newDice[i] = Math.floor(Math.random() * 6) + 1
        }
        return newDice
    }

    function rollDice() {
        setDice(randomiseDice(dice))
    }
    function changeDiceAmount(difference) {
        const newDice = Array(dice.length + difference)
        console.log(difference)
        console.log(newDice)
        setDice(randomiseDice(newDice))
    }

    return (
        <div className="App">
            {/*<FontAwesomeIcon className="burger-icon fa-2x" icon={faPlus} />*/}
            <div className="diceplay">
                {dice.map(die => <Dice number={die}/>)}
            </div>
            <div className={"control"}>
                <Button variant={"light"}
                        className="btn-change-dice"
                        disabled={dice.length === 1}
                        onClick={()=>changeDiceAmount(-1)}
                >
                    <FontAwesomeIcon className="burger-icon fa-2x" icon={faMinus} />
                </Button>
                <Button variant={"outline-light"} className="btn-roll" onClick={rollDice}>Roll!</Button>
                <Button variant={"light"}
                        className="btn-change-dice"
                        disabled={dice.length === 3}
                        onClick={()=>changeDiceAmount(1)}
                >
                    <FontAwesomeIcon className="burger-icon fa-2x" icon={faPlus} />
                </Button>
            </div>
        </div>
    );
}

export default App;
