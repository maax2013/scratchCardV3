var PrizesManager = require('./prizesManager');

var MatchingNumbersManager = {
    NUMBER_MANAGER_DONE: 'NUMBER_MANAGER_DONE',
    NUMBER_MANAGER_ERROR: 'NUMBER_MANAGER_ERROR: invalid prize',

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

        this.prizesMnger = Object.create(PrizesManager);
        this.prizesMnger.parsePrizes(game, pValue, pType);

        if(this.prizesMnger.finalPrizes&&this.prizesMnger.totalMatches>0){
            this.totalMatches = this.prizesMnger.totalMatches;
            this.matchedCallerNumbers = this.callerNumbers.slice(0,this.totalMatches);
            this.yourNumbers = this.matchedCallerNumbers.concat(this.loseNumbers.slice(0,this.yourNumbersCount-this.totalMatches));

            this.signal.dispatch(this.NUMBER_MANAGER_DONE);//>>>>>>>>>>>>>>
        }else{
            this.signal.dispatch(this.NUMBER_MANAGER_ERROR);//>>>>>>>>>>>>>>
            return;
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
        return this.prizesMnger.prizeImageNames;
    },
    getDividedPrizeValues: function () {
        return this.prizesMnger.finalPrizes;
    },
    getMultiplier: function () {
        return this.prizesMnger.multiplier;
    }

};

module.exports = MatchingNumbersManager;
