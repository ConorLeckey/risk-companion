function randomiseDice(diceArray) {
    const newDice = [];
    for (let i = 0; i < diceArray.length; i++) {
        newDice[i] = Math.floor(Math.random() * 6) + 1;
    }
    return newDice;
}

function fight(attackerScore, defenderScore) {
    if (attackerScore > defenderScore) {
        console.log("ATTACKERS ARE VICTORIOUS!\n");
        return {
            attackerDeaths: 0,
            defenderDeaths: 1,
        }
    } else {
        console.log("DEFENDERS ARE VICTORIOUS!\n");
        return {
            attackerDeaths: 1,
            defenderDeaths: 0,
        }
    }
}

function battle(attackerDice, defenderDice) {
    attackerDice = attackerDice.sort((a, b) => b - a)
    defenderDice = defenderDice.sort((a, b) => b - a)
    console.log("\n\nFIGHT 1 IS BEGINNING!\n");

    const results = fight(attackerDice[0], defenderDice[0]);

    if(attackerDice.length >= 2 && defenderDice.length === 2){
        console.log("\n\nFIGHT 2 IS BEGINNING!\n");
        let {attackerDeaths, defenderDeaths} = fight(attackerDice[1], defenderDice[1]);
        results.attackerDeaths = results.attackerDeaths + attackerDeaths;
        results.defenderDeaths = results.defenderDeaths + defenderDeaths;
    }
    console.log('results: ', results)
    return results;
}

export {randomiseDice, fight, battle};
