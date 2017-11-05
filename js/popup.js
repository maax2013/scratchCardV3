var SharedConfig = require('./sharedConfig');
var RoundedRectangle = require('./customObjects/roundedRectangle');


var Popup = {
	TYPE_QUIT: 'TYPE_QUIT',
	//TYPE_CONTINUE: 'TYPE_CONTINUE',
	//TYPE_WELCOME: 'TYPE_WELCOME',
	TYPE_ERROR: 'TYPE_ERROR',
	
	PLAY: 'PLAY',
	QUIT: 'QUIT',
	CANCEL: 'CANCEL',

	game: null,
	holder: null,
	blocker: null,
	whiteBackground: null,

	signal: null,

	soundButton: null,

	buttonPlayHolder: null,
	buttonPlay: null,
	buttonPlayText: null,

	buttonPlaySpinner:null,
	spinnerTween:null,

	buttonYesHolder: null,
	buttonYes: null,
	buttonYesText: null,

	buttonNoHolder: null,
	buttonNo: null,
	buttonNoText: null,

	buttonContinueHolder: null,
	buttonContinue: null,
	buttonContinueText: null,

	textTitle: null,
	textBody: null,

	isSetup: false,
	type: null,
	offsetX: 64,



	init: function (game, type, userName) {
		// console.log('<< Popup.init >> type:: ' + type);

		if (!this.isSetup) {
			var texttexttitle;
			var texttextbody;

			this.isSetup = true;

			this.type = type;

			this.signal = new Phaser.Signal();

			this.game = game;

			this.soundButton = this.game.add.audio('button');

			this.holder = this.game.add.group();
			// this.holder.alpha = 0;
			
			var width = SharedConfig.popup.desktop.width;
			var height = SharedConfig.popup.desktop.height;
			var gameCenterX = this.game.world.centerX;
			var gameCenterY = this.game.world.centerY+50;
            //
			//this.blocker = this.game.add.graphics();
			//this.blocker.beginFill(0x000);
			//this.blocker.drawRect(0, 0, this.game.width, this.game.height);
			//this.blocker.alpha = 0.65;
			//this.holder.add(this.blocker);
            //
			//this.whiteBackground = new RoundedRectangle(this.game, gameCenterX, gameCenterY, width, height, 20, 'rgba(255,255,255,1)', null, null);
			//this.whiteBackground.anchor.set(0.5);
			//this.holder.add(this.whiteBackground);


			switch(this.type) {
				case this.TYPE_WELCOME:

					this.whiteBackground = this.holder.create(gameCenterX, gameCenterY, 'sfl_htp');
					//this.keyTable = this.add.image();
					this.whiteBackground.anchor.set(0.5);
					
					this.buttonPlayHolder = this.game.add.group();
					this.buttonPlayHolder.x = gameCenterX;
					this.buttonPlayHolder.y = gameCenterY + 230;
					this.holder.add(this.buttonPlayHolder);
					
					this.buttonPlay = this.holder.create(0, 0, 'sfl_playNow');
					//this.buttonPlay.scale.set(0.5);
					this.buttonPlay.anchor.set(0.5);
					this.buttonPlayHolder.add(this.buttonPlay);

					this.buttonPlaySpinner = this.holder.create(-20, 0, 'waitSpinner');
					//this.buttonPlaySpinner.scale.set(0.5);
					this.buttonPlaySpinner.anchor.set(0.5);
					this.buttonPlayHolder.add(this.buttonPlaySpinner);
					this.buttonPlaySpinner.alpha = 0;

					//this.textTitle = this.game.add.text(gameCenterX, gameCenterY - 120);
					this.textTitle = this.game.add.bitmapText(gameCenterX, gameCenterY-100, 'openSansB','',20);
					this.textTitle.anchor.set(0.5);
					//this.textTitle.fontWeight = 'normal';
					//this.textTitle.fill = '#ffffff';
					//this.textTitle.font = 'Open Sans';
					this.textTitle.align = 'center';
					//this.textTitle.lineSpacing = -8;

					//console.log(userName.length);
					//userName = "MMMMMMMMMMMMMMM";
					//userName = "MMMMMMMMMM";
					if (userName.length > 10){
						this.textTitle.fontSize = 38;
						//this.textTitle.text = 'Welcome\n'+ userName + '!';
						this.textTitle.text = 'Welcome,\n'+ this.truncateString(userName,15) + '!';
						this.textTitle.y = gameCenterY - 115;
					}else{
						this.textTitle.fontSize = 38;
						texttexttitle = 'Welcome, '+ userName + '!';
						this.textTitle.text = texttexttitle;
					}
					this.holder.add(this.textTitle);

					this.textBody = this.game.add.bitmapText(gameCenterX, gameCenterY-38, 'openSans','',20);
					this.textBody.anchor.set(0.5);
					//this.textBody.fontSize = 22;
					//this.textBody.lineSpacing = -5;
					//this.textBody.font = 'Open Sans';
					//this.textBody.fontWeight = 'normal';
					this.textBody.maxWidth = 600;
					texttextbody = 'Tap the symbols to reveal hidden amounts.  Match any of "Your Numbers" to the "Match Numbers" To Win Cash or Bank Tokens!';
					this.textBody.text = texttextbody;
					this.textBody.align = 'center';
					this.holder.add(this.textBody);

					//this.buttonPlayText = this.game.add.text(-25, 0);
					//this.buttonPlayText.anchor.set(0.5);
					//this.buttonPlayText.font = 'Open Sans';
					//this.buttonPlayText.text = 'Play Now!';
					//this.buttonPlayText.align = 'center';
					//this.buttonPlayText.fill = 'white';
					//this.buttonPlayHolder.add(this.buttonPlayText);

					this.buttonPlay.events.onInputDown.add(this.playClickHandler, this);

					this.show = this.showEase;
				break;

				case this.TYPE_ERROR:

					texttexttitle = 'Oops!';
					texttextbody = "We're experiencing a technical \nproblem, please try again later.";

					this.blocker = this.game.add.graphics();
					this.blocker.beginFill(0x000);
					this.blocker.drawRect(0, 0, this.game.width, this.game.height);
					this.blocker.alpha = 0.65;
					this.holder.add(this.blocker);

					this.errorBackground = new RoundedRectangle(this.game, gameCenterX, gameCenterY, width, height, 20, 'rgba(50,50,50,1)', 'rgba(255,255,255,1)', 2);

					this.errorBackground.anchor.set(0.5);
					this.holder.add(this.errorBackground);

					//this.textTitle = this.game.add.text(gameCenterX, gameCenterY - 70);
					//this.textTitle.anchor.set(0.5);
					//this.textTitle.fontSize = 34;
					//this.textTitle.font = 'Open Sans';
					//this.textTitle.align = 'center';
					//this.textTitle.lineSpacing = -8;
					//this.textTitle.text = texttexttitle;
					//this.holder.add(this.textTitle);
                    //
					//this.textBody = this.game.add.text(gameCenterX, gameCenterY);
					//this.textBody.anchor.set(0.5);
					//this.textBody.fontSize = 22;
					//this.textBody.lineSpacing = -5;
					//this.textBody.font = 'Open Sans';
					//this.textBody.fontWeight = 'normal';
					//this.textBody.text = texttextbody;
					//this.textBody.align = 'center';
					//this.holder.add(this.textBody);

					this.textTitle = this.game.add.bitmapText(gameCenterX, gameCenterY - 70, 'openSansB','',34);
					this.textTitle.anchor.set(0.5);
					//this.textTitle.fontSize = 34;
					//this.textTitle.font = 'Open Sans';
					this.textTitle.align = 'center';
					//this.textTitle.lineSpacing = -8;
					this.textTitle.text = texttexttitle;
					this.holder.add(this.textTitle);

					this.textBody = this.game.add.bitmapText(gameCenterX, gameCenterY, 'openSans','',22);
					this.textBody.anchor.set(0.5);
					//this.textBody.fontSize = 22;
					//this.textBody.lineSpacing = -5;
					//this.textBody.font = 'Open Sans';
					//this.textBody.fontWeight = 'normal';
					this.textBody.text = texttextbody;
					this.textBody.align = 'center';
					this.holder.add(this.textBody);

					this.show = this.showEase;
					break;

				//case this.TYPE_QUIT:
				//	texttexttitle = 'Quit game';
				//	texttextbody = 'Are you sure?';
				//
				//	this.buttonYesHolder = this.game.add.group();
				//	this.buttonYesHolder.x = gameCenterX - this.offsetX;
				//	this.buttonYesHolder.y = gameCenterY + 70;
				//	this.holder.add(this.buttonYesHolder);
                //
				//	this.buttonYes = this.holder.create(0, 0, 'genericButtons', 'btn-bg-small.png');
				//	this.buttonYes.scale.set(0.5);
				//	this.buttonYes.anchor.set(0.5);
				//	this.buttonYesHolder.add(this.buttonYes);
                //
				//	this.buttonYesText = this.game.add.text(0, 0);
				//	this.buttonYesText.anchor.set(0.5);
				//	this.buttonYesText.font = 'Open Sans';
				//	this.buttonYesText.text = 'Yes';
				//	this.buttonYesText.align = 'center';
				//	this.buttonYesText.fill = 'white';
				//	this.buttonYesHolder.add(this.buttonYesText);
                //
				//	this.buttonYes.events.onInputDown.add(this.yesClickHandler, this);
                //
                //
				//	this.buttonNoHolder = this.game.add.group();
				//	this.buttonNoHolder.x = gameCenterX + this.offsetX;
				//	this.buttonNoHolder.y = gameCenterY + 70;
				//	this.holder.add(this.buttonNoHolder);
                //
				//	this.buttonNo = this.holder.create(0, 0, 'genericButtons', 'btn-bg-small.png');
				//	this.buttonNo.scale.set(0.5);
				//	this.buttonNo.anchor.set(0.5);
				//	this.buttonNoHolder.add(this.buttonNo);
                //
				//	this.buttonNoText = this.game.add.text(0, 0);
				//	this.buttonNoText.anchor.set(0.5);
				//	this.buttonNoText.font = 'Open Sans';
				//	this.buttonNoText.text = 'No';
				//	this.buttonNoText.align = 'center';
				//	this.buttonNoText.fill = 'white';
				//	this.buttonNoHolder.add(this.buttonNoText);
                //
				//	this.buttonNo.events.onInputDown.add(this.noClickHandler, this);
                //
				//	this.show = this.showEase;
				//break;
                //
				//case this.TYPE_CONTINUE:
				//	texttexttitle = 'Game Paused';
				//	texttextbody = 'Click to unpause game';
				//
				//	this.buttonContinueHolder = this.game.add.group();
				//	this.buttonContinueHolder.x = gameCenterX;
				//	this.buttonContinueHolder.y = gameCenterY + 200;
				//	this.holder.add(this.buttonContinueHolder);
                //
				//	this.buttonContinue = this.holder.create(0, 0, 'genericButtons', 'btn-bg-small.png');
				//	this.buttonContinue.scale.set(0.5);
				//	this.buttonContinue.anchor.set(0.5);
				//	this.buttonContinueHolder.add(this.buttonContinue);
                //
				//	this.buttonContinueText = this.game.add.text(0, 0);
				//	this.buttonContinueText.anchor.set(0.5);
				//	this.buttonContinueText.font = 'Open Sans';
				//	this.buttonContinueText.text = 'Ok';
				//	this.buttonContinueText.align = 'center';
				//	this.buttonContinueText.fill = 'white';
				//	this.buttonContinueHolder.add(this.buttonContinueText);
                //
				//	this.show = this.showNow;
				//break;
			}

			//this.textTitle = this.game.add.text(gameCenterX, gameCenterY - 150);
			//this.textTitle.anchor.set(0.5);
			//this.textTitle.fontSize = 60;
			//this.textTitle.fill = '#ffffff';
			//this.textTitle.font = 'Open Sans';
			//this.textTitle.align = 'center';
			//this.textTitle.lineSpacing = -8;
			//this.textTitle.text = texttexttitle;
			//this.holder.add(this.textTitle);

			//this.textBody = this.game.add.text(gameCenterX, gameCenterY);
			//this.textBody.anchor.set(0.5);
			//this.textBody.fontSize = 22;
			//this.textBody.lineSpacing = -5;
			//this.textBody.font = 'Open Sans';
			//this.textBody.fontWeight = 'normal';
			//this.textBody.text = texttextbody;
			//this.textBody.align = 'center';
			//this.holder.add(this.textBody);
		}
	},
	truncateString: function (str, num) {
		if (num > str.length){
			return str;
		} else{
			str = str.substring(0,num);
			return str+"...";
		}

	},

	enable: function() {
		switch (this.type) {
			case this.TYPE_WELCOME:
				this.buttonPlay.inputEnabled = true;
				this.buttonPlay.input.useHandCursor = true;
			break;
			case this.TYPE_QUIT:
				this.buttonYes.inputEnabled = true;
				this.buttonYes.input.useHandCursor = true;
				this.buttonNo.inputEnabled = true;
				this.buttonNo.input.useHandCursor = true;
			break;
		}
	},
	disable: function() {
		this.game.canvas.style.cursor = "default";
		switch (this.type) {
			case this.TYPE_WELCOME:
				this.buttonPlay.input.useHandCursor = false;
				this.buttonPlay.inputEnabled = false;
			break;
			case this.TYPE_QUIT:
				this.buttonYes.inputEnabled = false;
				this.buttonYes.input.useHandCursor = false;
				this.buttonNo.inputEnabled = false;
				this.buttonNo.input.useHandCursor = false;
			break;
		}
	},

	show: null,
	showNow: function() {
		this.enable();
		this.holder.alpha = 1;
	},
	showEase: function() {
		this.enable();
		this.game.add.tween(this.holder).to( { alpha: 1 }, 500, Phaser.Easing.Quartic.Out, true);
	},
	hide: function() {
		this.disable();
		if(this.spinnerTween) this.game.tweens.remove(this.spinnerTween);
		this.game.add.tween(this.holder).to( { alpha: 0 }, 500, Phaser.Easing.Quartic.Out, true);
	},

	//yesClickHandler: function () {
	//	this.soundButton.play();
	//	this.hide();
	//	this.signal.dispatch(this.QUIT);
	//},
	//noClickHandler: function () {
	//	this.soundButton.play();
	//	this.hide();
	//	this.signal.dispatch(this.CANCEL);
	//},
	playClickHandler: function () {
		this.soundButton.play();
		this.showSpinner();
		this.signal.dispatch(this.PLAY);
	},
	showSpinner: function () {
		this.buttonPlay.alpha = 0;
		this.buttonPlaySpinner.alpha = 1;
		this.spinnerTween = this.game.add.tween(this.buttonPlaySpinner).to({angle:'+360'},1000,"Linear",true,0,-1);
		//this.game.time.events.add(5000, this.hide, this);
	}
};

module.exports = Popup;

