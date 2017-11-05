var PrizesManager = require('./prizesManager');

var MatchingNumbersManager = {
    NUMBER_MANAGER_DONE: 'NUMBER_MANAGER_DONE',
    NUMBER_MANAGER_ERROR: 'NUMBER_MANAGER_ERROR: invalid prize',

    game:null,
    allNumbers:null,

    //divideTokenPrizeGroups:null,
    //numberGroup1:null,
    //numberGroup2:null,
    //numberLayout1:null,
    //numberLayout2:null,

    totalNumbersCount:99,
    callerNumbersCount:7,
    callerNumbers:null,
    loseNumbers:null,
    yourNumbers:null,
    matchedCallerNumbers:null,
    dividedTokenValues:null,
    totalMatches:0,
    //matchedNumbers:null,
    //unmatchedNumbers:null,
    //matchedNumbersInGroup1:null,
    //matchedNumbersInGroup2:null,

    //keys:null,
    //allKeys:null,
    //
    //card1PrizeValue:null,
    //card1PrizeType:null,
    //card2PrizeValue:null,
    //card2PrizeType:null,
    //card1Key:null,
    //card2Key:null,
    //card1Layout:null,
    //card2Layout:null,
    //card1MatchesCount:null,
    //card2MatchesCount:null,
    //card1MatchedNumbers:null,
    //card2MatchedNumbers:null,

    signal: new Phaser.Signal(),

    createNumbersV3Path: function (game,pValue,pType) {
        this.game = game;
        this.allNumbers = [];
        for(var n = 1;n<this.totalNumbersCount+1;n++){
            this.allNumbers.push(n);
        }
        //console.log(this.allNumbers);
        Phaser.ArrayUtils.shuffle(this.allNumbers);//++++++++++++++++++++

        this.callerNumbers = this.allNumbers.slice(0,this.callerNumbersCount);
        this.loseNumbers = this.allNumbers.slice(this.callerNumbersCount);
        //console.log(this.callerNumbers);
        //console.log(this.loseNumbers);

        //this.keys = Object.create(Keys);
        //this.allKeys = this.keys.getAllKeys();
        ////console.log(allKeys[0].prizeType);

        //this.dividedTokenValues = this.divideTokenValue(tValue);
        //console.log(this.dividedTokenValues);
        //if(this.dividedTokenValues){
        //    if(cValue>0){
        //        this.totalMatches = this.dividedTokenValues.length+1;
        //    }else{
        //        this.totalMatches = this.dividedTokenValues.length;
        //    }
        //
        //    this.matchedCallerNumbers = this.callerNumbers.slice(0,this.totalMatches);
        //    this.yourNumbers = this.matchedCallerNumbers.concat(this.loseNumbers.slice(0,25-this.totalMatches));
        //}else{
        //    this.signal.dispatch(this.NUMBER_MANAGER_ERROR);
        //    return;
        //}
        //
        ////
        //////console.log(this.findKey(this.card1PrizeType,this.card1PrizeValue));
        ////this.card1Key = this.findKey(this.card1PrizeType,this.card1PrizeValue);
        ////this.card2Key = this.findKey(this.card2PrizeType,this.card2PrizeValue);
        ////this.card1Layout = this.pickLayout(this.card1Key);
        ////this.card2Layout = this.pickLayout(this.card2Key);
        ////
        ////if(this.card1Layout === null){
        ////    this.card1MatchesCount = this.card1Key.matches;
        ////}else{
        ////    this.card1MatchesCount = this.getMatchesFromLayout(this.card1Layout);
        ////}
        ////
        ////if(this.card2Layout === null){
        ////    this.card2MatchesCount = this.card2Key.matches;
        ////}else{
        ////    this.card2MatchesCount = this.getMatchesFromLayout(this.card2Layout);
        ////}
        ////Phaser.ArrayUtils.shuffle(this.callerNumbers);//+++++++++++++++++++++++++++++
        ////this.card1MatchedNumbers = this.callerNumbers.slice(0,this.card1MatchesCount);
        ////Phaser.ArrayUtils.shuffle(this.callerNumbers);//+++++++++++++++++++++++++++++
        ////this.card2MatchedNumbers = this.callerNumbers.slice(0,this.card2MatchesCount);
        //////console.log(this.card1MatchedNumbers);
        //////console.log(this.card2MatchedNumbers);
        //
        //this.signal.dispatch(this.NUMBER_MANAGER_DONE);

        this.prizesMnger = Object.create(PrizesManager);
        this.prizesMnger.parsePrizes(game, pValue, pType);

        if(this.prizesMnger.finalPrizes&&this.prizesMnger.totalMatches>0){
            this.totalMatches = this.prizesMnger.totalMatches;
            this.matchedCallerNumbers = this.callerNumbers.slice(0,this.totalMatches);
            this.yourNumbers = this.matchedCallerNumbers.concat(this.loseNumbers.slice(0,25-this.totalMatches));
        }else{
            this.signal.dispatch(this.NUMBER_MANAGER_ERROR);
            return;
        }

        this.signal.dispatch(this.NUMBER_MANAGER_DONE);
    },

    createNumbers: function (game,cValue,tValue) {

        //TODO: calculate multiplier

        this.game = game;
        this.allNumbers = [];
        for(var n = 1;n<this.totalNumbersCount+1;n++){
            this.allNumbers.push(n);
        }
        //console.log(this.allNumbers);
        Phaser.ArrayUtils.shuffle(this.allNumbers);//++++++++++++++++++++

        this.callerNumbers = this.allNumbers.slice(0,this.callerNumbersCount);
        this.loseNumbers = this.allNumbers.slice(this.callerNumbersCount);
        //console.log(this.callerNumbers);
        //console.log(this.loseNumbers);

        //this.keys = Object.create(Keys);
        //this.allKeys = this.keys.getAllKeys();
        ////console.log(allKeys[0].prizeType);

        this.dividedTokenValues = this.divideTokenValue(tValue);
        console.log(this.dividedTokenValues);
        if(this.dividedTokenValues){
            if(cValue>0){
                this.totalMatches = this.dividedTokenValues.length+1;
            }else{
                this.totalMatches = this.dividedTokenValues.length;
            }

            this.matchedCallerNumbers = this.callerNumbers.slice(0,this.totalMatches);
            this.yourNumbers = this.matchedCallerNumbers.concat(this.loseNumbers.slice(0,20-this.totalMatches));
        }else{
            this.signal.dispatch(this.NUMBER_MANAGER_ERROR);
            return;
        }

        //
        ////console.log(this.findKey(this.card1PrizeType,this.card1PrizeValue));
        //this.card1Key = this.findKey(this.card1PrizeType,this.card1PrizeValue);
        //this.card2Key = this.findKey(this.card2PrizeType,this.card2PrizeValue);
        //this.card1Layout = this.pickLayout(this.card1Key);
        //this.card2Layout = this.pickLayout(this.card2Key);
        //
        //if(this.card1Layout === null){
        //    this.card1MatchesCount = this.card1Key.matches;
        //}else{
        //    this.card1MatchesCount = this.getMatchesFromLayout(this.card1Layout);
        //}
        //
        //if(this.card2Layout === null){
        //    this.card2MatchesCount = this.card2Key.matches;
        //}else{
        //    this.card2MatchesCount = this.getMatchesFromLayout(this.card2Layout);
        //}
        //Phaser.ArrayUtils.shuffle(this.callerNumbers);//+++++++++++++++++++++++++++++
        //this.card1MatchedNumbers = this.callerNumbers.slice(0,this.card1MatchesCount);
        //Phaser.ArrayUtils.shuffle(this.callerNumbers);//+++++++++++++++++++++++++++++
        //this.card2MatchedNumbers = this.callerNumbers.slice(0,this.card2MatchesCount);
        ////console.log(this.card1MatchedNumbers);
        ////console.log(this.card2MatchedNumbers);

        this.signal.dispatch(this.NUMBER_MANAGER_DONE);
    },

    divideTokenValue: function (tValue) {
        var dividePool = [];
        switch (tValue){
            case 100:
                dividePool.push([100]);
                dividePool.push([50,50]);
                break;
            case 250:
                dividePool.push([250]);
                dividePool.push([200,50]);
                dividePool.push([100,100,50]);
                break;
            case 500:
                dividePool.push([500]);
                dividePool.push([250,250]);
                dividePool.push([200,200,100]);
                dividePool.push([250,200,50]);
                break;
            case 750:
                dividePool.push([750]);
                dividePool.push([500,250]);
                dividePool.push([500,200,50]);
                dividePool.push([250,250,250]);
                break;
            case 1000:
                dividePool.push([1000]);
                dividePool.push([500,500]);
                dividePool.push([750,250]);
                dividePool.push([500,250,250]);
                dividePool.push([750,200,50]);
                break;
            case 2500:
                dividePool.push([2500]);
                dividePool.push([2000,500]);
                dividePool.push([1000,1000,500]);
                dividePool.push([2000,250,250]);
                break;
            case 5000:
                dividePool.push([5000]);
                dividePool.push([2500,2500]);
                dividePool.push([2500,2000,500]);
                dividePool.push([2000,2000,1000]);
                break;
            case 7500:
                dividePool.push([7500]);
                dividePool.push([5000,2500]);
                dividePool.push([2500,2500,2500]);
                dividePool.push([5000,2000,500]);
                break;
            case 10000:
                dividePool.push([10000]);
                dividePool.push([5000,5000]);
                dividePool.push([7500,2500]);
                dividePool.push([5000,2500,2500]);
                dividePool.push([7500,2000,500]);
                break;
            case 15000:
                dividePool.push([10000,5000]);
                dividePool.push([7500,7500]);
                dividePool.push([10000,2500,2500]);
                dividePool.push([7500,5000,2500]);
                break;
            case 20000:
                dividePool.push([10000,10000]);
                dividePool.push([10000,5000,5000]);
                dividePool.push([10000,7500,2500]);
                break;
            case 25000:
                dividePool.push([10000,10000,5000]);
                dividePool.push([10000,7500,7500]);
                break;
            case 30000:
                dividePool.push([10000,10000,10000]);
                break;
        }
        if(dividePool.length>0){
            var rdmIndex = this.game.rnd.integerInRange(0,dividePool.length-1);
            return dividePool[rdmIndex];
        }else{
            return null;
        }
    },

    //findKey: function (ptype,pvalue) {
    //    for(var i=0;i<this.allKeys.length;i++){
    //        //console.log(this.keys.getAllKeys());
    //        if(this.allKeys[i].prizeType === ptype && this.allKeys[i].prizeValue === pvalue){
    //            ////targetKey = allKeys[i];
    //            ////this.numberLayout1 = allKeys[i];
    //            //this.numberLayout1 = this.pickLayout(this.allKeys[i]);
    //            ////console.log(this.numberLayout1.layout);
    //            //this.logMatrix(this.numberLayout1);
    //            //break;
    //
    //            return this.allKeys[i];
    //            //return this.pickLayout(this.allKeys[i]);
    //        }
    //    }
    //    //invalid prize
    //    this.signal.dispatch(this.NUMBER_MANAGER_ERROR);
    //},
    //
    //pickLayout: function (obj) {
    //    var totalPossibleLayouts = [];
    //    var targetLayout = null;
    //
    //    if(obj.layout) totalPossibleLayouts.push(obj.layout);
    //    if(obj.layout1) totalPossibleLayouts.push(obj.layout1);
    //    if(obj.layout2) totalPossibleLayouts.push(obj.layout2);
    //    if(obj.layout3) totalPossibleLayouts.push(obj.layout3);
    //    if(obj.layout4) totalPossibleLayouts.push(obj.layout4);
    //
    //    if(totalPossibleLayouts.length>0){
    //        var rdmIndex = this.game.rnd.integerInRange(0,totalPossibleLayouts.length-1);
    //        targetLayout = totalPossibleLayouts[rdmIndex];
    //    }
    //    return targetLayout;
    //},
    //getMatchesFromLayout: function (array) {
    //    var tempCount = 0;
    //    array.forEach(function(element){
    //        element.forEach(function(element){
    //            //console.log(element);
    //            if(element===1) tempCount++;
    //        });
    //    });
    //    //console.log(tempCount);
    //    return tempCount;
    //},

    getCallerNumbers: function () {
        Phaser.ArrayUtils.shuffle(this.callerNumbers);//+++++++++++++++
        return this.callerNumbers;
    },
    getYourNumbers: function () {
        Phaser.ArrayUtils.shuffle(this.yourNumbers);//++++++++++++++
        return this.yourNumbers;
    },
    getMatchedCallerNumbers: function () {
        return this.matchedCallerNumbers;
    },
    getDividedTokenValues: function () {
        return this.dividedTokenValues;
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
    //getLayout1: function () {
    //    return this.card1Layout;
    //},
    //getLayout2: function () {
    //    return this.card2Layout;
    //},
    //getMatchedNumbers1: function () {
    //    return this.card1MatchedNumbers;
    //},
    //getMatchedNumbers2: function () {
    //    return this.card2MatchedNumbers;
    //},
    //getCardKey1: function () {
    //    return this.card1Key;
    //},
    //getCardKey2: function () {
    //    return this.card2Key;
    //},
    //
    //logLayoutMatrix: function (array) {
    //    for(var i=0;i<array.length;i++){
    //        console.log("row "+i+":     ",array[i][0],array[i][1],array[i][2],array[i][3],array[i][4]);
    //    }
    //}
};

module.exports = MatchingNumbersManager;
