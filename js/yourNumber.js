var RoundedRectangle = require('./customObjects/roundedRectangle');

var YourNumber = {
    CALLER_NUMBER_SHOWED: 'CALLER_NUMBER_SHOWED',

    game:null,
    //imageHolder:null,
    //imageHolderReveal:null,
    //imageHolderFinal:null,
    //revealBG:null,
    //qMark:null,
    //oImage:null,
    //xImage:null,
    //scratchImg1:null,
    //scratchImg2:null,
    //scratchImg3:null,
    //thisScratchImg:null,
    //soundChalkO: null,
    //soundChalkX: null,
    //soundBubble: null,
    //soundScratch1: null,
    //soundScratch2: null,
    //
    //xoText: null,
    //row: null,
    //column: null,
    //isTemporary: false,
    ////isMatched: false,
    //isShowed:false,
    //qMarkTween:null,
    //
    //
    //maskBMD:null,
    //finalBMD:null,
    //revealBMD:null,
    //
    //scratchEmitter:null,

    cellGroup:null,
    cellBG:null,
    cellTop:null,
    cellTopColored:null,
    cellTopColoredBMD:null,
    cellBorder:null,
    cellBox:null,
    cellGlow:null,
    //cellPCH:null,
    cellX:null,
    cellY:null,
    offX:null,
    offY:null,
    cellWidth:80,
    cellHeight:96,
    cellNo:null,
    cellNumber:null,
    //isPCH:false,
    isMatched:false,
    isMultiplier:false,
    prizeValue:null,
    isCashPrize:false,

    tempPixelsData:null,
    cellRectArea:null,
    RectPaddingX:20,//~~~~~~~~~~~
    RectPaddingY:35,//~~~~~~~~~~~
    tempShowedPixels:null,
    totalPixels:null,
    isRevealed:false,
    revealBMD:null,

    isV3Path:true,

    signal: new Phaser.Signal(),

    init: function (game, x, y, parent,w,h,offx,offy, showGroup){
        this.game = game;
        this.cellX = x;
        this.cellY = y;
        //this.offX = offx + parent.x;
        //this.offY = offy + parent.y;
        this.offX = parent.x;
        this.offY = parent.y;
        //this.cellWidth = w;
        //this.cellHeight = h;

        this.cellGroup = game.add.group();
        this.cellGroup.x = x;
        this.cellGroup.y = y;
        parent.add(this.cellGroup);

        //this.cellBox = this.cellGroup.addChild(this.game.add.graphics());
        //this.cellBox.beginFill(0xffffff,1);
        //this.cellBox.drawRect(10, 0, this.cellWidth+10, this.cellHeight+10);
        //this.cellBox = new RoundedRectangle(this.game, 10, 0, this.cellWidth+10, this.cellHeight+10, 20, 'rgba(200,0,0,1)', false, null);
        this.cellBox = new RoundedRectangle(this.game, 8, -2, this.cellWidth+14, this.cellHeight+14, 12, 'rgba(63,101,103,1)', false, null);
        this.cellGroup.addChild(this.cellBox);
        this.cellBox.alpha = 0;
        //this.cellBorder = this.cellGroup.addChild(this.game.add.graphics());
        //this.cellBorder.lineStyle(1, 0x000000,1);
        //this.cellBorder.drawRect(0, 0, w, h);
        //this.cellBorder = new RoundedRectangle(this.game, 15, 5, this.cellWidth, this.cellHeight, 20, false,'rgba(255,255,255,1)', 3);
        //this.cellGroup.addChild(this.cellBorder);
        //this.cellBorder.alpha = 0;
        //
        //this.cellGlow = this.cellGroup.addChild(this.game.make.sprite(0,0,'BB_cardGlow'));
        //this.cellGlow.anchor.set(0.5);
        //this.cellGlow.alpha = 0;
        //this.cellGlow.scale.set(0.1);
        //this.cellBG = this.cellGroup.addChild(this.game.make.sprite(15,5,'IWEImage',game.rnd.integerInRange(0,9)));
        //
        //this.cellTop = this.cellGroup.addChild(this.game.make.sprite(15,5,'IWEImage',game.rnd.integerInRange(10,39)));
        //
        ////this.cellNumber = this.game.add.text(w/2, h/2,"00",{fontSize:60,font:'Open Sans',fill:'#000000',align:'center'},this.cellGroup);
        //this.cellNumber = this.cellGroup.addChild(this.game.add.text(this.cellWidth/2+15, this.cellHeight/2+5));
        //this.cellNumber.fontSize = 50;
        //this.cellNumber.fill = '#239323';
        //this.cellNumber.font = 'Orbitron';
        //this.cellNumber.align = 'center';
        ////this.cellNumber.lineSpacing = -8;
        //this.cellNumber.text = "88";
        //this.cellNumber.anchor.set(0.5,0.75);
        ////this.cellNumber.alpha = 0;

        this.cellNumber = this.game.add.bitmapText(this.cellWidth/2+8,this.cellHeight/2-10, 'pressStartG','',32);
        //this.cellGroup.addChild(this.cellNumber);

        //this.cellNumber.anchor.set(0.5,0.45);
        this.cellNumber.anchor.set(0.5);
        this.cellNumber.alpha = 0;

        //this.cellX = this.cellGroup.worldPosition.x;
        //this.cellY = this.cellGroup.worldPosition.y;
        //console.log(this.cellGroup.x,this.cellGroup.worldPosition);

        //this.revealBMD = game.make.bitmapData(this.cellWidth, this.cellHeight);
        //this.cellRectArea = new Phaser.Rectangle(this.offX+this.cellX+this.RectPaddingX+15, this.offY+this.cellY+this.RectPaddingY-15,this.cellWidth-this.RectPaddingX*2, this.cellHeight-this.RectPaddingY*2);
        this.cellRectArea = new Phaser.Rectangle(this.cellX+10, this.cellY+2,this.cellWidth+10, this.cellHeight+8);
        //this.tempRectArea = new Phaser.Rectangle(this.cellGroup.worldPosition.x, this.cellGroup.worldPosition.y,this.cellWidth, this.cellHeight);
        //console.log(this.tempRectArea.x,this.tempRectArea.y);
        //this.totalPixels = this.cellRectArea.width*this.cellRectArea.height;

        //========================scratch animation=========================
        //this.imageHolder = parent.create(this.cellX,this.cellY);
        this.imageHolderFinal = showGroup.create(this.cellX,this.cellY);
        this.showGroup = showGroup;
        //showGroup.addChild(this.thisScratchImg);

        this.cellButton = this.game.add.graphics();
        this.cellButton.beginFill(0x000);
        this.cellButton.drawRect(10, 0, this.cellWidth+10, this.cellHeight+8);
        this.cellButton.x = x;
        this.cellButton.y = y;
        this.cellButton.alpha = 0;
        //this.imageHolder.addChild(this.cellButton);
        this.showGroup.addChild(this.cellButton);

        this.soundScratch1 = this.game.add.audio('audio_chalkS1');
        this.soundScratch2 = this.game.add.audio('audio_chalkS2');

        this.maskBMD = game.make.bitmapData(this.cellWidth+10, this.cellHeight+8);
        this.revealBMD = game.make.bitmapData(this.cellWidth+10, this.cellHeight+8);
        this.finalBMD = game.make.bitmapData(this.cellWidth+10, this.cellHeight+8);
        this.fImage = this.imageHolderFinal.addChild(game.add.image(10, 2, this.finalBMD));
        //this.revealBMD.circle(0, 0, 1000);
        //this.imageHolderFinal.addChild(game.add.image(10, 0, this.revealBMD));
    },
    markMatch: function () {
        this.isMatched = true;
        //this.markAsRevealed();//---------
    },

    setNumberV3: function (bmd, n, prize, totalFrames) {
        //this.revealBMD = bmd;

        //this.game.stage.updateTransform();

        this.cellBG = this.cellGroup.addChild(this.game.make.sprite(15-4,5-4,'revealBG',this.game.rnd.integerInRange(0,9)));
        this.cellBG.scale.set(1.29,1.33);

        if(prize && n>0){
            this.prizeValue = prize[0];
            this.isCashPrize = prize[1];
            this.cellTop = this.cellGroup.addChild(prize[2]);
            //if(this.isCashPrize){
            //    this.cellTopColored = this.cellGroup.addChild(this.game.make.sprite(15,5,'IWEImage',39));
            //    this.cellTopColored.scale.set(0.7);
            //    this.cellTopColored.alpha = 0;
            //}
        }else{
            if(n<0){
                this.isMultiplier = true;
                this.cellTop = this.cellGroup.addChild(prize);
            }else{
                this.cellTop = this.cellGroup.addChild(this.game.make.sprite(15,5,'prizes',this.game.rnd.integerInRange(0,totalFrames-1)));
            }

        }
        this.cellTop.tint = 0x239323;
        //this.cellTop.scale.set(0.7);
        //this.cellTopColoredBMD = this.game.make.bitmapData(120, 116);
        //
        ////var tempBMD = this.game.make.bitmapData(120, 116);
        ////tempBMD.load('IWEImage');
        ////var tempRect = new Phaser.Rectangle(241, 117,120, 116);
        ////this.cellTopColoredBMD.copyRect(tempBMD,tempRect, 0,0);
        ////this.cellTopColoredBMD.draw(this.cellTop,0,0);
        ////this.cellTopColoredBMD.drawGroup(this.cellTop);
        ////this.createSnapshot(this.revealBMDAll,this.revealGroup,false);
        ////this.cellTopColoredBMD.processPixelRGB(this.forEachMaskPixel,this);
        ////this.game.stage.updateTransform();
        //this.cellTopColored = this.cellGroup.addChild(this.game.add.image(15, 5, this.cellTopColoredBMD));
        //this.cellTop.alpha = 0;

        ////this.cellNumber = this.game.add.text(w/2, h/2,"00",{fontSize:60,font:'Open Sans',fill:'#000000',align:'center'},this.cellGroup);
        ////this.cellNumber = this.cellGroup.addChild(this.game.add.text(w/2, h/2));
        //this.cellGroup.bringToTop(this.cellNumber);
        //this.cellNumber.fontSize = 30;
        //this.cellNumber.fill = '#239323';
        //this.cellNumber.font = 'Orbitron';
        //this.cellNumber.align = 'center';
        ////this.cellNumber.lineSpacing = -8;
        //this.cellNumber.text = "88";
        //this.cellNumber.anchor.set(0.5,0.75);
        ////this.cellNumber.alpha = 0;


        if(n>0){
            this.cellNo = n;
            this.cellNumber.setText(String("0" + n).slice(-2));
            //console.log(this.cellNumber.text);
            this.cellNumber.alpha = 1;
            this.cellNumber.updateText();
        }

        //this.tempPixelsData = this.game.make.bitmapData(this.cellRectArea.width, this.cellRectArea.height);
        //this.tempPixelsData.circle(0, 0, 1000,'#00ff00');
        ////this.tempPixelsData.copyRect(maskBMD,this.tempRectArea, 0,0);
        ////console.log(this.tempPixelsData);
        //var revealFinalImage = this.cellGroup.addChild(this.game.add.image(this.RectPaddingX+15, this.RectPaddingY-15, this.tempPixelsData));
        //revealFinalImage.alpha = 0.5;

        this.revealBMD.copyRect(bmd,this.cellRectArea, 0,0);
        this.revealBMD.draw(this.cellBG,5,4);
        this.revealBMD.draw(this.cellTop,5,4);
        //this.revealBMD.draw(this.cellNumber,this.cellWidth/2+5,this.cellHeight/2+4);
        this.game.stage.updateTransform();
        this.revealBMD.drawFull(this.cellNumber);
        this.cellNumber.alpha = 0;
    },


    setNumber: function (bmd, n, prize) {
        //this.revealBMD = bmd;

        //this.game.stage.updateTransform();

        if(this.isV3Path){
            this.cellBG = this.cellGroup.addChild(this.game.make.sprite(15,5,'revealBG',this.game.rnd.integerInRange(0,9)));
        }else{

        }


        this.cellBG = this.cellGroup.addChild(this.game.make.sprite(15,5,'IWEImage',this.game.rnd.integerInRange(0,9)));
        this.cellBG.scale.set(0.7);

        if(prize){
            this.prizeValue = prize[0];
            this.isCashPrize = prize[1];
            this.cellTop = this.cellGroup.addChild(prize[2]);
            if(this.isCashPrize){
                this.cellTopColored = this.cellGroup.addChild(this.game.make.sprite(15,5,'IWEImage',39));
                this.cellTopColored.scale.set(0.7);
                this.cellTopColored.alpha = 0;
            }
        }else{
            this.cellTop = this.cellGroup.addChild(this.game.make.sprite(15,5,'IWEImage',this.game.rnd.integerInRange(10,38)));
        }
        this.cellTop.scale.set(0.7);
        //this.cellTopColoredBMD = this.game.make.bitmapData(120, 116);
        //
        ////var tempBMD = this.game.make.bitmapData(120, 116);
        ////tempBMD.load('IWEImage');
        ////var tempRect = new Phaser.Rectangle(241, 117,120, 116);
        ////this.cellTopColoredBMD.copyRect(tempBMD,tempRect, 0,0);
        ////this.cellTopColoredBMD.draw(this.cellTop,0,0);
        ////this.cellTopColoredBMD.drawGroup(this.cellTop);
        ////this.createSnapshot(this.revealBMDAll,this.revealGroup,false);
        ////this.cellTopColoredBMD.processPixelRGB(this.forEachMaskPixel,this);
        ////this.game.stage.updateTransform();
        //this.cellTopColored = this.cellGroup.addChild(this.game.add.image(15, 5, this.cellTopColoredBMD));
        //this.cellTop.alpha = 0;

        ////this.cellNumber = this.game.add.text(w/2, h/2,"00",{fontSize:60,font:'Open Sans',fill:'#000000',align:'center'},this.cellGroup);
        ////this.cellNumber = this.cellGroup.addChild(this.game.add.text(w/2, h/2));
        //this.cellGroup.bringToTop(this.cellNumber);
        //this.cellNumber.fontSize = 30;
        //this.cellNumber.fill = '#239323';
        //this.cellNumber.font = 'Orbitron';
        //this.cellNumber.align = 'center';
        ////this.cellNumber.lineSpacing = -8;
        //this.cellNumber.text = "88";
        //this.cellNumber.anchor.set(0.5,0.75);
        ////this.cellNumber.alpha = 0;

        this.cellNo = n;
        this.cellNumber.setText(String("0" + n).slice(-2));
        //console.log(this.cellNumber.text);
        this.cellNumber.alpha = 1;
        this.cellNumber.updateText();

        //this.tempPixelsData = this.game.make.bitmapData(this.cellRectArea.width, this.cellRectArea.height);
        //this.tempPixelsData.circle(0, 0, 1000,'#00ff00');
        ////this.tempPixelsData.copyRect(maskBMD,this.tempRectArea, 0,0);
        ////console.log(this.tempPixelsData);
        //var revealFinalImage = this.cellGroup.addChild(this.game.add.image(this.RectPaddingX+15, this.RectPaddingY-15, this.tempPixelsData));
        //revealFinalImage.alpha = 0.5;

        this.revealBMD.copyRect(bmd,this.cellRectArea, 0,0);
        this.revealBMD.draw(this.cellBG,5,4);
        this.revealBMD.draw(this.cellTop,5,4);
        //this.revealBMD.draw(this.cellNumber,this.cellWidth/2+5,this.cellHeight/2+4);
        this.game.stage.updateTransform();
        this.revealBMD.drawFull(this.cellNumber);
        this.cellNumber.alpha = 0;
    },
    forEachMaskPixel: function (pixel) {
        //console.log(pixel.a);
        //if(pixel.a == 0){
        //    pixel.r = 255;
        //    pixel.g = 0;
        //    pixel.b = 0;
        //    pixel.a = 255;
        //}else{
        //    pixel.r = 0;
        //    pixel.g = 0;
        //    pixel.b = 0;
        //    pixel.a = 0;
        //}
        //pixel.b = 255-pixel.b;

        var a = pixel.a;
        pixel.r = 0;
        pixel.g = 0;
        pixel.b = 0;
        pixel.a = a;

        ////  The incoming pixel values
        //var r = pixel.r;
        //var g = pixel.g;
        //var b = pixel.b;
        //
        ////  And let's mix them up a bit
        //pixel.r = b;
        //pixel.g = g;
        //pixel.b = r;


        return pixel;
    },

    checkPercentageRevealed: function (maskBMD) {

        if(!this.isRevealed){
            //console.log("!");

            this.tempPixelsData = maskBMD.getPixels(this.cellRectArea).data;//+++++++++++
            //this.tempPixelsData.copyRect(maskBMD,this.cellRectArea, 0,0);

            this.tempShowedPixels = 0;
            for(var i=3; i < this.tempPixelsData.length; i+=4) {
                if(this.tempPixelsData[i] > 0) {
                    this.tempShowedPixels++;
                }else {
                    // area that hasnt been drawn
                    //if(zeroAlphaIndices !== undefined)
                    //    zeroAlphaIndices.push(i);
                }
            }
            if(this.tempShowedPixels/this.totalPixels>0.95){
                this.markAsRevealed();
            }
            //console.log(this.tempPixelsData.length);
            //console.log(this.totalPixels);
            //console.log(this.cellNo,this.tempShowedPixels/this.totalPixels);
            //console.log(this.cellNo,this.tempRectArea.x, this.tempRectArea.y);
            //console.log(this.cellNo,this.cellGroup.worldPosition.x, this.cellGroup.worldPosition.y);
        }

    },

    enableClick: function () {
        this.cellButton.inputEnabled = true;
        this.cellButton.input.useHandCursor = true;
        this.cellButton.events.onInputDown.add(this.showOX,this);
    },
    disableClick: function () {
        this.cellButton.inputEnabled = false;
        this.cellButton.input.useHandCursor = false;
        this.cellButton.events.onInputDown.remove(this.showOX,this);
    },
    showOX: function () {
        this.disableClick();
        //this.qMarkTween.stop();
        //this.qMark.alpha = 0;
        //
        //if(this.xoText === "x"){
        //    this.xImage.alpha = 1;
        //}else if(this.xoText === "o"){
        //    this.oImage.alpha = 1;
        //}
        //
        //this.revealBG.alpha = 1;
        //this.createSnapshot(this.revealBMD,this.imageHolderReveal,true);
        //
        //this.activateScratchEmitter(this.imageHolder.worldPosition.x,this.imageHolder.worldPosition.y);

        var rmdN = this.game.rnd.integerInRange(1,3);
        //rmdN = 3;
        switch (rmdN){
            case 1:
                this.soundScratch2.play();
                this.thisScratchImg = this.showGroup.addChild(this.game.make.sprite(-10000,0,'TTG_scratch1',0));
                var scratchAni = this.thisScratchImg.animations.add('scratchAni');
                scratchAni.enableUpdate = true;
                scratchAni.onUpdate.add(this.scratchAniUpdate, this);
                scratchAni.onComplete.add(function () {
                    this.markAsRevealed();
                },this);
                this.thisScratchImg.animations.play('scratchAni',10,false);

                break;

            case 2:
                this.soundScratch1.play();
                this.thisScratchImg = this.showGroup.addChild(this.game.make.sprite(-10000,0,'TTG_scratch2',0));
                var scratchAni = this.thisScratchImg.animations.add('scratchAni');
                scratchAni.enableUpdate = true;
                scratchAni.onUpdate.add(this.scratchAniUpdate, this);
                scratchAni.onComplete.add(function () {
                    this.markAsRevealed();
                },this);
                this.thisScratchImg.animations.play('scratchAni',40,false);

                break;

            case 3:
                this.soundScratch1.play();
                this.thisScratchImg = this.showGroup.addChild(this.game.make.sprite(-10000,0,'TTG_scratch3',0));
                var scratchAni = this.thisScratchImg.animations.add('scratchAni');
                scratchAni.enableUpdate = true;
                scratchAni.onUpdate.add(this.scratchAniUpdate, this);
                scratchAni.onComplete.add(function () {
                    this.markAsRevealed();
                },this);
                this.thisScratchImg.animations.play('scratchAni',30,false);

                break;
        }
        this.thisScratchImg.anchor.set(0.5);
        this.thisScratchImg.angle = this.game.rnd.integerInRange(-30,30);

        this.isShowed = true;
        //this.signal.dispatch(this.XO_SHOWED);
    },
    scratchAniUpdate: function (anim, frame) {
        //console.log(anim, frame);
        this.maskBMD = this.game.make.bitmapData(this.cellWidth+10, this.cellHeight+8);
        this.maskBMD.draw(this.thisScratchImg,this.cellWidth/2+5,this.cellHeight/2+4);
        //this.maskBMD.circle(0, 0, 1000);
        //this.maskBMD.update();
        this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);
        //this.finalBMD.update();
    },
    markAsRevealed: function (bmd) {
        this.isRevealed = true;
        //console.log(this.cellNo,this.tempShowedPixels/this.totalPixels);

        //this.cellNumber.addColor('#ff0000');
        //this.cellNumber.setStyle({fill:'#ff0000'});
        this.cellNumber.alpha = 1;
        this.cellNumber.font = 'pressStartB';

        //if(this.isMatched){
        //    this.cellNumber.fill = '#000000';
        //    this.cellNumber.stroke = '#ffffff';
        //    this.cellNumber.strokeThickness = 6;
        //}

        //this.cellNumber.setText("WW");
        this.cellNumber.updateText();

        //var self = this;
        //setTimeout(function() {
        //    self.signal.dispatch(self.CALLER_NUMBER_SHOWED,self.cellNo,self.cellNumber);
        //}, 1000);

        //this.signal.dispatch(this.CALLER_NUMBER_SHOWED,this.cellNo,this.cellNumber,this.cellWidth/2+this.cellX+this.offX,this.cellHeight/2+this.cellY+this.offY);//++++++++
        //this.revealBMD.draw(this.cellNumber,this.cellWidth/2+5,this.cellHeight/2+4);
        this.game.stage.updateTransform();
        this.revealBMD.drawFull(this.cellNumber);
        this.cellNumber.alpha = 0;
        this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);
        //this.revealBMD.update();
        //this.signal.dispatch(this.CALLER_NUMBER_SHOWED,this.cellNo,this.cellNumber,this.cellNumber.x+this.cellX,this.cellNumber.y+this.cellY);//++++++++
        this.signal.dispatch(this.CALLER_NUMBER_SHOWED,this.cellNo);//++++++++
    },
    markMatched: function () {
        if(this.isMatched){
            //this.cellNumber.fill = '#000000';
            //this.cellNumber.stroke = '#ffffff';
            //this.cellNumber.strokeThickness = 6;

            this.cellNumber.alpha = 1;
            this.cellNumber.font = 'pressStartBB';
            this.cellNumber.x -= 3;
            this.cellNumber.y -= 3;

            if(this.isCashPrize){
                this.cellTop.alpha = 0;
                this.cellTopColored.alpha = 1;
                //this.revealBMD.draw(this.cellTopColored,this.cellX+15,this.cellY+5);
            }
        }
        this.cellNumber.updateText();

        //this.revealBMD.draw(this.cellNumber,this.cellWidth/2+5,this.cellHeight/2+4);
        this.game.stage.updateTransform();
        this.revealBMD.drawFull(this.cellNumber);
        this.cellNumber.alpha = 0;
        this.revealBMD.update();
        this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);

    },
    paintAll: function () {
        //this.imageHolderFinal.alpha = 0;
        this.fImage.alpha = 0;

        this.cellNumber.alpha = 1;
        this.game.stage.updateTransform();
        this.revealBMD.clear();
        this.revealBMD.drawFull(this.cellNumber);
        this.cellNumber.alpha = 0;
        //this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);

        this.fImage = this.imageHolderFinal.addChild(this.game.add.image(10, 2, this.revealBMD));

        //this.cellGroup.addChild(this.cellNumber);
        this.cellGroup.alpha = 1;
        //this.maskBMD.circle(0, 0, 200);
        //this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);
    },

    blink: function () {
        //console.log("blink");
        //this.cellBox.alpha =1;//--------------------
        var blinkTween = this.game.add.tween(this.cellBox).to( { alpha: 0.9 }, 200, Phaser.Easing.Linear.None, true, 0, 3, true);
        blinkTween.onComplete.add(function() {
            //this.cellBox = new RoundedRectangle(this.game, 10, 0, this.cellWidth+10, this.cellHeight+10, 20, 'rgba(0,0,255,1)', false, null);
            this.cellBox.alpha = 1;
        }, this);
    }

};

module.exports = YourNumber;
