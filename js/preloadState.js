var SharedConfig = require('./sharedConfig');


var PreloadState = {
	// console.log('<< PreloadState.constructor >>');

	COMPLETE: 'COMPLETE',

	game:null,
	gameInfo: null,
	baseUrl:null,
	signal: new Phaser.Signal(),

	wasFontLoaded:false,
    wasGameLoaded:false,

	isV3Path:true,

	//initialize
	initialize: function(game, gameInfo, baseUrl) {
		// console.log('<< PreloadState.initialize >>');
		this.game = game;
		this.gameInfo = gameInfo;
		this.baseUrl = baseUrl;
	},

	preload: function () {
		//console.log('<< PreloadState.preload >>');
		
		this.load.crossOrigin = 'anonymus';

		//var self = this;
		//WebFontConfig = {
		//	//  'active' means all requested fonts have finished loading
		//	//  We set a 1 second delay before calling 'createText'.
		//	//  For some reason if we don't the browser cannot render the text the first time it's created.
		//	active: function() { self.game.time.events.add(2000, self.fontLoaded, self); },
		//	//active: function() {
		//	//	//this.fontLoaded();
		//	//	//console.log("this= "+thisGame);
		//	//	console.log(thisGame);
		//	//},
        //
		//	//  The Google Fonts we want to load (specify as many as you like in the array)
		//	google: {
		//		families: ['Open+Sans:400,700:latin','Orbitron:500']
		//	}
		//};
		////  Load the Google WebFont Loader script
		//this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js');

		//this.load.bitmapFont('fat-and-tiny',this.baseUrl+'assets/fonts/fat-and-tiny.png',this.baseUrl+'assets/fonts/fat-and-tiny.xml');
		//this.load.bitmapFont('openSansStroke',this.baseUrl+'assets/fonts/openSans_stroke.png',this.baseUrl+'assets/fonts/openSans_stroke.fnt');
		this.load.bitmapFont('robotoBCStroke',this.baseUrl+'assets/fonts/robotoBC_stroke.png',this.baseUrl+'assets/fonts/robotoBC_stroke.fnt');
		this.load.bitmapFont('robotoC',this.baseUrl+'assets/fonts/robotoC.png',this.baseUrl+'assets/fonts/robotoC.fnt');
		this.load.bitmapFont('openSans',this.baseUrl+'assets/fonts/openSans.png',this.baseUrl+'assets/fonts/openSans.fnt');
		this.load.bitmapFont('openSansB',this.baseUrl+'assets/fonts/openSansB.png',this.baseUrl+'assets/fonts/openSansB.fnt');
		this.load.bitmapFont('pressStartG',this.baseUrl+'assets/fonts/pressStartG.png',this.baseUrl+'assets/fonts/pressStartG.fnt');
		this.load.bitmapFont('pressStartB',this.baseUrl+'assets/fonts/pressStartB.png',this.baseUrl+'assets/fonts/pressStartB.fnt');
		this.load.bitmapFont('pressStartBB',this.baseUrl+'assets/fonts/pressStartBB.png',this.baseUrl+'assets/fonts/pressStartBB.fnt');
		//this.load.bitmapFont('openSansNB',this.baseUrl+'assets/fonts/openSansNB.png',this.baseUrl+'assets/fonts/openSansNB.fnt');

		if (this.gameInfo.preloadInfo.images) {
			this.gameInfo.preloadInfo.images.forEach((function(element) {
				//// check for images from game data
				//if(this.gameInfo.gameData) {
				//	for(var key in this.gameInfo.gameData.images) {
				//		if(key == element.name) {
				//			element.src = this.gameInfo.gameData.images[key];
				//		}
				//	}
				//}
				if(element.src === ''){
					for(var key in this.gameInfo.gameData.images) {
						if(key == element.name) {
							element.src = this.gameInfo.gameData.images[key];
						}
					}
				}else{
					element.src = this.baseUrl+element.src;
				}
				// load images
				this.load.image(element.name, element.src);
			}), this);
		}

		//this.gameInfo.preloadInfo.images.forEach((function(element) {
		//	this.load.image(element.name, this.baseUrl+element.src);
		//}), this);

		this.gameInfo.preloadInfo.spritesheets.forEach((function(element) {
			this.load.spritesheet(element.name, this.baseUrl+element.src, element.width, element.height, element.frames);
		}), this);

		this.gameInfo.preloadInfo.audio.forEach((function(element) {
			this.load.audio(element.name, this.baseUrl+element.src);
		}), this);

		this.gameInfo.preloadInfo.json.forEach((function(element) {
			this.load.atlasJSONHash(element.name, element.src, element.map);
		}), this);


		//SharedConfig.audio.forEach((function(element) {
		//	this.load.audio(element.name, element.src);
		//}), this);

		SharedConfig.json.forEach((function(element) {
			this.load.atlasJSONHash(element.name, element.src, element.map);
		}), this);

	},

	create: function () {
		// console.log('<< PreloadState.create >>');
		this.signal.dispatch(this.COMPLETE);
		//this.wasGameLoaded = true;
		////console.log('game loaded!');
		//this.allLoaded();
	},

	fontLoaded: function () {
		//this.game.time.events.add(Phaser.Timer.SECOND, function() {
		//	this.wasFontLoaded = true;
		//	this.allLoaded();
		//}, this);
		this.wasFontLoaded = true;
		//console.log('font loaded!');
		this.allLoaded();
	},

	allLoaded: function(){
		//console.log('<< PreloadState.create >>');
		if (!this.wasFontLoaded || !this.wasGameLoaded) return;
		//console.log('<< PreloadState.create >>');
		this.signal.dispatch(this.COMPLETE);
	}


};

module.exports = PreloadState;

