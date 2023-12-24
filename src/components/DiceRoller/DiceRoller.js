import './DiceRoller.css';
import Dice from "./Dice/Dice";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {randomiseDice} from "../../utils/diceUtils";

function DiceRoller() {
    const [dice, setDice] = useState([1, 2, 1]);

    useEffect(() => {
    }, [dice]);
    function rollDice() {
        setDice(randomiseDice(dice))
    }
    function changeDiceAmount(difference) {
        const newDice = Array(dice.length + difference)
        setDice(randomiseDice(newDice))
    }

    return (
        <div className="dice-roller">
            <div className="diceplay">
                {dice.map((die, index) => <Dice key={index} number={die}/>)}
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

export default DiceRoller;
