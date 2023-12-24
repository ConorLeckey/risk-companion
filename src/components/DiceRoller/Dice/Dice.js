import './Dice.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDiceFive, faDiceFour, faDiceOne, faDiceSix, faDiceThree, faDiceTwo} from "@fortawesome/free-solid-svg-icons";

function Dice({number}) {
    const diceArray = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix]
    return (
        <div className={"dice"}>
            <FontAwesomeIcon className="burger-icon fa-2x" icon={diceArray[number-1]} />
        </div>
    );
}

export default Dice;
