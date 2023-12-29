import './DiceRoller.css';
import Dice from "../Dice/Dice";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {randomiseDice} from "../../utils/diceUtils";

function DiceRoller() {
    const [dice, setDice] = useState([1, 2, 1]);
    const [rolled, setRolled] = useState(false);

    useEffect(() => {
    }, [dice]);
    function rollDice() {
        setRolled(true)
        setDice(randomiseDice(dice))
        setTimeout(() => {
          setRolled(false)
        }, 500);
    }
    function changeDiceAmount(difference) {
        const newDice = Array(dice.length + difference).fill(1)
        setRolled(false)
        setDice(newDice)
    }

    return (
        <div className="dice-roller">
            <div className="diceplay">
                {dice.map((die, index) => <Dice key={index} number={die} dice={dice} rolled={rolled}/>)}
            </div>
            <div className={"control"}>
                <Button variant={"light"}
                        className="btn-change-dice"
                        disabled={dice.length === 1}
                        onClick={()=>changeDiceAmount(-1)}
                >
                    <FontAwesomeIcon className="burger-icon fa-2x" icon={faMinus} />
                </Button>
                <Button variant={"outline-light"}
                        className="btn-roll"
                        onClick={rollDice}
                        disabled={rolled}
                >
                    Roll!
                </Button>
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
