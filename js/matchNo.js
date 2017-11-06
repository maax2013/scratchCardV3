var RevealUnit = require('./revealUnit');
var RoundedRectangle = require('./customObjects/roundedRectangle');

function MatchNo(game, parentGroup, showGroup,x,y,width,height) {

	this.unitGroup = game.add.group();
	this.unitGroup.x = x;
	this.unitGroup.y = y;
	parentGroup.add(this.unitGroup);

	this.unitBox = new RoundedRectangle(game, 0, 6, width, height-10, 12, 'rgba(208,234,235,1)', 'rgba(255,255,255,1)', 3);
	this.unitGroup.addChild(this.unitBox);

	RevealUnit.call(this, game, this.unitGroup, showGroup, false);

	this.unitNumberTextX = width/2+2;
	this.unitNumberTextY = height/2;
	var offset = 8;
	this.rectToCheck = new Phaser.Rectangle(x+offset, y+offset+12,width-offset*2, height-offset*2-50);
	this.boundaryRect = new Phaser.Rectangle(x, y+6,width, height-10);
	// var graphics = game.add.graphics(0, 0);
	// graphics.lineStyle(1, 0x0000FF, 1);
	// // graphics.drawRect(x+offset, y+offset+18,width-offset*2, height-offset*2-40);
	// graphics.drawRect(x, y+8,width, height-12);

	this.unitGroup.alpha = 0;

	Phaser.Group.prototype.update.call(this);
}

MatchNo.prototype = Object.create(RevealUnit.prototype);
MatchNo.prototype.constructor = MatchNo;

MatchNo.prototype.setNumber = function(n){
	if(n>0){
	    this.showNumber(n, 28, this.unitNumberTextX, this.unitNumberTextY);
	}
	this.unitGroup.alpha = 1;
};


module.exports = MatchNo;
