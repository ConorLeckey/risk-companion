import './Battle.css';
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {randomiseDice} from "../../utils/diceUtils";
import Dice from "../DiceRoller/Dice/Dice";

function Battle() {
    const [attackerDice, setAttackerDice] = useState([1, 1, 1]);
    const [defenderDice, setDefenderDice] = useState([1, 1]);
    const [result, setResult] = useState(null);
    const [blinking, setBlinking] = useState(false);
    function battle() {
        setBlinking(true)
        setTimeout(() => {
          setBlinking(false)
        }, 1000);

        const rolledAttackerDice = randomiseDice(attackerDice).sort((a, b) => b - a)
        const rolledDefenderDice = randomiseDice(defenderDice).sort((a, b) => b - a)

        setAttackerDice(rolledAttackerDice)
        setDefenderDice(rolledDefenderDice)

        if (rolledAttackerDice[0] > rolledDefenderDice[0] && rolledAttackerDice[1] > rolledDefenderDice[1]) {
            setResult('Attacker');
        } else if (rolledDefenderDice[0] >= rolledAttackerDice[0] && rolledDefenderDice[1] >= rolledAttackerDice[1]) {
            setResult('Defender');
        } else {
            setResult('Draw');
        }
    }

    return (
        <div className="Battle">
            <div className="battle-dice">
                <div className="attacker-dice">
                    <Dice number={attackerDice[0]} dice={attackerDice} color={"red"}></Dice>
                    <Dice number={attackerDice[1]} dice={attackerDice} color={"red"}></Dice>
                    <Dice number={attackerDice[2]} dice={attackerDice} color={"red"}></Dice>
                </div>
                <div className="defender-dice">
                    <Dice number={defenderDice[0]} dice={defenderDice} color={"blue"}></Dice>
                    <Dice number={defenderDice[1]} dice={defenderDice} color={"blue"}></Dice>
                </div>
            </div>
            <Button variant={"outline-light"}
                    className="btn-blitz"
                    onClick={battle}
            >
                Battle!
            </Button>
            {result ? (
                <div>
                    <h1><b>Summary</b></h1>
                    <div className={blinking ? "blinking" : ""}>
                        {result === "Draw" ? (
                            <h1 className={"draw"}>DRAW!</h1>
                        ):(
                            (result === "Attacker") ? (
                                <h1 className={"attacker-win"}>ATTACKERS WIN!</h1>
                            ):(
                                <h1 className={"defender-win"}>DEFENDERS WIN!</h1>
                            )
                        )}
                    </div>
                </div>
            ) : <></>}
        </div>
    );
}

export default Battle;
