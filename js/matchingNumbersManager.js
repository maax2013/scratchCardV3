var PrizesManager = require('./prizesManager');

var MatchingNumbersManager = {
    NUMBER_MANAGER_DONE: 'NUMBER_MANAGER_DONE',

    game:null,
    allNumbers:null,

    totalNumbersCount:99,
    callerNumbersCount:7,
    yourNumbersCount:25,
    callerNumbers:null,
    loseNumbers:null,
    yourNumbers:null,
    matchedCallerNumbers:null,
    totalMatches:0,

    signal: new Phaser.Signal(),

    createNumbersV3Path: function (game,pValue,pType) {
        this.game = game;
        this.allNumbers = [];
        for(var n = 0;n<this.totalNumbersCount;n++){
            this.allNumbers.push(n+1);
        }
        //console.log(this.allNumbers);
        Phaser.ArrayUtils.shuffle(this.allNumbers);

        this.callerNumbers = this.allNumbers.slice(0,this.callerNumbersCount);
        this.loseNumbers = this.allNumbers.slice(this.callerNumbersCount);
        //console.log(this.callerNumbers);
        //console.log(this.loseNumbers);

        var prizesMnger = Object.create(PrizesManager);
        this.finalPrizesObj = prizesMnger.parsePrizes(game, pValue, pType);

        if(this.finalPrizesObj){
            this.totalMatches = this.finalPrizesObj.totalMatches;
            this.matchedCallerNumbers = this.callerNumbers.slice(0,this.totalMatches);
            this.yourNumbers = this.matchedCallerNumbers.concat(this.loseNumbers.slice(0,this.yourNumbersCount-this.totalMatches));

            this.signal.dispatch(this.NUMBER_MANAGER_DONE);//>>>>>>>>>>>>>>
        }
    },


    getCallerNumbers: function () {
        Phaser.ArrayUtils.shuffle(this.callerNumbers);
        return this.callerNumbers;
    },
    getYourNumbers: function () {
        Phaser.ArrayUtils.shuffle(this.yourNumbers);
        return this.yourNumbers;
    },
    getMatchedCallerNumbers: function () {
        return this.matchedCallerNumbers;
    },

    getDividedPrizeNames: function () {
        return this.finalPrizesObj.prizeImageNames;
    },
    getDividedPrizeValues: function () {
        return this.finalPrizesObj.finalPrizes;
    },
    getMultiplier: function () {
        return this.finalPrizesObj.multiplier;
    }

};

module.exports = MatchingNumbersManager;
