var readline = require('readline');

var input = [];

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
// Prompt user to input data in console.
console.log("Please input bets dataset in command line. Hit enter and then press Ctrl+C after inputting all data");
rl.prompt();

rl.on('line', function(cmd) {
	input.push(cmd);
});

rl.on('close', function(cmd) {
	console.log('\n\nOutput of the dividends calculation for the bets dataset is below : \n');
	calculateDividends(input);
	process.exit(0);
});


function calculateDividends(bets) {
	var result = bets[bets.length - 1].split(':');
	var winBetString = `W:${result[1]}`;
	var placeBetString = [];
	for (var x = 1; x < result.length; x++) {
		placeBetString.push(`P:${result[x]}`);
	}
	
	var exactaBetString = `E:${result[1]},${result[2]}`;
	var winBetCommission = 15;
	var placeBetCommission = 12;
	var exactaBetCommission = 18;
	var winnerOddsPoolSum = 0,
		placeOddsPoolSum = [0, 0, 0],
		exactaOddsPoolSum = 0
	totalWinPoolSum = 0, totalPlacePoolSum = 0, totalExactaPoolSum = 0;

	for (var i = 0; i < bets.length; i++) {
		var winArr = bets[i].split(':');
		if (bets[i].indexOf(winBetString) !== -1) {
			winnerOddsPoolSum += parseInt(winArr[winArr.length - 1]);
		}

		placeBetString.some((item, index) => {
			if (bets[i].indexOf(item) !== -1) {
				placeOddsPoolSum[index] += parseInt(winArr[winArr.length - 1]);
			}
		});

		if (bets[i].indexOf(exactaBetString) !== -1) {
			exactaOddsPoolSum += parseInt(winArr[winArr.length - 1]);
		}

		if (bets[i].indexOf('W') !== -1) {
			totalWinPoolSum += parseInt(winArr[winArr.length - 1]);
		}

		if (bets[i].indexOf('P') !== -1) {
			totalPlacePoolSum += parseInt(winArr[winArr.length - 1]);
		}

		if (bets[i].indexOf('E') !== -1) {
			totalExactaPoolSum += parseInt(winArr[winArr.length - 1]);
		}
	}
	
	console.log(`Win:${result[1]}:$${parseFloat((totalWinPoolSum - winBetCommission / 100 * totalWinPoolSum) / winnerOddsPoolSum).toFixed(2)}`);
	
	for (var t=0; t < result.length - 1; t++) {
		console.log(`Place:${result[t+1]}:$${parseFloat((totalPlacePoolSum - placeBetCommission / 100 * totalPlacePoolSum) / placeOddsPoolSum[t] / (result.length-1)).toFixed(2)}`);
	}
	
	console.log(`Exacta:${result[1]},${result[2]}:$${parseFloat((totalExactaPoolSum - exactaBetCommission / 100 * totalExactaPoolSum) / exactaOddsPoolSum).toFixed(2)}`);
}