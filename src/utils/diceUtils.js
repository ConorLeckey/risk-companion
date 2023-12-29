function randomiseDice(diceArray) {
    const newDice = [];
    for (let i = 0; i < diceArray.length; i++) {
        newDice[i] = Math.floor(Math.random() * 6) + 1;
    }
    return newDice;
}

function fight(attackerScore, defenderScore) {
    if (attackerScore > defenderScore) {
        return {
            attackerDeaths: 0,
            defenderDeaths: 1,
        }
    } else {
        return {
            attackerDeaths: 1,
            defenderDeaths: 0,
        }
    }
}

function battle(attackerDice, defenderDice) {
    const sortedAttackerDice = attackerDice.slice().sort((a, b) => b - a)
    const sortedDefenderDice = defenderDice.slice().sort((a, b) => b - a)

    const results = fight(sortedAttackerDice[0], sortedDefenderDice[0]);

    if(sortedAttackerDice.length >= 2 && sortedDefenderDice.length === 2){
        let {attackerDeaths, defenderDeaths} = fight(sortedAttackerDice[1], sortedDefenderDice[1]);
        results.attackerDeaths = results.attackerDeaths + attackerDeaths;
        results.defenderDeaths = results.defenderDeaths + defenderDeaths;
    }
    return results;
}

export {randomiseDice, fight, battle};
