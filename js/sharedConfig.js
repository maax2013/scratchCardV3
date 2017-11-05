
var SharedConfig = {

	popup:{
		mobile: {
			width: 560,
			height: 350
		},
		desktop: {
			width: 400,
			height: 250
		}
	},
	audio: [
		{
			name: 'clock',
			src: 'assets/sounds/clock.mp3'
		},
		{
			name: 'button',
			src: 'assets/sounds/button.mp3'
		}
	],
	json: [
		{
			name:'genericButtons',
			src: 'http://cdn.pch.com/spectrum/games/images/generic.png',
			map: 'http://cdn.pch.com/spectrum/games/images/generic.json'
		},
		{
			name:'hudButtons',
			src: 'http://cdn.pch.com/spectrum/games/images/hud.png',
			map: 'http://cdn.pch.com/spectrum/games/images/hud.json'
		},
		{
			name:'overlayText',
			src: 'http://cdn.pch.com/spectrum/games/images/text.png',
			map: 'http://cdn.pch.com/spectrum/games/images/text.json'
		}
	]
};

module.exports = SharedConfig;

