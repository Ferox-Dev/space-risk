export const battle = (numberoftroopsattacker, numberoftroopsdefender) => {

    let whitedice = [];
    let reddice = [];
    let winner = 0;

    let battleammountattacker = numberoftroopsattacker-1
    if (numberoftroopsattacker <= 1) return null;


    if (numberoftroopsdefender === 1) {
        whitedice.push(diceroll());
        if (battleammountattacker === 1) {
            reddice.push(diceroll());
        } else if (battleammountattacker === 2) { 
            reddice.push(diceroll());
            reddice.push(diceroll());
        } else if (battleammountattacker >= 3) {
            reddice.push(diceroll());
            reddice.push(diceroll());
            reddice.push(diceroll());
        }

        whitedice.sort(function(a, b){return a - b});
        reddice.sort(function(a, b){return a - b});
    
        whitedice.reverse();
        reddice.reverse();

        if (whitedice[0] >= reddice[0]) {
            winner--
        } else {
            winner++
        }

    } else if (numberoftroopsdefender >= 2)  {
        whitedice.push(diceroll());
        whitedice.push(diceroll());
        if (battleammountattacker === 1) {

            reddice.push(diceroll());
            whitedice.sort(function(a, b){return a - b});
            reddice.sort(function(a, b){return a - b});
        
            whitedice.reverse();
            reddice.reverse();
    
            if (whitedice[0] >= reddice[0]) {
                winner--
            } else {
                winner++
            }

        } else if (battleammountattacker === 2) { 
            reddice.push(diceroll());
            reddice.push(diceroll());

            whitedice.sort(function(a, b){return a - b});
            reddice.sort(function(a, b){return a - b});
        
            whitedice.reverse();
            reddice.reverse();
    
            if (whitedice[0] >= reddice[0]) {
                winner--
            } else {
                winner++
            }
    
            if (whitedice[1] >= reddice[1]) {
                winner--
            } else {
                winner++
            }
    
        } else if (battleammountattacker >= 3) {
            reddice.push(diceroll());
            reddice.push(diceroll());
            reddice.push(diceroll());

            whitedice.sort(function(a, b){return a - b});
            reddice.sort(function(a, b){return a - b});
        
            whitedice.reverse();
            reddice.reverse();
    
            if (whitedice[0] >= reddice[0]) {
                winner--
            } else {
                winner++
            }
    
            if (whitedice[1] >= reddice[1]) {
                winner--
            } else {
                winner++
            }
    
        } 
    }

    return winner; //returns -2, -1, 0,  +1, +2
    // -2 attacker loses 2 troops
    // -1 attacker loses 1 troops
    // 0 attacker loses 1 and defender loses 1
    // +1 defender loses 1 troops
    // +2 defender loses 2 troops
}

const diceroll = () => Math.floor(Math.random() * (6 - 1 + 1) + 1)  