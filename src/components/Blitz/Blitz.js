import './Blitz.css';
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {randomiseDice} from "../../utils/diceUtils";
import Spinner from "../Spinner/Spinner";

function Blitz() {
    const [attackers, setAttackers] = useState(1);
    const [defenders, setDefenders] = useState(0);
    const [survivingAttackers, setSurvivingAttackers] = useState(1);
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
            <div className="spinner">
                <h1>Attackers</h1>
                <Spinner defaultValue={1} onChange={(n)=>setAttackers(n)}/>
            </div>
            <div className="spinner">
                <h1>Defenders</h1>
                <Spinner defaultValue={0} onChange={(n)=>setDefenders(n)}/>
            </div>
            <Button variant={"outline-light"}
                    className="btn-blitz"
                    onClick={onClick}
                    disabled={defenders === 0 || attackers === 1}
            >
                Blitz!
            </Button>
            {survivingDefenders > 0 || survivingAttackers > 1 ? (
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
            ) : <></>}
        </div>
    );
}

export default Blitz;
