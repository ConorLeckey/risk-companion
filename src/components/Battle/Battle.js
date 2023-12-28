import './Battle.css';
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {randomiseDice} from "../../utils/diceUtils";
import Dice from "../DiceRoller/Dice/Dice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faSkull} from "@fortawesome/free-solid-svg-icons";

function Battle() {
    const [attackerDice, setAttackerDice] = useState([1, 1, 1]);
    const [defenderDice, setDefenderDice] = useState([1, 1]);
    const [result, setResult] = useState(null);
    const [showSummary, setShowSummary] = useState(false)

    function changeAttackerDiceAmount(difference) {
        const newAttackerDice = Array(attackerDice.length + difference).fill(1)
        const newDefenderDice = Array(defenderDice.length).fill(1)
        setAttackerDice(newAttackerDice)
        setDefenderDice(newDefenderDice)
        setShowSummary(false)
    }

    function changeDefenderDiceAmount(difference) {
        const newAttackerDice = Array(attackerDice.length).fill(1)
        const newDefenderDice = Array(defenderDice.length + difference).fill(1)
        setAttackerDice(newAttackerDice)
        setDefenderDice(newDefenderDice)
        setShowSummary(false)
    }

    function battle() {
        const rolledAttackerDice = randomiseDice(attackerDice).sort((a, b) => b - a)
        const rolledDefenderDice = randomiseDice(defenderDice).sort((a, b) => b - a)

        setAttackerDice(rolledAttackerDice)
        setDefenderDice(rolledDefenderDice)

        let newResults = [0, 0]

        function fight(attackerScore, defenderScore) {
            if (attackerScore > defenderScore) {
                newResults[1] = newResults[1] + 1;
                console.log("ATTACKERS ARE VICTORIOUS!\n")
            } else {
                newResults[0] = newResults[0] + 1;
                console.log("DEFENDERS ARE VICTORIOUS!\n")
            }
        }

        fight(rolledAttackerDice[0], rolledDefenderDice[0])
        if(rolledAttackerDice.length >= 2 && rolledDefenderDice.length === 2){
                console.log("\n\nFIGHT 2 IS BEGINNING!\n")
                fight(rolledAttackerDice[1], rolledDefenderDice[1])
        }
        setResult(newResults)
        setShowSummary(true)
    }

    return (
        <div className="Battle">
            <div className="battle-dice">
                <div className="attacker-dice">
                    {attackerDice.map((die, index) =>
                    <Dice key={index} number={die} dice={attackerDice} color={"red"}/>
                    )}
                </div>
                <div className="attacker-dice">
                    <Button variant={"light"}
                            className="btn-change-dice"
                            disabled={attackerDice.length === 1}
                            onClick={()=>changeAttackerDiceAmount(-1)}
                    >
                        <FontAwesomeIcon className="burger-icon fa-2x" icon={faMinus} />
                    </Button>
                    <Button variant={"light"}
                            className="btn-change-dice"
                            disabled={attackerDice.length === 3}
                            onClick={()=>changeAttackerDiceAmount(1)}
                    >
                        <FontAwesomeIcon className="burger-icon fa-2x" icon={faPlus} />
                    </Button>
                </div>
                <div className="defender-dice">
                    {defenderDice.map((die, index) =>
                        <Dice key={index} number={die} dice={defenderDice} color={"blue"}/>
                    )}
                </div>
                <div className="defender-dice">
                    <Button variant={"light"}
                            className="btn-change-dice"
                            disabled={defenderDice.length === 1}
                            onClick={()=>changeDefenderDiceAmount(-1)}
                    >
                        <FontAwesomeIcon className="burger-icon fa-2x" icon={faMinus} />
                    </Button>
                    <Button variant={"light"}
                            className="btn-change-dice"
                            disabled={defenderDice.length === 2}
                            onClick={()=>changeDefenderDiceAmount(1)}
                    >
                        <FontAwesomeIcon className="burger-icon fa-2x" icon={faPlus} />
                    </Button>
                </div>
            </div>
            <Button variant={"outline-light"}
                    className="btn-blitz"
                    onClick={battle}
            >
                Battle!
            </Button>
            {showSummary && result ? (
                <div>
                    <h1>Summary</h1>
                    <div className={"attacker-losses"}>
                        {[...Array(result[0]).keys()].map(()=>
                            <FontAwesomeIcon className="attacker-skull-icon fa-2x" icon={faSkull} />
                        )}
                        {[...Array(result[1]).keys()].map(()=>
                            <FontAwesomeIcon className="defender-skull-icon fa-2x" icon={faSkull} />
                        )}
                    </div>
                </div>
            ) : <></>}
        </div>
    );
}

export default Battle;
