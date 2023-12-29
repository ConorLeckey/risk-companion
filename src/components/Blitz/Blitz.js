import './Blitz.css';
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {battle, randomiseDice} from "../../utils/diceUtils";
import Spinner from "../Spinner/Spinner";

function Blitz() {
    const [attackers, setAttackers] = useState(2);
    const [defenders, setDefenders] = useState(1);
    const [survivingAttackers, setSurvivingAttackers] = useState(1);
    const [survivingDefenders, setSurvivingDefenders] = useState(0);
    const [blinking, setBlinking] = useState(false);

    useEffect(()=>{
        setSurvivingAttackers(0)
        setSurvivingDefenders(0)
    }, [attackers, defenders])

    function blitz() {
        let currentAttackers = attackers;
        let currentDefenders = defenders;

        while (currentAttackers > 1 && currentDefenders > 0) {
            const attackerDice = randomiseDice(Array(Math.min(currentAttackers - 1, 3)));
            const defenderDice = randomiseDice(Array(Math.min(currentDefenders, 2)));

            const {attackerDeaths, defenderDeaths} = battle(attackerDice, defenderDice);

            currentAttackers -= attackerDeaths;
            currentDefenders -= defenderDeaths;
        }
        setSurvivingAttackers(currentAttackers)
        setSurvivingDefenders(currentDefenders)
    }

    function onClick() {
        blitz();
        setBlinking(true)
        for (let x = 0; x < 8; x++) {
            setTimeout(() => {
              setBlinking(x % 2 === 0)
            }, x * 100);
        }
    }

    return (
        <div className="Blitz">
            <div className="spinner">
                <h1>Attackers</h1>
                <Spinner defaultValue={2} onChange={(n)=>setAttackers(n)} minimum={2}/>
            </div>
            <div className="spinner">
                <h1>Defenders</h1>
                <Spinner defaultValue={1} onChange={(n)=>setDefenders(n)} minimum={1}/>
            </div>
            <Button variant={"outline-light"}
                    className="btn-blitz"
                    onClick={onClick}
            >
                Blitz!
            </Button>
            {survivingDefenders > 0 || survivingAttackers > 1 ? (
                <div>
                    <h1><b>Summary</b></h1>
                    <h2>Surviving Attackers: {survivingAttackers}</h2>
                    <h2>Surviving Defenders: {survivingDefenders}</h2>
                    {blinking === false ? (
                        survivingDefenders === 0 ? (
                            <h1 className={"attacker-win"}>ATTACKERS WIN!</h1>
                        ) : (
                            <h1 className={"defender-win"}>DEFENDERS WIN!</h1>
                        )
                    ): <></>}

                </div>
            ) : <></>}
        </div>
    );
}

export default Blitz;
