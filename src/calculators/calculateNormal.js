export const calculateNormal = (attackerTroops, defenderTroops) => {
    const probabilities = {
      '1v1': { attackerWins: 15 / 36, defenderWins: 21 / 36 },
      '2v1': { attackerWins: 125 / 216, defenderWins: 91 / 216 },
      '2v2': { attackerWinsBoth: 55 / 216, defenderWinsBoth: 144 / 216, bothLoseOne: 17 / 36 },
      '3v1': { attackerWins: 855 / 1296, defenderWins: 441 / 1296 },
      '3v2': { attackerWinsBoth: 2890 / 7776, defenderWinsBoth: 2275 / 7776, bothLoseOne: 2611 / 7776 }
    };
  
    const dp = Array.from({ length: attackerTroops + 1 }, () => Array(defenderTroops + 1).fill(null));
  
    const calcProb = (a, d) => {
      if (dp[a][d] !== null) return dp[a][d];
      if (a <= 1) return dp[a][d] = 0;
      if (d === 0) return dp[a][d] = 1;
  
      let winProb = 0;
  
      if (a >= 4 && d >= 2) {
        winProb += probabilities['3v2'].attackerWinsBoth * calcProb(a, d - 2);
        winProb += probabilities['3v2'].defenderWinsBoth * calcProb(a - 2, d);
        winProb += probabilities['3v2'].bothLoseOne * calcProb(a - 1, d - 1);
      } else if (a >= 4 && d === 1) {
        winProb += probabilities['3v1'].attackerWins * calcProb(a, d - 1);
        winProb += probabilities['3v1'].defenderWins * calcProb(a - 1, d);
      } else if (a === 3 && d >= 2) {
        winProb += probabilities['2v2'].attackerWinsBoth * calcProb(a, d - 2);
        winProb += probabilities['2v2'].defenderWinsBoth * calcProb(a - 2, d);
        winProb += probabilities['2v2'].bothLoseOne * calcProb(a - 1, d - 1);
      } else if (a === 3 && d === 1) {
        winProb += probabilities['2v1'].attackerWins * calcProb(a, d - 1);
        winProb += probabilities['2v1'].defenderWins * calcProb(a - 1, d);
      } else if (a === 2 && d >= 1) {
        winProb += probabilities['1v1'].attackerWins * calcProb(a, d - 1);
        winProb += probabilities['1v1'].defenderWins * calcProb(a - 1, d);
      }
  
      return dp[a][d] = winProb;
    };
  
    return calcProb(attackerTroops, defenderTroops);
  };
  