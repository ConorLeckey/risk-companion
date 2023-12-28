function randomiseDice(diceArray) {
    const newDice = [];
    for (let i = 0; i < diceArray.length; i++) {
        newDice[i] = Math.floor(Math.random() * 6) + 1;
    }
    return newDice;
}

export {randomiseDice};
