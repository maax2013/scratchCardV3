var PrizesManager = {

    prizeFrames:null,
    prizeTypePrefix:null,
    maxPerms:3,
    game:null,
    multiplier:null,
    totalMatches:null,
    finalPrizes:null,

    parsePrizes: function (game,prizeValue, prizeType) {
        this.game = game;
        this.prizeTypePrefix = prizeType.toLowerCase().substr(0, 1);
        this.prizeTypePrefix = this.prizeTypePrefix == "e" ? "c" : this.prizeTypePrefix;
        //console.log(this.prizeTypePrefix);

        this.prizeFrames = [];
        var frameData = this.game.cache.getFrameData('prizes');

        if(frameData) {
            var frames = frameData.getFrames();
            for(var i in frames) {
                var sub = frames[i].name.substring(0,1);
                if(sub == 't' || sub == 'c') {
                    this.prizeFrames.push(frames[i]);
                }
            }
        }

        var weights = [1, 2, 1];
        var values = [10, 5, 1];
        var multiplier = this.getRandomWeighted(values, weights);

        this.getFinalPrizes(prizeValue,multiplier);

        if(this.finalPrizes && this.totalMatches>0)
            return this.getFinalPrizesObj();//>>>>>>>>>>>>>
        else return null;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    },

    // returns a random value based on weights
    getRandomWeighted:function(values, weights) {

        var weightedSum = 0;
        for(var i in weights) {
            weightedSum += weights[i];
        }
        // get random number between 0 and sum of weights
        var rand = Math.random() * weightedSum;

        i = 0;
        var n = 0;
        while(i < values.length) {
            n += weights[i];
            if(n >= rand) {
                break;
            }
            i++;
        }
        return values[i];
    },

    getFinalPrizes: function (prizeValue, multiplier) {
        var prizeValues = this.getRandomPrizeValues(prizeValue, multiplier);
        if(prizeValues === undefined) {
            console.log('need to change multiplier');
            // multiplier = 1;
            prizeValues = this.getRandomPrizeValues(prizeValue, 1);
        }
        if(prizeValues){
            this.multiplier = multiplier;
            this.totalMatches = prizeValues.length;
            this.finalPrizes = prizeValues;

            console.log(prizeValues, this.multiplier+"X");

            this.prizeImageNames = [];
            for(var i=0;i<prizeValues.length;i++){
                this.prizeImageNames.push(this.prizeTypePrefix+prizeValues[i]+'.png');
            }
        }
    },
    getFinalPrizesObj: function(){
        this.finalPrizesObj = {
            totalMatches: this.totalMatches,
            prizeImageNames: this.prizeImageNames,
            finalPrizes: this.finalPrizes,
            multiplier: this.multiplier
        }
        return this.finalPrizesObj;
    },

    // picks at random from a list of permutations that go to specified depth
    getRandomPrizeValues: function(prizeValue, multiplier) {
        // map prize value names t2000.png to 2000
        var regexp = new RegExp(this.prizeTypePrefix+"(\\d+)");
        //console.log("regexp: "+regexp);
        var values = this.prizeFrames.map(function(prizeFrame, index, arr) {
            //console.log("prize frame name: "+ prizeFrame.name);
            var matches = regexp.exec(prizeFrame.name);
            //console.log("matches: "+matches);
            if(matches) {
                return Number(matches[1]);
            }
        });
        //console.log("prize frames: "+ this.prizeFrames);
        //console.log("values: "+values);
        // remove values that didn't match
        values = values.filter(function(value, i, arr) { return value !== undefined; });
        // remove any duplicates
        var uniqueValues = [];
        values.forEach(function(value) {
            if(uniqueValues.indexOf(value) == -1) uniqueValues.push(value);
        });
        //sort values for easier iterating logic if needed
        uniqueValues.sort(function(a, b) { return b - a; });
        console.log("unique values: "+uniqueValues);

        //[10000, 7500, 5000, 2500, 2000, 1000, 750, 500, 250, 200, 100, 50];
        console.log("prize: " + prizeValue + ", multiplier: " + multiplier);
        var prizes = this.getAllPermutationsAtDepth(prizeValue / multiplier, uniqueValues, this.maxPerms);
        var randomPrize = prizes[Math.floor(Math.random()*prizes.length)];
        console.log("random prize: " + randomPrize);
        return randomPrize;
    },

    getAllPermutationsAtDepth:function(amount, figures, depth){
        var results = this.calculatePermutations(amount, figures, depth);

        console.log("getAllPermutationsAtDepth " + depth + ": " + results.join("..."));
        return results;
    },

    calculatePermutations:function (amount, figures, depth) {
        if (amount <= 0) return [];

        var results = [];
        for (var i in figures) {
            var figure = figures[i];
            if (amount === figure) {
                results.push([amount]);
            } else if ((amount > figure) && (depth > 1)) {
                var remainder = amount - figure;
                var alternatives = this.calculatePermutations(remainder, figures, depth - 1);
                for (var j in alternatives) {
                    results.push([figure].concat(alternatives[j]));
                }
            }
        }

        return results;
    }
};

module.exports = PrizesManager;
