var RuleFactSoundCtrler = require('./RuleFactSoundCtrler');
var MatchingNumbersManager = require('./matchingNumbersManager');

var YourNoZone = require('./yourNoZone');
var MatchNoZone = require('./matchNoZone');


var GameState = {
	// console.log('<< GameState.constructor >>');

	ASSETS_BUILD_COMPLETE: 'ASSETS_BUILD_COMPLETE',
	INTRO_ANIMATE_COMPLETE: 'INTRO_ANIMATE_COMPLETE',
	TUTORIAL_SHOW: 'TUTORIAL_SHOW',
	QUIT_SHOW: 'QUIT_SHOW',
	CONTINUE_SHOW: 'CONTINUE_SHOW',
	CONTINUE_HIDE: 'CONTINUE_HIDE',
	GAME_END: 'GAME_END',
	ERROR_SHOW: 'ERROR_SHOW',

	isPlaying: false,
	isTicking: false,

	game: null,
	gameInfo: null,
	gameInfoData:null,
	signal: new Phaser.Signal(),

	gameTime: Math.floor(1 * 60),		//in seconds
	timerSeconds: 0,
	timerMinutes: 0,

	soundMusic: null,
	soundPop:null,
	soundMagic:null,

	wholeGame:null,
	revealBG:null,
	showingGroup:null,
	BG: null,
	logoGroup: null,

	logoPCH:null,
	//money:null,
	gameNo:null,
	//gameNoBG:null,
	gameNoTxt:null,
	copy:null,
	//gameArea: null,
	gameBoard: null,

	matchNoImg:null,
	yourNoImg:null,
	matchNos:null,
	yourNos:null,
	showedMatchNumbers:[],
	showedYourNumbers:[],
	matchNumbersDone:false,
	yourNumbersDone:false,
	isAutoRevealing:false,

	free:null,
	rulesFacts:null,
	payTableBtn:null,
	blocker:null,


	targetLayout:null,

	tempEmptyCells: null,
	unRevealedCells:null,
	textX: "x",
	textO: "o",
	textEmpty: " ",
	tempCoord: null,

	tempIndex:null,
	cellTimer: null,
	showedXOCount:null,
	keyIndex:null,

	prizes: null,
	prizeType: null,
	prizeValue: null,
	isValidPrize: false,

	cashPrizeValue:null,
	tokenPrizeValue:null,
	numbersManager:null,


	showDebug: false,

	isV3Path:true,



	init: function (game, gameInfo, gameInfoData) {
		// console.log('<< GameState.init >>');

		this.game = game;
		this.gameInfo = gameInfo;
		this.gameInfoData = gameInfoData;
	},

	create: function () {
		// console.log('<< GameState.create >>');

		// this.soundMusic = this.game.add.audio('music');
		// this.soundMusic.addMarker("bgLoop",0.01,9.6,0.5,true);
		this.soundPop = this.game.add.audio('audio_popNumber');
		this.soundMagic = this.game.add.audio('audio_magic');

		this.soundScratch = this.game.add.audio('audio_scratch',3);
		this.soundScratch.addMarker("loop",0,0.11,3);

// ********* Game specific code goes here

		this.createGameAssets();//+++++++++++++++++++++++++++++++++++++++++++

// ********* Game specific code end

		this.signal.dispatch(this.ASSETS_BUILD_COMPLETE);//+++++++++++++
	},

	createGameAssets: function() {
		// console.log('<< GameState.createGameAssets >>');

		this.wholeGame = this.game.add.group();
		this.revealBG = this.game.add.group();
		this.wholeGame.add(this.revealBG);
		this.scratchGroup = this.game.add.group();
		this.wholeGame.add(this.scratchGroup);
		this.showingGroup = this.game.add.group();
		this.wholeGame.add(this.showingGroup);


		this.BG = this.revealBG.create(this.world.centerX, this.world.centerY, 'background');
		this.BG.anchor.set(0.5);
		this.BG.scale.set(0.95,1);//+++++++++++

		this.rulesFacts = Object.create(RuleFactSoundCtrler);
		this.rulesFacts.init(this.game, this.wholeGame, this.gameInfoData);
		this.rulesFacts.setRuleFactBtns(440,13);
		this.rulesFacts.setSoundBtn(30,25);
		this.rulesFacts.enableInputOnSoundBtn();

		this.topNbottomUnits = [];
		this.matchNos = Object.create(MatchNoZone);
		this.matchNos.init(this.game, this.revealBG, this.showingGroup, this.topNbottomUnits);

		this.yourNos = Object.create(YourNoZone);
		this.yourNos.init(this.game, this.revealBG, this.showingGroup, this.topNbottomUnits);

		this.revealBtn = this.showingGroup.create(538,205,'sfl_revealAll');
		this.revealBtn.anchor.set(0.5);//++++++++++++

		this.revealBtn.alpha = 0;

		//this.game.time.events.add(5, this.tempFunc, this);//------------------

	},

	//tempFunc: function () {
	//	this.setIWGame(10,1000);//~~~~~~~~~
	//	this.startPlayTTG();
	//},

	animateIntro: function() {
		// console.log('<< GameState.animateIntro >>');

		this.signal.dispatch(this.INTRO_ANIMATE_COMPLETE);

	},

	setIWGameV3Path: function (pValue, pType) {
		console.log("prize value: "+pValue);
		console.log("prize type: "+pType);

		this.prizeValue = pValue;
		this.prizeType = pType;

		this.numbersManager = Object.create(MatchingNumbersManager);
		this.numbersManager.signal.add(this.numbersManagerHandlerV3Path,this);//<<<<<<<<<<<<<<<<<<<<<<<<<
		this.numbersManager.createNumbersV3Path(this.game,this.prizeValue,this.prizeType);//+++++++++++++
	},

	numbersManagerHandlerV3Path: function (msg) {
		if(msg===this.numbersManager.NUMBER_MANAGER_DONE){

			var allPrizeNames = this.numbersManager.getDividedPrizeNames();
			var allPrizeValues = this.numbersManager.getDividedPrizeValues();
			var allPrizes = [];

			for (var i =0;i<allPrizeNames.length;i++){
				allPrizes.push([allPrizeValues[i], false, this.game.make.sprite(0,0,'prizes',allPrizeNames[i])]);
			}

			//console.log(allPrizes.toString());
			Phaser.ArrayUtils.shuffle(allPrizes);
			//console.log(allPrizes.toString());

			this.mouseMoveValve = 0;
			this.mouseMoveValveMax = 0;

			this.matchNos.setBoard(this.numbersManager.getCallerNumbers(),this.numbersManager.getMatchedCallerNumbers());//+++++++++++++
			this.yourNos.setBoardV3Path(this.numbersManager.getYourNumbers(),this.numbersManager.getMatchedCallerNumbers(),allPrizes, this.numbersManager.getMultiplier());

			this.revealBMD = this.game.make.bitmapData(this.world.width, this.world.height);
			this.createSnapshot(this.revealBMD,this.revealBG,false);
			this.revealFinalImage = this.scratchGroup.addChild(this.game.add.image(0, 0, this.revealBMD));
			// this.revealFinalImage.alpha = 0.3;

			this.matchNos.createBMDs(this.revealFinalImage);
			this.yourNos.createBMDs(this.revealFinalImage);

			this.scratchGroup.remove(this.revealFinalImage);
			this.revealFinalImage = null;
			this.revealBMD = null;

			this.game.time.events.add(300, this.readyGame, this);//+++++++++++++
		}
		if(msg===this.numbersManager.NUMBER_MANAGER_ERROR){
			this.showErrorMessage(msg);
		}
	},
	// draws group to main BitmapData and hides the group
	createSnapshot: function(bmd, group, hideGroup) {
	    this.game.stage.updateTransform();
	    bmd.drawGroup(group);

	    if(hideGroup) {
	        group.visible = false;
	    }
	},

	paint: function (x, y) {
		this.tempNumberObj = this.getNumberObjUnderPointer(this.topNbottomUnits,x,y);
		if(this.tempNumberObj){
			if(this.tempNumberObj.hasRevealed()) return;
			this.tempNumberObj.paintBMD(x,y);
			if(!this.soundScratch.isPlaying){
			    this.soundScratch.play("loop");
			}
		}
	},

	enableScratch: function () {
		// console.log("enabled");

	    this.game.input.addMoveCallback(this.paintInput, this);

	},
	disableScratch: function () {
	    this.game.input.deleteMoveCallback(this.paintInput, this);
	},

	paintInput: function (pointer, x, y) {
		// console.log("paint");

		this.mouseMoveValve++;
	    if (pointer.isDown&&this.mouseMoveValve>this.mouseMoveValveMax) {
	    	this.mouseMoveValve=0;
	        this.paint(x,y);
	    }
	},

	getNumberObjUnderPointer: function (arry,x,y) {
	    var thisNumberObj;
	    for(var i=0; i < arry.length; i++) {
	        thisNumberObj = arry[i];
	        if(thisNumberObj.isWithinBoundary(x,y)) return thisNumberObj;
	    }
	    return null;

	},


	showErrorMessage: function (msg) {
		console.log(msg);
		this.signal.dispatch(this.ERROR_SHOW);
	},












	paused: function() {
		// console.log('<< GameState.paused >>');
		//this.signal.dispatch(this.CONTINUE_SHOW);//++++++++++++++++++
	},
	resumed: function() {
		// console.log('<< GameState.resumed >>');
		//this.signal.dispatch(this.CONTINUE_HIDE);
	},

	tutorialShow: function() {
		// console.log('<< GameState.tutorialShow >>');
		this.freezeGame();
		this.signal.dispatch(this.TUTORIAL_SHOW);
	},
	tutorialHide: function() {
		// console.log('<< GameState.tutorialHide >>');
		this.unfreezeGame();
	},
	popupQuitShow: function() {
		// console.log('<< GameState.popupQuitShow >>');
		this.freezeGame();
		this.signal.dispatch(this.QUIT_SHOW);
	},
	popupQuitHide: function() {
		// console.log('<< GameState.popupQuitHide >>');
		this.unfreezeGame();
	},

	freezeGame: function(){
		//this.timer.pause();
		//this.game.physics.arcade.isPaused = true;
		//this.itemTimer.pause();
		//this.disableInputOnGame();
		//this.game.tweens.pauseAll();
	},
	unfreezeGame: function(){
		//this.timer.resume();
		//this.game.physics.arcade.isPaused = false;
		//this.itemTimer.resume();
		//this.enableInputOnGame();
		//this.game.tweens.resumeAll();
	},

	readyGame: function () {
		//TODO: remove the wait indicator from welcome screen if it has one
		console.log("game start!");

		this.rulesFacts.enableInputOnRuleFact();

		this.matchNos.showFoil(100);
		this.yourNos.showFoil(100);

		// this.game.time.events.add(500, this.popRevealAll, this);
		this.game.time.events.add(500, this.startPlayTTG, this);
	},


	//=================== game start ===========================================
	startPlayTTG: function () {
		this.enableInputOnGame();
		this.isPlaying = true;
	},

	autoRevealHandler: function () {
		this.isAutoRevealing = true;
		this.allUnrevealedUnits = [];
		this.autoRevealPointer = new Phaser.Point();
		var clickTween = this.game.add.tween(this.revealBtn).to({x:'+5',y:'+5'},90,"Linear",true,0,0,true);
		clickTween.onComplete.add(function() {
			this.disableInputOnGame();
			this.topNbottomUnits.forEach(function(element){
			    element.onRevealed.add(this.onNumberShow,this);
			    if(!element.isRevealed) this.allUnrevealedUnits.push(element);
			},this);
			this.autoRevealing();
		}, this);

	},
	autoRevealing: function () {
		if(this.allUnrevealedUnits.length>0){
		    //var rdmN = this.game.rnd.integerInRange(0,tempUnrevealedNumbers.length-1);
		    //this.autoRevealSinglePath(tempUnrevealedNumbers[rdmN]);
		    this.autoRevealSinglePath(this.allUnrevealedUnits.shift());
		}
	},
	autoRevealSinglePath: function (obj) {
	    this.autoRevealPointer.x = obj.boundaryRect.x;
	    this.autoRevealPointer.y = obj.boundaryRect.y+10;

	    var tween1 = this.game.add.tween(this.autoRevealPointer).to({x:'+60',y:'-0'},60,"Linear",true);
	    var tween2 = this.game.add.tween(this.autoRevealPointer).to({x:'-0',y:'65'},60,"Linear");
	    var tween3 = this.game.add.tween(this.autoRevealPointer).to({x:'-60',y:'-0'},60,"Linear");
	    var tween4 = this.game.add.tween(this.autoRevealPointer).to({x:'-0',y:'-65'},60,"Linear");

	    tween1.chain(tween2,tween3,tween4);

	    tween4.onComplete.add(function() {
	        if(!obj.isRevealed) obj.showAsRevealed();
	        //this.isAutoRevealing = false;
	        this.game.time.events.add(50, this.autoRevealing, this);
	    }, this);
	},

	update: function () {
		if(this.isAutoRevealing){
		    this.paint(this.autoRevealPointer.x,this.autoRevealPointer.y);
		}

	},
	onNumberShow: function(msg, n, isInYourNoZone){
		if(isInYourNoZone){
			this.yourNoShowed(n);
		}else{
			this.matchNoShowed(n);
		}
	},
	yourNoShowed: function(n){
		this.showedYourNumbers.push(n);
		this.checkMatch(n, this.showedMatchNumbers);
		if(this.showedYourNumbers.length>=this.yourNos.allUnits.length){
			this.yourNumbersDone = true;
			this.checkIfAllRevealed();
		}
	},
	matchNoShowed: function(n){
		this.showedMatchNumbers.push(n);
		this.checkMatch(n, this.showedYourNumbers);
		if(this.showedMatchNumbers.length>=this.matchNos.allUnits.length){
			this.matchNumbersDone = true;
			this.checkIfAllRevealed();
		}
	},

	checkMatch: function (n, ary) {
		if(ary.indexOf(n)>-1) this.showMatchedPair(n);
	},
	showMatchedPair: function (n) {
		console.log(n);
		this.soundPop.play();
		for(var i=0;i<this.yourNos.allUnits.length;i++){
			if(this.yourNos.allUnits[i].unitNo===n){
				this.yourNos.allUnits[i].showAsMatched();
				break;
			}
		}
		for(var k=0;k<this.matchNos.allUnits.length;k++){
			if(this.matchNos.allUnits[k].unitNo===n){
				this.matchNos.allUnits[k].showAsMatched();
				break;
			}
		}
	},
	checkIfAllRevealed: function () {

		if(this.yourNumbersDone&&this.matchNumbersDone){
			console.log("all revealed");
			this.yourNos.paintAll();
			// this.matchNos.paintAll();

			this.soundMagic.play();
			this.isAutoRevealing = false;
			this.disableInputOnGame();//+++++++++++++++++++++++++++++++++++++++++

			this.game.time.events.add(2500, this.gameEnding, this);
		}
	},

	enableInputOnGame: function() {
		// console.log('<< GameState.enableInputOnGame >>');

		this.topNbottomUnits.forEach(function(element){
		    element.onRevealed.add(this.onNumberShow,this);
		},this);

		this.enableScratch();

		this.revealBtn.inputEnabled = true;
		this.revealBtn.input.useHandCursor = true;
		this.revealBtn.events.onInputDown.add(this.autoRevealHandler,this);
		this.revealBtn.alpha = 1;
	},
	disableInputOnGame: function() {
		// console.log('<< GameState.disableInputOnGame >>');

		this.game.canvas.style.cursor = "default";

		this.topNbottomUnits.forEach(function(element){
		    element.onRevealed.remove(this.onNumberShow,this);
		},this);

		this.disableScratch();

		this.revealBtn.inputEnabled = false;
		this.revealBtn.input.useHandCursor = false;
		this.revealBtn.events.onInputDown.remove(this.autoRevealHandler,this);
		this.revealBtn.alpha = 0.3;
	},


	gameEnding: function () {
		console.log('<< GameState.gameEnding >>');
		//this.isPlaying = false;
		this.freezeGame();
		this.gameEndingCleanUp();
		this.game.time.events.removeAll();
		this.game.time.events.add(this.gameInfo.gameEndDelay, this.fireGameEndSignal, this);
	},
	gameEndingCleanUp: function() {
		// console.log('<< GameState.gameEndingCleanUp >>');
		// this.disableInputOnGame();//+++++++++++++++++++++++
		// this.soundMusic.fadeOut(1000);
		//this.soundClock.volume = 0;

	},

	fireGameEndSignal: function () {
		console.log('<< GameState.fireGameEndSignal >>');
		//this.game.destroy();
		this.signal.dispatch(this.GAME_END);//=====================>>>>>>>>>>>>>
	},

	gameDestroy: function () {
		this.game.destroy();
	}

};

module.exports = GameState;

