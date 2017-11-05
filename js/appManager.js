var PreloadState = require('./preloadState');
var Popup = require('./popup');


var AppManager = {
	game: null,
	proxyManager: null,
	deviceType: null,
	d: 0,
	isDeviceTypeDesktop: false,
	isDeviceTypeMobile: false,
	isDeviceTypeTablet: false,
	preloader: null,
	popupWelcome: null,
	popupContinue: null,
	popupQuit: null,
	popupError:null,
	//tutorial: null,
	startTime: null,
	gameState: null,
	gameInfo: null,
	tempWidth:null,

	IWE_cashValue: 0,
	IWE_tokenValue: 0,
	IWE_imgURL: null,
	IWE_imgURL_cash: null,
	IWE_imgURL_token:null,

	IWEWaitTimer:null,

	isV3Path:true,

	init: function(gameState, gameInfo){
		// console.log('<< AppManager.init >>');
		// console.log(gameInfo);

		this.startTime = (new Date()).getTime();

		this.gameInfo = gameInfo;

		this.fixLocalStorage();

		this.game = new Phaser.Game(this.gameInfo.size.width, this.gameInfo.size.height, Phaser.AUTO, 'game-holder',null,true);
		this.game.name = 'myGameNameThing';

		this.preloader = Object.create(PreloadState);
		this.preloader.signal.add(this.startApp, this);

		this.gameState = gameState;
		this.gameState.signal.add(this.gameStateSignalHandler, this);

		//this.tutorial = Object.create(Tutorial);
		//this.tutorial.init(this.game, this.gameInfo);

		this.popupWelcome = Object.create(Popup);
		//this.popupQuit = Object.create(Popup);
		//this.popupContinue = Object.create(Popup);
		this.popupError = Object.create(Popup);

		//*for local testing
		//this.proxyManager = document.location.hostname === 'localhost' || document.location.hostname === '0.0.0.0' ? new ProxyManager(PCH.gameProxy) : window.PCH.gameProxy;
		//*
		this.proxyManager = document.location.hostname === 'localhost' || document.location.hostname === '0.0.0.0' ? window.PCH.gameProxy : window.PCH.gameProxy;//++++++++++++++++

		this.proxyManager.registerStartFunction((function (arg) {
			this.build(arg);
		}).bind(this));

		//var tempFN = "registerStartFunction";
		//this.proxyManager[tempFN]((function (arg) {
		//	this.build(arg);
		//}).bind(this));
	},

	build: function(arg) {
		// console.log('<< AppManager.build >>');

		arg.game.deviceType = 'desktop';

		this.deviceType = arg.game.deviceType;
		this.d = arg.game.d;
		this.gameInfo.gameData = arg.game;

		switch (this.deviceType) {
			case 'desktop':
				this.isDeviceTypeDesktop = true;
			break;
			case 'tablet':
				this.isDeviceTypeTablet = true;
			break;
			case 'mobile':
				this.isDeviceTypeMobile = true;
			break;
		}

		if (arg.user.firstName.length > 10 && !this.isDeviceTypeDesktop) {
			this.player = '\n'.concat(arg.user.firstName);
		}
		else {
			this.player = arg.user.firstName;
		}

		if(this.isV3Path){
			this.preloader.initialize(this.game, this.gameInfo,'');//+++++++++++
		}else{
			this.preloader.initialize(this.game, this.gameInfo, this.gameInfo.gameData.base_package_url);//+++++++++++
		}

		//fake respond
		//this.preloader.initialize(this.gameInfo, "");//---------------------------------

		// Create Game States & start the game
		this.game.state.add('preloader', this.preloader);
		this.game.state.add('gameState',  this.gameState);
		this.game.state.start('preloader');
	},

	startApp: function() {
		// console.log('<< AppManager.startApp >>');

		this.preloader.signal.remove(this.startApp, this);
		
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		var millisecondsPassed = (new Date()).getTime() - this.startTime;
		var millisecondsRemaining = this.gameInfo.logoViewTime - millisecondsPassed;

		if (millisecondsPassed < this.gameInfo.logoViewTime) {
			this.game.time.events.add(millisecondsRemaining, this.createAssets, this);
		}
		else {
			this.createAssets();
		}
	},


	gameStateSignalHandler: function(msg) {
		// console.log('<< AppManager.gameStateSignalHandler >> msg:: ' + msg);
		switch(msg) {
			case this.gameState.ASSETS_BUILD_COMPLETE:
				this.hidePreloadAnimation();
			break;
			
			case this.gameState.INTRO_ANIMATE_COMPLETE:
				this.showPopupWelcome();
			break;

			case this.gameState.ERROR_SHOW:
				this.showErrorMessage();
				break;

			//case this.gameState.TUTORIAL_SHOW:
			//	this.tutorialToggle();
			//break;

			case this.gameState.QUIT_SHOW:
				this.quitToggle();
			break;

			case this.gameState.GAME_END:
				this.endGame();
			break;

			case this.gameState.CONTINUE_SHOW:
				this.popupContinue.init(this.game, Popup.TYPE_CONTINUE);
				this.popupContinue.show();
			break;

			case this.gameState.CONTINUE_HIDE:
				this.popupContinue.hide();
			break;
		}
	},


	createAssets: function() {
		// console.log('<< AppManager.createAssets >>');
		this.game.state.start('gameState', true, false, this.game, this.gameInfo, this.gameInfo.gameData);
	},


	hidePreloadAnimation: function() {
		// console.log('<< AppManager.hidePreloadAnimation >>');
		//document.getElementById('preload').style.display = 'none';
		this.game.time.events.add(500, this.animateIntro, this);//+++++++++++++++++
		//this.game.time.events.add(5, this.animateIntro, this);//------------------
	},



	animateIntro: function() {
		// console.log('<< AppManager.animateIntro >>');
		this.gameState.animateIntro();
	},


	showPopupWelcome: function() {
		// console.log('<< AppManager.showPopupWelcome >>');

		//change the wait time back to 2000~~~~~~~~~~~~~~~~~~~
		this.game.time.events.add(200, function() {
			this.popupWelcome.init(this.game, Popup.TYPE_WELCOME, this.player);

			//this.popupWelcome.signal.add(this.showTutorial, this);
			//bypass the tutorial
			this.popupWelcome.signal.add(this.callIWE, this);

			this.popupWelcome.show();
		}, this);
	},

	callIWE: function() {
		console.log('<< AppManager.callIWE >>');
		this.popupWelcome.signal.remove(this.callIWE, this);

		this.IWEWaitTimer = this.game.time.events.add(25000, this.IWETimeOut, this);//++++++++++++++25000
		//console.log('time start');
		//this.game.time.events.add(5000, this.IWETimeOut, this);
		//this.IWEWaitTimer.start();

		try{
			this.proxyManager.gameStart((function (arg) {
				this.ParseIWE(arg);//++++++++++++++++++++++++++++++++
			}).bind(this));
		}catch (err){
			console.log(err);
			this.showErrorMessage();
		}

		//this.fakeIWE();//----------------------------

	},
	IWETimeOut: function () {
		//console.log('time out');
		this.popupWelcome.hide();
		this.showErrorMessage();
	},


	fakeIWE: function () {
		var cashPrizes = [10,0];
		var tokenPrizes = [10000,7500,5000,2500,1000,750,500,250,100];
		var tempC = this.game.rnd.integerInRange(0,cashPrizes.length-1);
		var tempT = this.game.rnd.integerInRange(0,tokenPrizes.length-1);
		this.gameState.setIWGame(cashPrizes[tempC],tokenPrizes[tempT]);
	},

	ParseIWE: function (data) {
		console.log(data);
		if(this.IWEWaitTimer){
			//console.log('remove timer');
			this.game.time.events.remove(this.IWEWaitTimer);
		}
		if(this.isV3Path){
			if(data){
				if(data.response){
					var dataType;
					if(data.response.type) dataType = data.response.type.toLocaleLowerCase();

					if(dataType === 'winner'){
						this.prizeValue = data.response.data.prizeValue;
						this.prizeType = data.response.data.prizeType.name;
						console.log(this.prizeType,this.prizeValue);
						this.IWE_imgURL = data.response.data.imageUrl;
						if(this.IWE_imgURL){
							//this.loadIWEImage(this.IWE_imgURL);
							this.gameState.load.atlasJSONHash('prizes', this.IWE_imgURL, this.IWE_imgURL.replace('.png', '.json'));
							this.gameState.load.onFileComplete.add(this.onFileComplete, this);
							this.game.load.start();
						}else{
							this.showErrorMessage();
						}
					}else{
						this.showErrorMessage();
					}

					////console.log(winsArray);
					//winsArray.forEach(function(element){
					//	//console.log(element.type);
					//	if(element.type==="TOKEN"){
					//		this.IWE_tokenValue = element.value;
					//		this.IWE_imgURL_token = element.desktop_image_url;
					//	}else if(element.type==="MONETARY"){
					//		this.IWE_cashValue = element.value;
					//		this.IWE_imgURL_cash = element.desktop_image_url;
					//	}
					//},this);
                    //
					////TODO: which Url to load may change, based on IWE setup
					//if(this.IWE_cashValue>0){
					//	this.IWE_imgURL = this.IWE_imgURL_cash;
					//}else{
					//	this.IWE_imgURL = this.IWE_imgURL_token;
					//}
                    //
					//if(this.IWE_imgURL){
					//	this.loadIWEImage(this.IWE_imgURL);
					//}else{
					//	this.showErrorMessage();
					//}

					//this.gameState.setIWGame(this.IWE_cashValue, this.IWE_tokenValue, this.IWE_imgURL);
					//
					////console.log(document.getElementById('game-holder'));
					//
					//document.getElementById('game-holder').addEventListener('gameDestroy', function(event) {
					//	this.gameState.gameDestroy();
					//},this);
				}else{
					this.showErrorMessage();
				}
			}else{
				this.showErrorMessage();
			}
		}else{
			if(data){
				if(data.wins){
					var winsArray = data.wins;
					//console.log(winsArray);
					winsArray.forEach(function(element){
						//console.log(element.type);
						if(element.type==="TOKEN"){
							this.IWE_tokenValue = element.value;
							this.IWE_imgURL_token = element.desktop_image_url;
						}else if(element.type==="MONETARY"){
							this.IWE_cashValue = element.value;
							this.IWE_imgURL_cash = element.desktop_image_url;
						}
					},this);

					//TODO: which Url to load may change, based on IWE setup
					if(this.IWE_cashValue>0){
						this.IWE_imgURL = this.IWE_imgURL_cash;
					}else{
						this.IWE_imgURL = this.IWE_imgURL_token;
					}

					if(this.IWE_imgURL){
						this.loadIWEImage(this.IWE_imgURL);
					}else{
						this.showErrorMessage();
					}

					//this.gameState.setIWGame(this.IWE_cashValue, this.IWE_tokenValue, this.IWE_imgURL);
					//
					////console.log(document.getElementById('game-holder'));
					//
					//document.getElementById('game-holder').addEventListener('gameDestroy', function(event) {
					//	this.gameState.gameDestroy();
					//},this);
				}else{
					this.showErrorMessage();
				}
			}else{
				this.showErrorMessage();
			}
		}

	},

	showErrorMessage: function () {
		//TODO: show error.
		this.popupError.init(this.game, Popup.TYPE_ERROR);

		//this.popupWelcome.signal.add(this.showTutorial, this);
		//bypass the tutorial
		//this.popupWelcome.signal.add(this.callIWE, this);

		this.popupError.show();
	},
	onFileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
		//console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
		//console.log("cacheKey: " + cacheKey + ": " + success);
		if(cacheKey == 'prizes') {
			console.log("IWE image loaded.");
			this.popupWelcome.hide();
			this.gameState.setIWGameV3Path(this.prizeValue, this.prizeType);

			//console.log(document.getElementById('game-holder'));

			document.getElementById('game-holder').addEventListener('gameDestroy', function(event) {
				this.gameState.gameDestroy();
			},this);
		}
	},

	loadIWEImage: function (imgUrl) {
		console.log("loading IWE image...");
		this.gameState.load.spritesheet('IWEImage', imgUrl, 120, 116, 40);
		//this.gameState.load.image('IWEImage', imgUrl);
		this.gameState.load.onFileComplete.add(this.OnLoadIWEImageComplete,this);
		this.game.load.start();
	},
	OnLoadIWEImageComplete: function () {
		console.log("IWE image loaded.");
		//var iweImage = this.wholeGame.create(0,0,'IWEImage');

		this.popupWelcome.hide();
		this.gameState.setIWGame(this.IWE_cashValue, this.IWE_tokenValue);

		//console.log(document.getElementById('game-holder'));

		document.getElementById('game-holder').addEventListener('gameDestroy', function(event) {
			this.gameState.gameDestroy();
		},this);
	},


	//// this function is only used for the start of the game
	//// otherwise, use tutorialToggle
	//showTutorial: function() {
	//	// console.log('<< AppManager.showTutorial >>');
	//	this.popupWelcome.signal.remove(this.showTutorial, this);
	//	this.tutorial.signal.add(this.showTutorialComplete, this);
	//	this.tutorial.start();
	//},
    //
	//showTutorialComplete: function() {
	//	// console.log('<< AppManager.showTutorialComplete >>');
	//	this.tutorial.signal.remove(this.showTutorialComplete, this);
	//	this.startGame();
	//},
    //
	//tutorialToggle: function() {
	//	// console.log('<< AppManager.tutorialToggle >>');
	//	this.tutorial.signal.add(this.tutorialToggleComplete, this);
	//	this.tutorial.toggle();
	//},
    //
	//tutorialToggleComplete: function() {
	//	// console.log('<< AppManager.tutorialToggleComplete >>');
	//	this.tutorial.signal.remove(this.tutorialToggleComplete, this);
	//	this.gameState.tutorialHide();
	//},
    //
    //
	//// game state says it wants to open quit
	//quitToggle: function() {
	//	// console.log('<< AppManager.quitToggle >>');
	//	this.popupQuit.init(this.game, Popup.TYPE_QUIT);
	//	this.popupQuit.signal.add(this.popupQuitSignalHandler, this);
	//	this.popupQuit.show();
	//},
    //
	//popupQuitSignalHandler: function(msg) {
	//	// console.log('<< AppManager.popupQuitSignalHandler >> msg:: ' + msg);
	//	this.popupQuit.signal.remove(this.popupQuitSignalHandler, this);
	//	switch(msg) {
	//		case this.popupQuit.CANCEL:
	//			this.gameState.popupQuitHide();
	//		break;
	//
	//		case this.popupQuit.QUIT:
	//			this.quitGame();
	//		break;
	//	}
	//},



	//startGame: function() {
	//	// console.log('<< AppManager.startGame >>');
	//	this.gameState.startGame();
	//},

	endGame: function() {
		// console.log('<< AppManager.endGame >>');
		this.gameState.signal.remove(this.gameStateSignalHandler, this);
		//this.proxyManager.gameEvent('end', {'d':this.game.score * this.d});
		this.proxyManager.gameEvent('end');
	},

	quitGame: function() {
		// console.log('<< AppManager.quitGame >>');
		this.gameState.quit();
		this.gameState.signal.remove(this.gameStateSignalHandler, this);
		this.proxyManager.gameEnd();
	},

	fixLocalStorage: function() {
		if (typeof localStorage === 'object') {
			try {
				localStorage.setItem('localStorage', 1);
				localStorage.removeItem('localStorage');
			} catch (e) {
				Storage.prototype._setItem = Storage.prototype.setItem;
				Storage.prototype.setItem = function() {};
				// console.warn('WARNING: in private mode. Settings cannot be saved.');
			}
		}
	}

};

module.exports = AppManager;

