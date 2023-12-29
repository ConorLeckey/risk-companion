import './Battle.css';
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {battle, randomiseDice} from "../../utils/diceUtils";
import Dice from "../Dice/Dice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faSkull} from "@fortawesome/free-solid-svg-icons";

function Battle() {
    const [attackerDice, setAttackerDice] = useState([1, 1, 1]);
    const [defenderDice, setDefenderDice] = useState([1, 1]);
    const [result, setResult] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [rolled, setRolled] = useState(false);

    function updateRollStatus(newAttackerDice, newDefenderDice) {
        setRolled(false);
        setAttackerDice(newAttackerDice);
        setDefenderDice(newDefenderDice);
        setShowSummary(false);
    }

    function changeAttackerDiceAmount(difference) {
        const newAttackerDice = Array(attackerDice.length + difference).fill(1);
        const newDefenderDice = Array(defenderDice.length).fill(1);
        updateRollStatus(newAttackerDice, newDefenderDice);
    }

    function changeDefenderDiceAmount(difference) {
        const newAttackerDice = Array(attackerDice.length).fill(1);
        const newDefenderDice = Array(defenderDice.length + difference).fill(1);
        updateRollStatus(newAttackerDice, newDefenderDice);
    }

    function onBattleClick() {
        const rolledAttackerDice = randomiseDice(attackerDice);
        const rolledDefenderDice = randomiseDice(defenderDice);

        setAttackerDice(rolledAttackerDice);
        setDefenderDice(rolledDefenderDice);

        let newResults = battle(rolledAttackerDice, rolledDefenderDice);

        setRolled(true);
        setResult(newResults);
        setShowSummary(true);
        setTimeout(() => {
          setRolled(false);
        }, 500);
    }

    return (
        <div className="Battle">
            <div className="battle-dice">
                <div className="attacker-dice">
                    {attackerDice.map((die, index) =>
                        <Dice key={index} number={die} dice={attackerDice} color={"red"} rolled={rolled}/>
                    )}
                </div>
                <div className="attacker-buttons">
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
                        <Dice key={index} number={die} dice={defenderDice} color={"blue"} rolled={rolled}/>
                    )}
                </div>
                <div className="defender-buttons">
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
                    onClick={onBattleClick}
                    disabled={rolled}
            >
                Battle!
            </Button>
            {showSummary && result ? (
                <div>
                    <h1>Deaths:</h1>
                    <div className={"attacker-losses"}>
                        {[...Array(result.attackerDeaths).keys()].map((value, index)=>
                            <FontAwesomeIcon key={index} className="attacker-skull-icon fa-2x" icon={faSkull} />
                        )}
                        {[...Array(result.defenderDeaths).keys()].map((value, index)=>
                            <FontAwesomeIcon key={index} className="defender-skull-icon fa-2x" icon={faSkull} />
                        )}
                    </div>
                </div>
            ) : <></>}
        </div>
    );
}

export default Battle;
