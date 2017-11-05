var RevealUnit = require('./revealUnit');
var RoundedRectangle = require('./customObjects/roundedRectangle');

function YourNo(game, parentGroup, showGroup,x,y,width,height) {

	this.unitGroup = game.add.group();
	this.unitGroup.x = x;
	this.unitGroup.y = y;
	parentGroup.add(this.unitGroup);

	this.unitBox = new RoundedRectangle(game, -8, -7.5, width+16, height+16, 12, 'rgba(63,101,103,1)', false, null);
	this.unitGroup.addChild(this.unitBox);
	this.unitBox.alpha = 0;

	this.unitBG = this.unitGroup.addChild(game.make.sprite(-3,-1,'revealBG',game.rnd.integerInRange(0,9)));
	this.unitBG.scale.set(1.29,1.33);
	// this.unitBG.alpha = 0;//----------
	this.unitTop = this.unitGroup.addChild(game.add.group());


	RevealUnit.call(this, game, this.unitGroup, showGroup, true);

	var offset = 8;
	this.rectToCheck = new Phaser.Rectangle(x+offset, y+offset+12,width-offset*2, height-offset*2-50);
	this.boundaryRect = new Phaser.Rectangle(x-2, y-2,width+3, height+3);
	// var graphics = game.add.graphics(0, 0);
	// graphics.lineStyle(1, 0x0000FF, 1);
	// // graphics.drawRect(x+offset, y+offset+12,width-offset*2, height-offset*2-50);
	// graphics.drawRect(x-2, y-2,width+3, height+3);

	this.unitGroup.alpha = 0;

	Phaser.Group.prototype.update.call(this);
}

YourNo.prototype = Object.create(RevealUnit.prototype);
YourNo.prototype.constructor = YourNo;

YourNo.prototype.setNumberV3 = function(bmd, n, prize, totalFrames, unitNoX, unitNoY){
	if(prize && n>0){
	    this.prizeValue = prize[0];
	    this.isCashPrize = prize[1];
	    this.cellTop = this.unitTop.addChild(prize[2]);
	}else{
	    if(n<0){
	        this.isMultiplier = true;
	        this.cellTop = this.unitTop.addChild(prize);
	    }else{
	        this.cellTop = this.unitTop.addChild(this.game.make.sprite(0,0,'prizes',this.game.rnd.integerInRange(0,totalFrames-1)));
	    }
	}
	this.cellTop.tint = 0x239323;

	this.showNumber(n, 32, unitNoX, unitNoY, this.boundaryRect,this.rectToCheck);
	this.unitGroup.alpha = 1;
};
YourNo.prototype.blink = function () {
    //console.log("blink");
    //this.cellBox.alpha =1;//--------------------
    var blinkTween = this.game.add.tween(this.unitBox).to( { alpha: 0.9 }, 200, Phaser.Easing.Linear.None, true, 0, 3, true);
    blinkTween.onComplete.add(function() {
        //this.cellBox = new RoundedRectangle(this.game, 10, 0, this.cellWidth+10, this.cellHeight+10, 20, 'rgba(0,0,255,1)', false, null);
        this.unitBox.alpha = 1;
    }, this);
};


// YourNo.prototype.matchBorderKey = 'largeMatchBorder';
// YourNo.prototype.sparkleSoundKey = 'whoosh-sparkle';

module.exports = YourNo;
