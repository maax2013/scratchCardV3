var MatchNo = require('./matchNo');

var MatchNoZone = {
    CALLER_AREA_NUMBER_SHOWED: 'CALLER_AREA_NUMBER_SHOWED',
    CALLER_AREA_DONE: 'CALLER_AREA_DONE',

    game:null,
    offX:null,
    offY:null,
    revealGroup:null,
    showingGroup:null,
    allUnits:null,
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
        this.offX = 52;
        this.offY = 250;
        this.unitWidth = 67;
        this.unitHeight = 85;
        this.unitPadX = 5;
        this.unitPadY = 5;
        this.unitNoX = this.unitWidth/2+2;
        this.unitNoY = this.unitHeight/2;

        this.foilHolder = game.add.group();
        this.foilHolder.x = this.offX;
        this.foilHolder.y = this.offY;
        revealGroup.add(this.foilHolder);
        this.foilHolder.alpha = 0.3;

        this.allUnits = [];
        // var foilOffX = 15;
        // var foilOffY = 5;
        for(var row=0;row<1;row++){
            for(var i=0;i<7;i++){
                var x1= i*(this.unitWidth+this.unitPadX*2);
                var y1 = row*(this.unitHeight+this.unitPadY*2);
                this.foilHolder.create(x1+this.unitPadX,y1+this.unitPadY,'smallTile');

                // var thisNoUnit = Object.create(MatchNo);
                // thisNoUnit.init(this.game,x1,y1,this.numbersHolder,this.unitWidth,this.unitHeight,this.offX,this.offY,this.revealFinalHolder );

                var thisNoUnit = new MatchNo(this.game,revealGroup,showingGroup,x1+this.offX+this.unitPadX,y1+this.offY+this.unitPadY,this.unitWidth,this.unitHeight);

                topNbottomUnits.push(thisNoUnit);
                this.allUnits.push(thisNoUnit);
            }
        }
    },

    setBoard: function (numbers, matchedNumbers) {

        var tempN = 0;

        this.allUnits.forEach(function(element){
            // console.log(numbers[tempN]);
            element.setNumber(this.revealBMD, numbers[tempN], this.unitNoX, this.unitNoY);
            if(matchedNumbers.indexOf(numbers[tempN])>-1){
                element.flagMatched();
            }
            // element.signal.add(this.numberRevealed,this);//+++++++++++++++
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

};

module.exports = MatchNoZone;
