var AppManager = require('./appManager');
var GameState = require('./gameState');


var gameInfo = {
	gameName: 'Set for life',
	size: {
		width: 640,
		//width: 1050*window.frameElement.width/window.frameElement.height,
		height: 960,
		gutter: 20
	},
	tutorialInfo: {
		imageNames: ['tutorial1']
		// imageNames: ['tutorial1']
	},
	preloadInfo: {

		images: [
			{ name:'background', src:'' },
			{ name:'smallTile', src:'' },
			{ name:'largeTile', src:'' },
			//{ name:'sfl_bg', src:'assets/images/SFL_bg.png' },
			//{ name:'sfl_free', src:'assets/images/SFL_free.png' },
			{ name:'sfl_htp', src:'assets/images/SFL_HTP.png' },
			//{ name:'sfl_icon', src:'assets/images/SFL_icon.png' },
			//{ name:'sfl_logo', src:'assets/images/SFL_logo.png' },
			//{ name:'sfl_matchN', src:'assets/images/SFL_matchN.png' },
			{ name:'sfl_playNow', src:'assets/images/SFL_playNow.png' },
			{ name:'sfl_revealAll', src:'assets/images/SFL_revealAll.png' },
			{ name:'sfl_rf', src:'assets/images/SFL_RF.png' },

			{ name:'iconMultiplier5', src:'assets/images/icon5x.png'},
			{ name:'iconMultiplier10', src:'assets/images/icon10x.png'},
			//{ name:'sfl_yourN', src:'assets/images/SFL_yourN.png' },

			{ name:'waitSpinner', src:'assets/images/spinner.png' }

		],
		spritesheets: [
			// { name:'items', src:'assets/images/match-items.png', width:70, height:95, frames:12 }
			{ name:'revealBG', src:'assets/images/reveal-bg.png',width:66, height:74, frames:10},
			{ name:'TTG_scratch1', src:'assets/images/TTG_scratch1All.png', width:84, height:84, frames:9 },
			{ name:'TTG_scratch2', src:'assets/images/TTG_scratch2All.png', width:84, height:84, frames:22 },
			{ name:'TTG_scratch3', src:'assets/images/TTG_scratch3All.png', width:84, height:84, frames:18 },
			//{ name:'IWEImage', src:'assets/images/spriteSheet120X116.png', width:120, height:116, frames:40},//------------
			{ name:'soundBtn', src:'assets/images/soundToggleBtn.png', width:64, height:64, frames:2 }

		],
		audio: [

			{ name:'music', src:'assets/sounds/BB_music_all.mp3' },
			{ name:'audio_popNumber', src:'assets/sounds/BB_pop.mp3' },
			{ name:'audio_score', src:'assets/sounds/BB_score.mp3' },
			{ name:'audio_magic', src:'assets/sounds/BB_magic.mp3' },
			{ name:'audio_scratch', src:'assets/sounds/BB_scratch2.mp3' },

			{ name:'audio_chalkS1', src:'assets/sounds/TTG_scratch1.mp3' },
			{ name:'audio_chalkS2', src:'assets/sounds/TTG_scratch2.mp3' },

			{ name:'clock', src:'assets/sounds/clock.mp3' },
			{ name:'button', src:'assets/sounds/button.mp3' }

		],
		json: [
			// { name:'genericButtons', src:'http://cdn.pch.com/spectrum/games/images/generic.png', map:'http://cdn.pch.com/spectrum/games/images/generic.json' },

		]
	},
	logoViewTime: 3,//3000~~~~~~~~~~~~~~~~~~~~~~~~~
	gameEndDelay: 2000
	//hud: {
	//	colorText: '#f9df50',
	//	colorButtons: 0xb01c00
	//},
	//overlayText: {
	//	color: {
	//		inner: 0X9d20bb,
	//		outter: 0xf4b8c2
	//	},
	//	assetsToCreate: [
	//		// {name:'gameOver',   src:'gameover'}
	//	]
	//}
};


//FontLoader.init('Open+Sans:400,700:latin');
//FontLoader.init(['Open+Sans:400,700:latin','Orbitron:500']);
//FontLoader.init(['Open+Sans:400,700:latin','Press+Start+2P', 'Orbitron:500','Wallpoet']);


//window.addEventListener('load', function(event) {
//	// needs to be instantiated here since this is the code that will be changing each game - this is not a generic class
//	var gameState = Object.create(GameState);
//
//	var appManager = Object.create(AppManager);
//	appManager.init(gameState, gameInfo);
//});

var gameState = Object.create(GameState);

var appManager = Object.create(AppManager);
appManager.init(gameState, gameInfo);

