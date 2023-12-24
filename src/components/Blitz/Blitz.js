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
    const [blinking, setBlinking] = useState(false);

    function blitz() {
        let currentAttackers = attackers;
        let currentDefenders = defenders;

        function fight(attackerScore, defenderScore) {
            if (attackerScore > defenderScore) {
                currentDefenders--;
                console.log("ATTACKERS ARE VICTORIOUS!\n")
            } else {
                currentAttackers--;
                console.log("DEFENDERS ARE VICTORIOUS!\n")
            }
        }

        // Each loop represents a single battle
        while (currentAttackers > 1 && currentDefenders > 0) {
            const attackerDice = randomiseDice(Array(Math.min(currentAttackers - 1, 3))).sort((a, b) => b - a);
            const defenderDice = randomiseDice(Array(Math.min(currentDefenders, 2))).sort((a, b) => b - a);

            console.log("\n\n============ THE DICE FOR THIS BATTLE ARE: ===============\n")
            console.log("ATTACKERS ROLLED: ", attackerDice)
            console.log("DEFENDERS ROLLED: ", defenderDice)

            console.log("\n\nFIGHT 1 IS BEGINNING!\n")
            fight(attackerDice[0], defenderDice[0])
            if(attackerDice.length >= 2 && defenderDice.length === 2){
                console.log("\n\nFIGHT 2 IS BEGINNING!\n")
                fight(attackerDice[1], defenderDice[1])
            }
        }
        setSurvivingAttackers(currentAttackers)
        setSurvivingDefenders(currentDefenders)
    }

    function onClick() {
        blitz();
        setBlinking(true)
        setTimeout(() => {
          setBlinking(false)
        }, 1000);
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
                    size="lg"
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
                    size="lg"
                />
            </div>
            <Button variant={"outline-light"} className="btn-blitz" onClick={onClick}>Blitz!</Button>
            <div>
                <h1><b>Summary</b></h1>
                <h2>Surviving Attackers: {survivingAttackers}</h2>
                <h2>Surviving Defenders: {survivingDefenders}</h2>
                <div className={blinking ? "blinking" : ""}>
                    {survivingDefenders === 0 ? (
                        <h1 className={"attacker-win"}>ATTACKERS WIN!</h1>
                    ):(
                        <h1 className={"defender-win"}>DEFENDERS WIN!</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Blitz;
