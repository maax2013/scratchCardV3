var RoundedRectangle = require('./customObjects/roundedRectangle');

var MatchNumber = {
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
    cellBorder:null,
    cellBox:null,
    cellGlow:null,
    //cellPCH:null,
    cellX:null,
    cellY:null,
    offX:null,
    offY:null,
    cellWidth:67,
    cellHeight:72,
    cellNo:null,
    cellNumber:null,
    //isPCH:false,
    isMatched:false,

    tempPixelsData:null,
    cellRectArea:null,
    RectPaddingX:15,//~~~~~~~~~~~
    RectPaddingY:28,//~~~~~~~~~~~
    tempShowedPixels:null,
    totalPixels:null,
    isRevealed:false,
    revealBMD:null,

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
        //this.cellBox.beginFill(0xd0eaeb,1);
        //this.cellBox.drawRect(15, 5, this.cellWidth, this.cellHeight);

        this.cellBox = new RoundedRectangle(this.game, 2, 8, this.cellWidth, this.cellHeight, 12, 'rgba(208,234,235,1)', false, null);
        this.cellGroup.addChild(this.cellBox);
        //this.cellBox.alpha = 0;

        //this.cellBorder = this.cellGroup.addChild(this.game.add.graphics());
        //this.cellBorder.lineStyle(1, 0x000000,1);
        //this.cellBorder.drawRect(0, 0, w, h);

        this.cellBorder = new RoundedRectangle(this.game, 2, 8, this.cellWidth, this.cellHeight, 12, false,'rgba(255,255,255,1)', 3);
        this.cellGroup.addChild(this.cellBorder);
        //this.cellBorder.alpha = 0;

        //
        //this.cellGlow = this.cellGroup.addChild(this.game.make.sprite(0,0,'BB_cardGlow'));
        //this.cellGlow.anchor.set(0.5);
        //this.cellGlow.alpha = 0;
        //this.cellGlow.scale.set(0.1);

        ////this.cellNumber = this.game.add.text(w/2, h/2,"00",{fontSize:60,font:'Open Sans',fill:'#000000',align:'center'},this.cellGroup);
        //this.cellNumber = this.cellGroup.addChild(this.game.add.text(this.cellWidth/2+2, this.cellHeight/2+6));
        //this.cellNumber.fontSize = 30;
        //this.cellNumber.fill = '#239323';
        //this.cellNumber.font = 'Orbitron';
        //this.cellNumber.align = 'center';
        ////this.cellNumber.lineSpacing = -8;
        //this.cellNumber.text = " ";
        //this.cellNumber.anchor.set(0.5,0.5);
        ////this.cellNumber.alpha = 0;

        this.cellNumber = this.game.add.bitmapText(this.cellWidth/2+3,this.cellHeight/2, 'pressStartG','',28);
        //this.cellGroup.addChild(this.cellNumber);

        //this.cellNumber.anchor.set(0.5,0.45);
        this.cellNumber.anchor.set(0.5,0.3);
        this.cellNumber.alpha = 0;

        //this.cellX = this.cellGroup.worldPosition.x;
        //this.cellY = this.cellGroup.worldPosition.y;
        //console.log(this.cellGroup.x,this.cellGroup.worldPosition);

        //this.revealBMD = game.make.bitmapData(this.cellWidth, this.cellHeight);
        //this.cellRectArea = new Phaser.Rectangle(this.offX+this.cellX+this.RectPaddingX, this.offY+this.cellY+this.RectPaddingY,this.cellWidth-this.RectPaddingX*2, this.cellHeight-this.RectPaddingY*2);
        this.cellRectArea = new Phaser.Rectangle(this.cellX, this.cellY,this.cellWidth, this.cellHeight+9);//+++++++++++++++++
        //this.cellRectArea = new Phaser.Rectangle(0, 0,30, 30);

        //this.tempRectArea = new Phaser.Rectangle(this.cellGroup.worldPosition.x, this.cellGroup.worldPosition.y,this.cellWidth, this.cellHeight);
        //console.log(this.tempRectArea.x,this.tempRectArea.y);
        //this.totalPixels = this.cellRectArea.width*this.cellRectArea.height;

        this.cellGroup.alpha = 0;

        //========================scratch animation=========================
        //this.imageHolder = parent.create(this.cellX,this.cellY);
        this.imageHolderFinal = showGroup.create(this.cellX,this.cellY);
        this.showGroup = showGroup;
        //showGroup.addChild(this.thisScratchImg);

        this.cellButton = this.game.add.graphics();
        this.cellButton.beginFill(0x000);
        this.cellButton.drawRect(0, 0, this.cellWidth, this.cellHeight+9);
        this.cellButton.x = x;
        this.cellButton.y = y;
        this.cellButton.alpha = 0;
        //this.imageHolder.addChild(this.cellButton);
        this.showGroup.addChild(this.cellButton);

        this.soundScratch1 = this.game.add.audio('audio_chalkS1');
        this.soundScratch2 = this.game.add.audio('audio_chalkS2');

        this.maskBMD = game.make.bitmapData(this.cellWidth, this.cellHeight+9);
        this.revealBMD = game.make.bitmapData(this.cellWidth, this.cellHeight+9);
        this.finalBMD = game.make.bitmapData(this.cellWidth, this.cellHeight+9);
        this.imageHolderFinal.addChild(game.add.image(0, 0, this.finalBMD));
        //this.revealBMD.circle(0, 0, 1000);
        //var testImg = this.imageHolderFinal.addChild(game.add.image(0, 0, this.revealBMD));
        //testImg.alpha = 0.5;
    },
    markMatch: function () {
        this.isMatched = true;
        //this.markAsRevealed();
    },

    setNumber: function (bmd, n) {
        //if(n===13){
        //    this.isPCH = true;
        //    this.cellBox.alpha = 1;
        //    this.cellPCH = this.cellGroup.addChild(this.game.make.sprite(0,0,'BB_cardPCH'));
        //    this.cellPCH.anchor.set(0.5);
        //
        //}else{
        //    this.cellNumber.text = String("0" + n).slice(-2);
        //    this.cellNumber.alpha = 1;
        //}

        //this.revealBMD = bmd;

        //this.game.stage.updateTransform();
        //this.cellGroup.alpha = 1;
        this.cellNo = n;
        this.cellNumber.setText(String("0" + n).slice(-2));
        //console.log(this.cellNumber.text);
        this.cellNumber.alpha = 1;
        this.cellNumber.updateText();

        this.revealBMD.copyRect(bmd,this.cellRectArea, 0,0);//+++++++++++++++
        this.revealBMD.update();
        //this.revealBMD = bmd;//------------
        //var testImg = this.imageHolderFinal.addChild(this.game.add.image(8, 8, this.revealBMD));
        //testImg.alpha = 0.5;

        this.revealBMD.draw(this.cellBox,0,5);
        this.revealBMD.draw(this.cellBorder,0,5);
        //this.revealBMD.draw(this.cellNumber,this.cellWidth/2,this.cellHeight/2+5);
        this.game.stage.updateTransform();
        this.revealBMD.drawFull(this.cellNumber);
        this.cellNumber.alpha = 0;

        //this.revealBMD.drawGroup(this.cellGroup);

        //this.tempPixelsData = this.game.make.bitmapData(this.cellRectArea.width, this.cellRectArea.height);
        //this.tempPixelsData.circle(0, 0, 1000,'#00ff00');
        ////this.tempPixelsData.copyRect(maskBMD,this.tempRectArea, 0,0);
        ////console.log(this.tempPixelsData);
        //var revealFinalImage = this.cellGroup.addChild(this.game.add.image(this.RectPaddingX+2, this.RectPaddingY+6, this.tempPixelsData));
        //revealFinalImage.alpha = 0.5;
    },
    checkPercentageRevealed: function (maskBMD) {
        if(!this.isRevealed){


            this.tempPixelsData = maskBMD.getPixels(this.cellRectArea).data;

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
                //this.isRevealed = true;
                ////console.log(this.cellNo,this.tempShowedPixels/this.totalPixels);
                //
                ////this.cellNumber.addColor('#ff0000');
                ////this.cellNumber.setStyle({fill:'#ff0000'});
                //this.cellNumber.fill = '#000000';
                //
                //this.cellNumber.stroke = '#bbddff';
                //this.cellNumber.strokeThickness = 6;
                //
                ////this.cellNumber.setText("WW");
                //this.cellNumber.updateText();
                //
                ////var self = this;
                ////setTimeout(function() {
                ////    self.signal.dispatch(self.CALLER_NUMBER_SHOWED,self.cellNo,self.cellNumber);
                ////}, 1000);
                //
                //this.signal.dispatch(this.CALLER_NUMBER_SHOWED,this.cellNo,this.cellNumber,this.cellWidth/2+this.cellX+this.offX,this.cellHeight/2+this.cellY+this.offY);

                this.markAsRevealed();
            }
            //console.log(this.tempPixelsData.length);
            //console.log(this.totalPixels);
            //console.log(this.cellNo,this.tempShowedPixels/this.totalPixels);
            //console.log(this.cellNo,this.tempRectArea.x, this.tempRectArea.y);
            //console.log(this.cellNo,this.cellGroup.worldPosition.x, this.cellGroup.worldPosition.y);
        }

    },
    markAsRevealed: function () {
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
        //this.revealBMD.draw(this.cellNumber,this.cellWidth/2,this.cellHeight/2+5);
        this.game.stage.updateTransform();
        this.revealBMD.drawFull(this.cellNumber);
        this.cellNumber.alpha = 0;
        this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);

        //this.signal.dispatch(this.CALLER_NUMBER_SHOWED,this.cellNo,this.cellNumber,this.cellWidth/2+this.cellX+this.offX,this.cellHeight/2+this.cellY+this.offY);//+++++++++
        this.signal.dispatch(this.CALLER_NUMBER_SHOWED,this.cellNo);//+++++++++
    },
    markMatched: function (bmd) {
        if(this.isMatched){
            //this.cellNumber.fill = '#000000';
            //this.cellNumber.stroke = '#ffffff';
            //this.cellNumber.strokeThickness = 6;

            this.cellNumber.alpha = 1;
            this.cellNumber.font = 'pressStartBB';
            this.cellNumber.x -= 3;
            this.cellNumber.y -= 3;
        }
        this.cellNumber.updateText();

        //this.revealBMD.draw(this.cellNumber,this.cellWidth/2,this.cellHeight/2+5);
        this.game.stage.updateTransform();
        this.revealBMD.drawFull(this.cellNumber);
        this.cellNumber.alpha = 0;
        this.revealBMD.update();
        this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);
        //this.revealBMD.update();
    },

    //popUp: function () {
    //    this.cellGlow.alpha = 0.1;
    //    var fadeTween = this.game.add.tween(this.cellGlow).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true,0);
    //    var scaleTween = this.game.add.tween(this.cellGlow.scale).to( { x:1,y:1}, 200, Phaser.Easing.Linear.None, true,0);
    //
    //    var scaleTweenText = this.game.add.tween(this.cellNumber.scale).to( { x:1.6,y:1.6}, 300, Phaser.Easing.Back.Out, true,50,0,true);
    //
    //    var fadeTween1 = this.game.add.tween(this.cellBox).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true,200);
    //    var scaleTween1 = this.game.add.tween(this.cellBox.scale).to( { x:1.2,y:1.2}, 100, Phaser.Easing.Back.Out, true,300,0,true);
    //
    //},

    //create: function (game,cx,cy,p) {
    //    this.cellX = cx;
    //    this.cellY = cy;
    //
    //    //this.imageHolder = game.add.group();
    //    //p.add(this.imageHolder);
    //
    //    //this.qMark = this.imageHolder.create(0,0,'TTG_QMark');
    //    //this.qMark.anchor.set(0.5);
    //    //this.oImage = this.imageHolder.create(0,0,'TTG_O',5);
    //    //this.oImage.anchor.set(0.5);
    //    //this.xImage = this.imageHolder.create(0,0,'TTG_X',5);
    //    //this.xImage.anchor.set(0.5);
    //
    //
    //    this.game = game;
    //    this.imageHolder = p.create(this.cellX,this.cellY);
    //    this.imageHolderReveal = game.add.group();
    //    //this.imageHolderReveal.x= -208/2;
    //    //this.imageHolderReveal.y= -208/2;
    //    //p.add(this.imageHolderReveal);
    //
    //    this.imageHolderFinal = p.create(this.cellX,this.cellY);
    //    this.qMark = this.imageHolder.addChild(this.game.make.sprite(0,0,'TTG_QMark'));
    //    this.qMark.anchor.set(0.5);
    //    //this.oImage = this.imageHolder.addChild(this.game.make.sprite(0,0,'TTG_O',5));
    //    //this.oImage.anchor.set(0.5);
    //    //this.xImage = this.imageHolder.addChild(this.game.make.sprite(0,0,'TTG_X',5));
    //    //this.xImage.anchor.set(0.5);
    //    this.revealBG = this.imageHolderReveal.addChild(this.game.make.sprite(208/2,208/2,'TTG_reveal_BG'));
    //    this.revealBG.anchor.set(0.5);
    //    this.oImage = this.imageHolderReveal.addChild(this.game.make.sprite(104,104,'TTG_O',5));
    //    this.oImage.anchor.set(0.5);
    //    this.xImage = this.imageHolderReveal.addChild(this.game.make.sprite(104,104,'TTG_X',5));
    //    this.xImage.anchor.set(0.5);
    //    //this.oImage = this.game.make.sprite(0,0,'TTG_O',5);
    //    //this.oImage.anchor.set(0.5);
    //    //this.xImage = this.game.make.sprite(0,0,'TTG_X',5);
    //    //this.xImage.anchor.set(0.5);
    //    this.scratchImg1 = this.imageHolder.addChild(this.game.make.sprite(-10000,0,'TTG_scratch1',0));
    //    this.scratchImg1.anchor.set(0.5);
    //    this.scratchImg1.angle = game.rnd.integerInRange(-30,30);
    //    this.scratchImg2 = this.imageHolder.addChild(this.game.make.sprite(-10000,0,'TTG_scratch2',0));
    //    this.scratchImg2.anchor.set(0.5);
    //    this.scratchImg2.angle = game.rnd.integerInRange(-30,30);
    //    this.scratchImg3 = this.imageHolder.addChild(this.game.make.sprite(-10000,0,'TTG_scratch3',0));
    //    this.scratchImg3.anchor.set(0.5);
    //    this.scratchImg3.angle = game.rnd.integerInRange(-30,30);
    //
    //    this.soundChalkO = this.game.add.audio('audio_chalkO');
    //    this.soundChalkX = this.game.add.audio('audio_chalkX');
    //    this.soundBubble = this.game.add.audio('audio_bubble');
    //    this.soundScratch1 = this.game.add.audio('audio_chalkS1');
    //    this.soundScratch2 = this.game.add.audio('audio_chalkS2');
    //
    //    //this.imageHolder = game.add.group();
    //    //this.imageHolder.addChild(this.oImage);
    //    //this.imageHolder.addChild(this.xImage);
    //    //this.imageHolder.addChild(this.qMark);
    //    this.imageHolder.x= this.cellX;
    //    this.imageHolder.y=this.cellY;
    //    this.imageHolderFinal.x= this.cellX;
    //    this.imageHolderFinal.y=this.cellY;
    //    //p.add(this.imageHolder);
    //
    //    this.qMark.alpha = 0;
    //    this.revealBG.alpha = 0;
    //    this.oImage.alpha = 0;
    //    this.xImage.alpha = 0;
    //
    //    this.maskBMD = game.make.bitmapData(208, 208);
    //    this.revealBMD = game.make.bitmapData(208, 208);
    //    this.finalBMD = game.make.bitmapData(208, 208);
    //    this.imageHolderFinal.addChild(game.add.image(-208/2, -208/2, this.finalBMD));
    //
    //    //this.maskBMD.draw(this.scratchImg1,208/2,208/2);
    //    //this.createSnapshot(this.revealBMD,this.imageHolderReveal,true);
    //    //this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);
    //},
    //
    //
    //markMatch: function () {
    //    this.isMatched = true;
    //},
    //
    //fill: function (string) {
    //    this.xoText = string;
    //},
    ////tempFill: function (string) {
    ////    this.xoText = string;
    ////    this.isTemporary = true;
    ////},
    ////clearTempFill: function (string) {
    ////    if(this.isTemporary){
    ////        this.xoText = string;
    ////        this.isTemporary = false;
    ////    }
    ////},
    ////confirmTempFill: function () {
    ////    this.isTemporary = false;
    ////},
    //
    //swapXOText: function () {
    //    if(this.xoText === "x"){
    //        this.xoText = "o";
    //    }else if(this.xoText === "o"){
    //        this.xoText = "x";
    //    }
    //},
    //reset: function () {
    //    this.xoText = null;
    //    this.row = null;
    //    this.column = null;
    //    this.isTemporary = false;
    //    this.isMatched = false;
    //},
    //
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
        this.maskBMD = this.game.make.bitmapData(this.cellWidth, this.cellHeight+10);
        this.maskBMD.draw(this.thisScratchImg,this.cellWidth/2,this.cellHeight/2+5);
        //this.maskBMD.circle(0, 0, 1000);
        //this.maskBMD.update();
        this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);
        //this.finalBMD.update();
    },
    paintAll: function () {
        //this.imageHolderFinal.alpha = 0.5;
        //this.cellGroup.alpha = 1;
        this.maskBMD.circle(0, 0, 200);
        this.finalBMD.alphaMask(this.revealBMD, this.maskBMD);
    },
    //
    //activateScratchEmitter: function(x, y) {
    //    this.scratchEmitter = this.game.add.emitter(x, y, 20);
    //    this.scratchEmitter.makeParticles('TTG_dust');
    //    this.scratchEmitter.setScale(5, 9, 5, 9);
    //    //this.scratchEmitter.setAlpha(1, 0, 2000, Phaser.Easing.Linear.In);
    //    //this.scratchEmitter.setSize(0, 0);
    //    this.scratchEmitter.width = 200;
    //    this.scratchEmitter.height = 200;
    //    this.scratchEmitter.setXSpeed(-200, 200);
    //    this.scratchEmitter.setYSpeed(0,500);
    //    this.scratchEmitter.gravity = 2000;
    //    this.scratchEmitter.minRotation = -65;
    //    this.scratchEmitter.maxRotation = 65;
    //    this.scratchEmitter.start(false,1000,20);
    //},

    // draws group to main BitmapData and hides the group
    createSnapshot: function(bmd, group, hideGroup) {
        this.game.stage.updateTransform();
        bmd.drawGroup(group);

        if(hideGroup) {
            group.visible = false;
        }
    }

};

module.exports = MatchNumber;
