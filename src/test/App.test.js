import { render, screen } from '@testing-library/react';
import App from '../components/App/App';
import {randomiseDice} from "../utils/diceUtils";

test('renders learn react link', () => {
  let attackerWins = 0;
  let defenderWins = 0;
  function fight(attackerScore, defenderScore) {
      if (attackerScore > defenderScore) {
          attackerWins++;
      } else {
          defenderWins++;
      }
  }
  for (let i = 0; i < 1000000; i++) {
      const attackerDice = randomiseDice(Array(3)).sort((a, b) => b - a);
      const defenderDice = randomiseDice(Array(2)).sort((a, b) => b - a);

      fight(attackerDice[0], defenderDice[0])
      fight(attackerDice[1], defenderDice[1])
  }

  console.log(attackerWins)
  console.log(defenderWins)
  expect(linkElement).toBeInTheDocument();
});
