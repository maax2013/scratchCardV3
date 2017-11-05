var YourNo = require('./yourNo');

var YourNoZone = {
    CALLER_AREA_NUMBER_SHOWED: 'CALLER_AREA_NUMBER_SHOWED',
    CALLER_AREA_DONE: 'CALLER_AREA_DONE',

    game:null,
    offX:null,
    offY:null,
    revealGroup:null,
    showingGroup:null,
    allNumbers:null,
    gameBoard:null,
    gameBoardBlue:null,
    foilHolder:null,
    unitWidth:105,
    unitHeight:106,
    numbersHolder:null,
    tempNumberObj:null,
    tempRectArea:null,

    revealBMDAll:null,
    revealBMD:null,
    revealMaskBMD:null,
    revealFinalBMD:null,
    revealFinalHolder:null,
    revealFinalImage:null,
    BMDWidth:null,
    BMDHeight:null,

    brushRadius:23,//~~~~~~~~~~~~~~~~~~~
    scratchEmitter:null,
    currentPoint:null,
    lastPoint:null,
    lastDiff:null,
    currentDiff:null,

    tempBrushTowardX:null,
    tempBrushTowardY:null,
    tempQ:0,

    totalRevealedNumber:0,

    autoRevealPointer:null,
    autoRevealPointerHolder:null,
    isAutoRevealing:false,
    autoRevealTimerEvent:false,
    //autoRevealPath1:null,
    updateIndex: 0, // incrementing index to use with modulus for skipping frames
    updateModulus: 8, // draw every six frames

    //soundMagic:null,
    soundScratch:null,

    signal: new Phaser.Signal(),

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
        this.unitNoX = this.unitWidth/2+2;
        this.unitNoY = this.unitHeight/2-10;

        this.foilHolder = game.add.group();
        this.foilHolder.x = this.offX;
        this.foilHolder.y = this.offY;
        revealGroup.add(this.foilHolder);
        this.foilHolder.alpha = 0.3;

        this.allUnits = [];
        // var foilOffX = 15;
        // var foilOffY = 5;
        for(var row=0;row<5;row++){
            for(var i=0;i<5;i++){
                var x1= i*(this.unitWidth+this.unitPadX*2);
                var y1 = row*(this.unitHeight+this.unitPadY*2);
                this.foilHolder.create(x1+this.unitPadX,y1+this.unitPadY,'largeTile');

                var thisNoUnit = new YourNo(this.game,revealGroup,showingGroup,x1+this.offX+this.unitPadX,y1+this.offY+this.unitPadY,this.unitWidth,this.unitHeight);

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
            //element.setNumber(numbers[tempN]);
            if(matchedNumbers.indexOf(numbers[tempN])>-1){
                element.setNumberV3(this.revealBMD, numbers[tempN],prizes.pop(),totalFrames, this.unitNoX, this.unitNoY);
                element.flagMatched();
            }else{
                if(tempIndex==0){
                    element.setNumberV3(this.revealBMD, -1,tempM,totalFrames, this.unitNoX, this.unitNoY);
                }else{
                    element.setNumberV3(this.revealBMD, numbers[tempN],null,totalFrames, this.unitNoX, this.unitNoY);
                }
                tempIndex--;
            }
            // element.signal.add(this.numberRevealed,this);//+++++++++++++
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

    paintAll: function () {

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
