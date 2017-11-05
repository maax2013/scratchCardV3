var YourNumber = require('./yourNumber');

var YourNumberArea = {
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
    bagHolder:null,
    yourNumberWidth:105,
    yourNumberHeight:106,
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

    init: function (game,parent,offX,offY,revealGroup,showingGroup){
        this.game = game;
        this.revealGroup = revealGroup;
        this.showingGroup = showingGroup;
        this.offX = offX;
        this.offY = offY;

        //this.gameBoard = parent.create(0,0,'BB_board');
        //this.gameBoard.anchor.set(0.5);

        this.bagHolder = game.add.group();
        this.bagHolder.x = offX;
        this.bagHolder.y = offY;
        parent.add(this.bagHolder);

        this.numbersHolder = game.add.group();
        this.numbersHolder.x = offX;
        this.numbersHolder.y = offY;
        parent.add(this.numbersHolder);

        this.autoRevealPointerHolder = game.add.group();
        parent.add(this.autoRevealPointerHolder);
        //this.autoRevealPointer = new Phaser.Point();
        //this.autoRevealPointerHolder.addChild(this.autoRevealPointer);
        this.autoRevealPointer = this.autoRevealPointerHolder.create(0,0);

        this.revealFinalHolder = game.add.group();
        this.revealFinalHolder.x = offX;
        this.revealFinalHolder.y = offY;
        this.showingGroup.add(this.revealFinalHolder);

        this.allNumbers = [];
        for(var row=0;row<5;row++){
            for(var i=0;i<5;i++){
                var x1= i*this.yourNumberWidth;
                var y1 = row*this.yourNumberHeight;
                this.bagHolder.create(x1+15,y1+5,'largeTile');
                var thisNumberCell1 = Object.create(YourNumber);
                thisNumberCell1.init(this.game,x1,y1,this.numbersHolder,this.yourNumberWidth,this.yourNumberHeight,this.offX,this.offY,this.revealFinalHolder );
                this.allNumbers.push(thisNumberCell1);
            }
        }

        this.BMDWidth = this.yourNumberWidth*5;
        this.BMDHeight = this.yourNumberHeight*4;

        this.revealBMDAll = game.make.bitmapData(1000, 1300);
        this.revealBMD = game.make.bitmapData(this.BMDWidth, this.BMDHeight);
        this.revealMaskBMD = game.make.bitmapData(this.BMDWidth, this.BMDHeight);
        this.revealFinalBMD = game.make.bitmapData(this.BMDWidth, this.BMDHeight);
        //this.revealFinalBMD.circle(0, 0, 2000);//-------------
        this.revealFinalImage = this.revealFinalHolder.addChild(game.add.image(0, 0, this.revealFinalBMD));//+++++++++
        //this.revealFinalImage.alpha = 0.5;//--------------

        ////this.revealMaskBMD.circle(0, 0, 100);//---------
        ////this.revealMaskBMD.draw(this.gameBoardBlue,0,0);//--------------
        //this.revealMaskBMD.load('BB_boardBlue');
        //this.revealMaskBMD.processPixelRGB(this.forEachMaskPixel,this);
        ////this.revealFinalImage = this.revealFinalHolder.addChild(game.add.image(0, 0, this.revealMaskBMD));//------
        ////this.revealMaskBMD.circle(200, 100, 50);//----------

        this.bagHolder.alpha = 0.3;

        //this.soundMagic = this.game.add.audio('audio_magic');
        this.soundScratch = this.game.add.audio('audio_scratch',3);
        this.soundScratch.addMarker("loop",0,0.11,3);

        this.game.time.advancedTiming = true;
    },
    forEachMaskPixel: function (pixel) {
        if(pixel.a == 0){
            pixel.r = 0;
            pixel.g = 0;
            pixel.b = 0;
            pixel.a = 255;
        }else{
            pixel.r = 0;
            pixel.g = 0;
            pixel.b = 0;
            pixel.a = 0;
        }
        //pixel.b = 255-pixel.b;

        return pixel;
    },
    //recolor: function () {
    //    console.log(this.revealMaskBMD.getPixelRGB(1,1));
    //    console.log(this.revealMaskBMD.getPixelRGB(100,100));
    //    //this.revealMaskBMD.replaceRGB(0,0,0,0,1,1,1,255);
    //    this.revealMaskBMD.circle(200, 100, 50);
    //    this.game.stage.updateTransform();
    //},

    setBoardV3Path: function (numbers, matchedNumbers,prizes,multiplier) {

        //this.revealMaskBMD.circle(200, 100, 50);
        //this.gameBoardBlue.alpha = 1;
        this.numbersHolder.alpha = 1;

        this.createSnapshot(this.revealBMDAll,this.revealGroup,false);
        this.tempRectArea = new Phaser.Rectangle(this.offX, this.offY,this.BMDWidth, this.BMDHeight);
        this.revealBMD.copyRect(this.revealBMDAll,this.tempRectArea, 0,0);

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
                tempM = this.game.make.sprite(15,9,'iconMultiplier5');
            }else if(multiplier===10){
                tempM = this.game.make.sprite(15,9,'iconMultiplier10');
            }
            tempM.scale.set(0.75);

        }

        var tempN = 0;
        this.allNumbers.forEach(function(element){
            //element.setNumber(numbers[tempN]);
            if(matchedNumbers.indexOf(numbers[tempN])>-1){
                element.setNumberV3(this.revealBMD, numbers[tempN],prizes.pop(),totalFrames);
                element.markMatch();
            }else{
                if(tempIndex==0){
                    element.setNumberV3(this.revealBMD, -1,tempM,totalFrames);
                }else{
                    element.setNumberV3(this.revealBMD, numbers[tempN],null,totalFrames);
                }
                tempIndex--;
            }
            element.signal.add(this.numberRevealed,this);
            tempN++;
        },this);

        this.numbersHolder.alpha = 0;//++++++++++
        //this.enableScratch();//--------------------------
    },

    setBoard: function (numbers, matchedNumbers,prizes) {

        //this.revealMaskBMD.circle(200, 100, 50);
        //this.gameBoardBlue.alpha = 1;
        this.numbersHolder.alpha = 1;

        this.createSnapshot(this.revealBMDAll,this.revealGroup,false);
        this.tempRectArea = new Phaser.Rectangle(this.offX, this.offY,this.BMDWidth, this.BMDHeight);
        this.revealBMD.copyRect(this.revealBMDAll,this.tempRectArea, 0,0);

        var tempN = 0;
        this.allNumbers.forEach(function(element){
            //element.setNumber(numbers[tempN]);
            if(matchedNumbers.indexOf(numbers[tempN])>-1){
                element.setNumber(this.revealBMD, numbers[tempN],prizes.pop());
                element.markMatch();
            }else{
                element.setNumber(this.revealBMD, numbers[tempN],null);
            }
            element.signal.add(this.numberRevealed,this);
            tempN++;
        },this);

        this.numbersHolder.alpha = 0;//++++++++++
        //this.enableScratch();//--------------------------
    },
    showBalls: function (delay) {
        this.game.add.tween(this.bagHolder).to({alpha:1},500,"Linear",true,delay);
    },
    revealAllCell: function () {
        this.tempIndex = 0;
        this.unRevealedCells = [];
        this.allNumbers.forEach(function(element){
            //element.showOX();
            if(!element.isShowed) this.unRevealedCells.push(element);
        },this);

        //this.unRevealedCells = this.shuffleArray(this.unRevealedCells);
        if(this.unRevealedCells.length>0){
            //Phaser.ArrayUtils.shuffle(this.unRevealedCells);
            this.cellTimer = this.game.time.create(false);
            this.cellTimer.add(200, this.revealEachCell, this);
            this.cellTimer.start();
        }

    },

    revealEachCell: function(){
        if(this.tempIndex<this.unRevealedCells.length){
            this.unRevealedCells[this.tempIndex].showOX();
            this.tempIndex++;
            this.cellTimer.add(500, this.revealEachCell, this);
        }else{
            this.cellTimer.stop();
        }

    },

    autoReveal: function () {
        //this.autoRevealSingle();
        //this.autoRevealTimerEvent = this.game.time.events.loop(500, this.autoRevealSingle, this);
        this.revealAllCell();
    },
    autoRevealSingle: function () {
        var tempUnrevealedNumbers = [];
        this.allNumbers.forEach(function(element){
            if(!element.isRevealed){
                tempUnrevealedNumbers.push(element);
            }
        });
        if(tempUnrevealedNumbers.length>0){
            //var rdmN = this.game.rnd.integerInRange(0,tempUnrevealedNumbers.length-1);
            //this.autoRevealSinglePath(tempUnrevealedNumbers[rdmN]);
            this.autoRevealSinglePath(tempUnrevealedNumbers[0]);
        }
    },
    autoRevealSinglePath: function (obj) {
        //this.autoRevealPointer.x = obj.cellX+obj.offX+10;
        //this.autoRevealPointer.y = obj.cellY+obj.offY+22;
        this.autoRevealPointer.x = obj.cellX+55;
        this.autoRevealPointer.y = obj.cellY+32;
        this.isAutoRevealing = true;
        //console.log(this.autoRevealPointer.x,this.autoRevealPointer.y);

        var tween1 = this.game.add.tween(this.autoRevealPointer).to({x:'+46',y:'-0'},100,"Linear",true);
        var tween2 = this.game.add.tween(this.autoRevealPointer).to({x:'-0',y:'65'},100,"Linear");
        var tween3 = this.game.add.tween(this.autoRevealPointer).to({x:'-46',y:'-0'},100,"Linear");
        var tween4 = this.game.add.tween(this.autoRevealPointer).to({x:'-0',y:'-65'},100,"Linear");

        tween1.chain(tween2,tween3,tween4);

        tween4.onComplete.add(function() {
            if(!obj.isRevealed) obj.markAsRevealed();
            //this.isAutoRevealing = false;
        }, this);
    },

    update: function () {
        if(this.isAutoRevealing){
            this.paint(this.autoRevealPointer.x,this.autoRevealPointer.y);
        }
    },

    //setBoard2: function () {
    //    this.gameBoardBlue.alpha = 1;
    //    this.allNumbers.forEach(function(element){
    //        element.cellNumber.alpha =1;
    //    });
    //    this.createSnapshot(this.revealBMDAll,this.revealGroup,false);
    //    this.tempRectArea = new Phaser.Rectangle(this.offX, this.offY,this.gameBoardBlue.width, this.gameBoardBlue.height);
    //    this.revealBMD.copyRect(this.revealBMDAll,this.tempRectArea, 0,0);
    //    this.gameBoardBlue.alpha = 0;
    //    this.numbersHolder.alpha = 0;
    //    this.enableScratch();//+++++++++++++++
    //
    //    //this.revealMaskBMD.processPixelRGB(this.forEachMaskPixel,this);
    //    //this.game.input.onDown.add(this.recolor, this);
    //},

    onInputDown: function(pointer, touch) {
        this.lastPoint = new Phaser.Point(pointer.x-this.offX, pointer.y-this.offY);
    },

    onInputUp: function(pointer, touch) {
        this.lastPoint = null;
    },
    numberRevealed: function (msg,n) {
        //console.log(n);
        //this.revealBMD.circle(0, 0, 200);
        //this.revealBMD.draw("BB_logo",0,0);
        //this.revealBMD.draw(nText,x,y);
        //this.revealBMD.update();
        this.updateBMD();

        this.totalRevealedNumber++;

        this.signal.dispatch(this.CALLER_AREA_NUMBER_SHOWED,n);//>>>>>>>>>>>>>>>>

        if(this.totalRevealedNumber >= this.allNumbers.length){
            console.log("done");
            this.revealFinalBMD.alphaMask(this.revealBMD, this.revealMaskBMD);

            this.isAutoRevealing = false;
            this.game.time.events.remove(this.autoRevealTimerEvent);
            this.signal.dispatch(this.CALLER_AREA_DONE,n);//>>>>>>>>>>>>>>>

        }
    },
    updateBMD: function () {
        this.revealMaskBMD.update();
        this.revealBMD.update();
        this.revealFinalBMD.alphaMask(this.revealBMD, this.revealMaskBMD);
    },

    paint: function (x, y) {
        this.lastPoint = this.lastPoint || new Phaser.Point(x, y);
        //var headPoint = this.headPoint || this.firstPoint;
        this.currentPoint = new Phaser.Point(x, y);

        this.currentDiff = Phaser.Point.subtract(this.currentPoint, this.lastPoint);

        this.revealMaskBMD.update();
        //console.log(x-this.offX, y-this.offY);
        //console.log(x, y);

        this.tempBrushTowardX = this.currentDiff.x>0? this.brushRadius : -this.brushRadius;
        this.tempBrushTowardY = this.currentDiff.y>0? this.brushRadius : -this.brushRadius;
        this.tempQ = Math.abs(this.currentDiff.x)+Math.abs(this.currentDiff.y);
        if(this.tempQ>36) this.tempQ=36;
        this.tempQ = (36-this.tempQ)*(0.98-0.5)/36;

        if(
            this.revealMaskBMD.getPixel(x+this.tempBrushTowardX, y+this.tempBrushTowardY).a==0 &&
            Math.random() > 0.5+this.tempQ &&
            x>0 && x<this.BMDWidth && y>0 && y<this.BMDHeight
        ) {
            //console.log(this.revealMaskBMD.getPixel(x-this.offX, y-this.offY).a);
            //if(!this.scratchEmitter) {
            //    this.activateScratchEmitter(x+this.offX, y+this.offY);
            //}
            //// play particle effect
            //this.updateScratchEmitter(x+this.offX, y+this.offY);

            if(!this.soundScratch.isPlaying){
                this.soundScratch.play("loop");
            }
        }

        var dis = Phaser.Point.distance(this.currentPoint, this.lastPoint);
        //console.log(this.currentPoint,this.lastPoint,dis);
        if(dis>this.brushRadius/2){
            //console.log(this.currentPoint,this.lastPoint,dis);
            var tempNo = Math.floor(dis/(this.brushRadius/2));
            var tempX = (this.currentPoint.x - this.lastPoint.x)/tempNo;
            var tempY = (this.currentPoint.y - this.lastPoint.y)/tempNo;
            for(var i =0;i<tempNo;i++){
                this.revealMaskBMD.circle(tempX*i+this.lastPoint.x, tempY*i+this.lastPoint.y, this.brushRadius);
            }
            // || this.soundScratch.currentTime>50
            if(!this.soundScratch.isPlaying){
                //console.log(this.soundScratch.currentTime);
                this.soundScratch.play("loop");
            }
        }
        //  Change the 4 - the width of the pen, to anything you like
        this.revealMaskBMD.circle(x, y, this.brushRadius,'#000000');

        //this.revealFinalBMD.alphaMask(this.revealBMD, this.revealMaskBMD);
        this.drawRevealBMD();

        //console.log();
        //this.tempNumberObj = this.getNumberObjUnderPointer(this.allNumbers,x-this.numbersHolder.x,y-this.numbersHolder.y);
        this.tempNumberObj = this.getNumberObjUnderPointer(this.allNumbers,x,y);
        if(this.tempNumberObj){
            this.tempNumberObj.checkPercentageRevealed(this.revealMaskBMD);
        }

        this.lastPoint = this.currentPoint;

    },

    drawRevealBMD: function () {
        // if we drop below 40 fps then limit drawing
        if(this.game.time.fps < 40) {
            this.updateIndex = ++this.updateIndex % this.updateModulus;
        }else {
            this.updateIndex = ++this.updateIndex % 3;
        }
        //console.log(this.updateIndex);
        if(this.updateIndex == 0) {
            this.revealFinalBMD.alphaMask(this.revealBMD, this.revealMaskBMD);
        }
    },

    getNumberObjUnderPointer: function (arry,x,y) {
        var thisNumberObj;
        for(var i=0; i < arry.length; i++) {
            thisNumberObj = arry[i];
            //console.log(x,thisNumberObj.cellX,thisNumberObj.cellX + thisNumberObj.cellWidth);
            //console.log(y,thisNumberObj.cellY,thisNumberObj.cellY + thisNumberObj.cellHeight);
            if((x > thisNumberObj.cellX && x < thisNumberObj.cellX + thisNumberObj.cellWidth) &&
                (y > thisNumberObj.cellY && y < thisNumberObj.cellY + thisNumberObj.cellHeight))
            {
                return thisNumberObj;
            }
        }
        return null;

    },
    activateScratchEmitter: function(x, y) {
        this.scratchEmitter = this.game.add.emitter(x, y, 20);
        this.scratchEmitter.makeParticles('BB_dust');
        this.scratchEmitter.setScale(5, 9, 5, 9);
        //this.scratchEmitter.setAlpha(1, 0, 2000, Phaser.Easing.Linear.In);
        //this.scratchEmitter.setSize(0, 0);
        //this.scratchEmitter.setXSpeed(150, 250);
        this.scratchEmitter.gravity = 1000;
        this.scratchEmitter.minRotation = -65;
        this.scratchEmitter.maxRotation = 65;
    },

    updateScratchEmitter: function(x, y) {
        //console.log("currentDiff: " + this.currentDiff);
        var xSpeed = this.currentDiff.x > 0 ? Phaser.Math.linear(200, 250, this.currentDiff.x / 40) : this.currentDiff.x < 0 ? Phaser.Math.linear(-200, -250, this.currentDiff.x / -40) : 0;
        var ySpeed = this.currentDiff.y > 0 ? Phaser.Math.linear(0, 0, this.currentDiff.y / 40) : this.currentDiff.y < 0 ? Phaser.Math.linear(-50, -60, this.currentDiff.y / -40) : 0;
        //console.log("xSpeed: " + xSpeed);
        //console.log("ySpeed: " + ySpeed);
        if(!this.scratchEmitter) return;
        this.scratchEmitter.setXSpeed(xSpeed, xSpeed);
        this.scratchEmitter.setYSpeed(ySpeed, ySpeed);

        // place the emitter in the direction the pointer is heading
        // moving to the right
        if(this.currentDiff.x > 0) {
            this.scratchEmitter.x = x + this.brushRadius;
            // moving to the left
        }else if(this.currentDiff.x < 0) {
            this.scratchEmitter.x = x - this.brushRadius;
            // minimal or no change
        }else {
            this.scratchEmitter.x = x;
            this.scratchEmitter.setXSpeed(-100, 100);
        }
        // moving down
        if(this.currentDiff.y > 0) {
            this.scratchEmitter.y = y + this.brushRadius;
            // moving up
        }else if(this.currentDiff.y < 0) {
            this.scratchEmitter.y = y - this.brushRadius;
            // minimal or no change
        }else {
            this.scratchEmitter.y = y;
            this.scratchEmitter.setYSpeed(-250, 0);
        }

        this.scratchEmitter.explode(1000, 1);
    },

    paintAll: function () {
        this.soundScratch.stop();
        //this.soundMagic.play();

        //var steps = 10;
        //this.game.time.events.repeat(100, steps, function () {
        //    //this.revealMaskBMD.circle(0, 0, 2000,'rgba(0,0,0,'+1/steps+')');
        //    //this.revealMaskBMD.update();
        //    //this.revealFinalBMD.alphaMask(this.revealBMD, this.revealMaskBMD);
        //
        //}, this);
        ////this.game.time.events.add(2000, this.gameEnd, this);
        this.game.time.events.add(1000, this.showBlink, this);

        this.allNumbers.forEach(function(element){
            element.paintAll();
        });
        this.numbersHolder.alpha = 1;

    },
    showBlink: function () {
        this.bagHolder.alpha = 0;
        this.revealFinalImage.alpha = 0;
        //this.numbersHolder.alpha = 1;
        this.allNumbers.forEach(function(element){
            if(element.isMatched||element.isMultiplier){
                element.blink();
            }
        },this);

        //if(this.matchedNumberCount>0){
        //    this.allCellObjects.forEach(function(element){
        //        if(element.isMatched){
        //            element.blink();
        //        }
        //    },this);
        //
        //    var floatingText = Object.create(FloatingText);
        //    //floatingText.showFloatingText(this.game,this.keyDescription,this.prize,126,110,this.cellsHolder);
        //
        //    var self = this;
        //    setTimeout(function() {
        //        floatingText.showFloatingText(self.game,self.keyDescription,self.prize,126,110,self.cellsHolder);
        //    }, 2000);
        //}
    },

    //popQMark: function () {
    //    this.qMark.scale.set(0.3);
    //    this.qMark.alpha = 1;
    //    this.soundBubble.play();
    //    var tweenPopQ1 = this.game.add.tween(this.qMark.scale).to({x:1.5,y:1.5},60,"Linear",true,0);
    //    var tweenPopQ2 = this.game.add.tween(this.qMark.scale).to({x:1,y:1},110,"Linear",false,0);
    //    tweenPopQ1.chain(tweenPopQ2);
    //
    //    this.qMarkTween = this.game.add.tween(this.qMark.scale).to({x:1.1,y:1.1},300,"Linear",false,0,-1,true);
    //    tweenPopQ2.chain(this.qMarkTween);
    //},

    enableScratch: function () {
        //this.game.input.addMoveCallback(this.paintInput, this);
        //this.game.input.onDown.add(this.onInputDown, this);
        //this.game.input.onUp.add(this.onInputUp, this);

        this.allNumbers.forEach(function(element){
            element.enableClick();
        });
    },
    disableScratch: function () {
        //this.game.input.deleteMoveCallback(this.paintInput, this);
        //this.game.input.onDown.remove(this.onInputDown, this);
        //this.game.input.onUp.remove(this.onInputUp, this);

        this.allNumbers.forEach(function(element){
            element.disableClick();
        });
    },
    paintInput: function (pointer, x, y) {
        if (pointer.isDown) {
            this.paint(x-this.offX,y-this.offY);
        }
    },


    // draws group to main BitmapData and hides the group
    createSnapshot: function(bmd, group, hideGroup) {
        this.game.stage.updateTransform();
        bmd.drawGroup(group);

        if(hideGroup) {
            group.visible = false;
        }
    }

};

module.exports = YourNumberArea;
