var YourNo = require('./yourNo');

var YourNoZone = {

    init: function(game, revealGroup,showingGroup, topNbottomUnits){
        this.game = game;
        this.revealGroup = revealGroup;
        this.showingGroup = showingGroup;
        this.offX = 60;
        this.offY = 380;
        this.unitWidth = 80;
        this.unitHeight = 96;
        this.unitPadX = 12.5;
        this.unitPadY = 5;

        this.foilHolder = game.add.group();
        this.foilHolder.x = this.offX;
        this.foilHolder.y = this.offY;
        revealGroup.add(this.foilHolder);
        this.foilHolder.alpha = 0.3;

        this.allUnits = [];

        for(var row=0;row<5;row++){
            for(var i=0;i<5;i++){
                var x1= i*(this.unitWidth+this.unitPadX*2);
                var y1 = row*(this.unitHeight+this.unitPadY*2);
                this.foilHolder.create(x1+this.unitPadX,y1+this.unitPadY,'largeTile');

                var thisUnitX = x1+this.offX+this.unitPadX;
                var thisUnitY = y1+this.offY+this.unitPadY;
                var thisNoUnit = new YourNo(this.game,revealGroup,showingGroup,thisUnitX,thisUnitY,this.unitWidth,this.unitHeight);

                topNbottomUnits.push(thisNoUnit);
                this.allUnits.push(thisNoUnit);
            }
        }
    },

    setBoardV3Path: function (numbers, matchedNumbers,prizes,multiplier) {

        var frameData = this.game.cache.getFrameData('prizes');
        var totalFrames = 0;
        if(frameData) {
            var frames = frameData.getFrames();
            for(var i in frames) {
                totalFrames++;
            }
        }
        //console.log(totalFrames);

        if(multiplier>1){
            var tempIndex = this.game.rnd.integerInRange(0,numbers.length-matchedNumbers.length-1);
            var tempM;
            if(multiplier===5){
                tempM = this.game.make.sprite(0,0,'iconMultiplier5');
            }else if(multiplier===10){
                tempM = this.game.make.sprite(0,0,'iconMultiplier10');
            }
            tempM.scale.set(0.75);

        }

        var tempN = 0;
        this.allUnits.forEach(function(element){
            if(matchedNumbers.indexOf(numbers[tempN])>-1){
                element.setNumberV3(numbers[tempN],prizes.pop(),totalFrames);
                element.flagMatched();
            }else{
                if(tempIndex==0){
                    element.setNumberV3(-1,tempM,totalFrames);
                }else{
                    element.setNumberV3(numbers[tempN],null,totalFrames);
                }
                tempIndex--;
            }
            tempN++;
        },this);
    },

    showFoil: function (delay) {
        this.game.add.tween(this.foilHolder).to({alpha:1},500,"Linear",true,delay);
    },

    createBMDs: function(wholeImg){
        this.allUnits.forEach(function(element){
            element.copyBMD(wholeImg);
        },this);
    },

    waitThenShowBlink: function () {
        this.game.time.events.add(1000, this.showBlink, this);
    },

    showBlink: function () {
        this.allUnits.forEach(function(element){
            if(element.isMatched||element.isMultiplier){
                element.blink();
            }
        },this);
    },

};

module.exports = YourNoZone;
