/**
* Base class for all reveals
*/
function RevealUnit(game, parentGroup,showGroup,isInYourNoZone) {

	Phaser.Group.call(this, game, parentGroup);

	this.game = game;
	this.parentGroup = parentGroup;
	this.showGroup = showGroup;
	this.isInYourNoZone = isInYourNoZone;
	this.isRevealed = false;
	this.onRevealed = new Phaser.Signal();
	// this.number = data.number;

	this.revealThreshold = 0.95;//~~~~~~~~~~~~~~~~~
	this.isMatched = false;

};

RevealUnit.prototype = Object.create(Phaser.Group.prototype);
RevealUnit.prototype.constructor = RevealUnit;

RevealUnit.prototype.clone = function(parentGroup) {
	return new this.constructor(this.game, this.parent, this.showGroup);
};

RevealUnit.prototype.showNumber = function(n, fontSize, x, y, boundaryRect,numberTextRect){
	// console.log(n);

	if(n>0){
	    this.unitNo = n;

	    var textString = String("0" + n).slice(-2);
	    // console.log(textString);
	    this.unitNumber = this.game.add.bitmapText(x,y, 'pressStartG',textString,fontSize);
	    this.unitNumber.anchor.set(0.5);
	    this.parentGroup.addChild(this.unitNumber);
	}
	this.boundaryRect = boundaryRect;
	this.numberTextRect = numberTextRect;
};
RevealUnit.prototype.copyBMD = function(wholeImg){
	this.brushRadius = 20;//~~~~~~~~~~~~~~~~
	this.updateIndex = 0, // incrementing index to use with modulus for skipping frames
	this.updateModulus = 2, // draw every two frames
	this.revealMaskBMD = this.game.make.bitmapData(this.boundaryRect.width, this.boundaryRect.height);
	this.revealFinalBMD = this.game.make.bitmapData(this.boundaryRect.width, this.boundaryRect.height);
	this.revealBMD = this.game.make.bitmapData(this.boundaryRect.width, this.boundaryRect.height);
	this.revealBMD.copyRect(wholeImg, this.boundaryRect, 0, 0);
	this.revealFinalImage = this.showGroup.addChild(this.game.add.image(this.boundaryRect.x, this.boundaryRect.y, this.revealFinalBMD));
	// this.revealFinalImage.alpha = 0.5;
	this.hideUnit();
};

RevealUnit.prototype.flagMatched = function(){
	this.isMatched = true;
};

RevealUnit.prototype.hideUnit = function(){
	this.parentGroup.alpha = 0;
};

RevealUnit.prototype.isWithinBoundary = function(x,y){
	return this.checkWithinRect(x,y,this.boundaryRect);
};
RevealUnit.prototype.isWithinNumberText = function(x,y){
	return this.checkWithinRect(x,y,this.numberTextRect);
};
RevealUnit.prototype.checkWithinRect = function(x,y,rect){
	if((x > rect.x && x < rect.x + rect.width) && (y > rect.y && y < rect.y + rect.height))
	{
	    return true;
	}
	return false;
};

RevealUnit.prototype.paintBMD = function(x,y){
	// console.log("paintBMD");
	this.revealMaskBMD.circle(x-this.boundaryRect.x, y-this.boundaryRect.y, this.brushRadius,'#000000');
	// this.revealFinalBMD.alphaMask(this.revealBMD, this.revealMaskBMD);
	this.applyMask();

	if(this.isWithinNumberText(x,y)){
		if(this.getPercentageRevealed(this.revealMaskBMD)>this.revealThreshold){
			this.showAsRevealed();
		}
	}

},
RevealUnit.prototype.applyMask = function () {
    // if we drop below 40 fps then limit drawing
    if(this.game.time.fps < 40) {
    	// console.log("slow");

    	this.updateIndex = ++this.updateIndex % this.updateModulus;
    	if(this.updateIndex == 0) {
    		this.revealFinalBMD.alphaMask(this.revealBMD, this.revealMaskBMD);
    	}
    }else {
    	this.updateIndex = 0;
    	this.revealFinalBMD.alphaMask(this.revealBMD, this.revealMaskBMD);
    }
},
RevealUnit.prototype.getPercentageRevealed = function (maskBMD) {

    if(!this.isRevealed){

        this.totalPixels = this.numberTextRect.width*this.numberTextRect.height;
        this.numberTextRect.x -= this.boundaryRect.x;
        this.numberTextRect.y -= this.boundaryRect.y;
        this.tempPixelsData = maskBMD.getPixels(this.numberTextRect).data;//+++++++++++
        //this.tempPixelsData.copyRect(maskBMD,this.numberTextRect, 0,0);
        this.numberTextRect.x += this.boundaryRect.x;
        this.numberTextRect.y += this.boundaryRect.y;

        this.tempShowedPixels = 0;
        for(var i=3; i < this.tempPixelsData.length; i+=4) {
            if(this.tempPixelsData[i] > 0) {
                this.tempShowedPixels++;
            }
        }
        return this.tempShowedPixels/this.totalPixels;

    }else{
    	return 1;
    }

};


RevealUnit.prototype.showAsRevealed = function(){
	this.isRevealed = true;

	if(this.unitNo>0){
		this.unitNumber.font = 'pressStartB';
		this.unitNumber.updateText();
	}
	this.unitGroup.alpha = 1;
	this.showGroup.addChild(this.unitGroup);
	this.clearBMDs();

	// this.signal.dispatch(this.CALLER_NUMBER_SHOWED,this.cellNo);
	this.onRevealed.dispatch(this,this.unitNo, this.isInYourNoZone);
};
RevealUnit.prototype.hasRevealed = function(){
	return this.isRevealed;
};
RevealUnit.prototype.clearBMDs = function(){
	// console.log("clear bmds");

	this.showGroup.remove(this.revealFinalImage);
	this.revealFinalImage = null;
	this.revealBMD = null;
	this.revealMaskBMD = null;
	this.revealFinalBMD = null;
},

RevealUnit.prototype.showAsMatched = function(){
	if(this.isMatched){
	    this.unitNumber.font = 'pressStartBB';
	    this.unitNumber.x -= 3;
	    this.unitNumber.y -= 3;
	    this.unitNumber.updateText();

	}
};


module.exports = RevealUnit;
