import './Blitz.css';
import React, {useState} from "react";
import InputSpinner from "react-bootstrap-input-spinner";
import Button from "react-bootstrap/Button";
import {randomiseDice} from "../../utils/diceUtils";

function Blitz() {
    const [attackers, setAttackers] = useState(0);
    const [defenders, setDefenders] = useState(0);
    const [survivingAttackers, setSurvivingAttackers] = useState(0);
    const [survivingDefenders, setSurvivingDefenders] = useState(0);

    function blitz() {
        let currentAttackers = attackers;
        let currentDefenders = defenders;

        function fight(attackerScore, defenderScore) {
            if (attackerScore > defenderScore) {
                currentDefenders--;
            } else {
                currentAttackers--;
            }
        }

        while (currentAttackers > 1 && currentDefenders > 0) {
            const attackerDice = randomiseDice(Array(Math.min(currentAttackers - 1, 3))).sort((a, b) => a - b);
            const defenderDice = randomiseDice(Array(Math.min(currentDefenders, 2))).sort((a, b) => a - b);

            fight(attackerDice[0], defenderDice[0])
            if(attackerDice.length >= 2 && defenderDice === 2){
                fight(attackerDice[1], defenderDice[1])
            }
        }
        setSurvivingAttackers(currentAttackers)
        setSurvivingDefenders(currentDefenders)
    }

    return (
        <div className="Blitz">
            <div className={"spinner"}>
                <h2>Attackers</h2>
                <InputSpinner
                    className={"spinner"}
                    type={'int'}
                    precision={1}
                    max={1000}
                    min={0}
                    step={1}
                    value={attackers}
                    variant={'light'}
                    onChange={(n)=>setAttackers(n)}
                    size="sm"
                />
            </div>
            <div className={"spinner"}>
                <h2>Defenders</h2>
                <InputSpinner
                    type={'int'}
                    precision={1}
                    max={1000}
                    min={0}
                    step={1}
                    value={defenders}
                    variant={'light'}
                    onChange={(n)=>setDefenders(n)}
                    size="sm"
                />
            </div>
            <Button variant={"outline-light"} className="btn-roll" onClick={blitz}>Blitz!</Button>
            <div>
                <h2>Summary</h2>
                <h2>Surviving Attackers: {survivingAttackers}</h2>
                <h2>Surviving Defenders: {survivingDefenders}</h2>
            </div>
        </div>
    );
}

export default Blitz;
