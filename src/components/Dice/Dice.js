import './Dice.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDiceFive, faDiceFour, faDiceOne, faDiceSix, faDiceThree, faDiceTwo} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

function Dice({number, dice, color="white", rolled}) {
    const [rolling, setRolling] = useState(false);

    useEffect(() => {
        function rollDice() {
            console.log("prevState: ", rolling)
            setRolling(true)
            setTimeout(() => {
            console.log("stopped ")
              setRolling(false)
            }, 500);
        }
        if (rolled) {
            rollDice();
        }
    }, [number, dice])

    const diceArray = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix]
    return (
        <div className={"dice " + (rolling && rolled ? "rolling" : "") + " " + color}>
            <FontAwesomeIcon className="burger-icon fa-2x" icon={diceArray[number-1]} />
        </div>
    );
}

export default Dice;
