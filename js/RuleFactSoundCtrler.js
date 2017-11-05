var RuleFactSoundCtrler = {
    rulesFacts:null,
    rulesBtn:null,
    factsBtn:null,
    game:null,
    gameInfoData:null,
    soundToggleBtn:null,

    init: function (game, parent,infoData){
        this.game = game;
        this.parent= parent;
        this.gameInfoData = infoData;
    },
    setRuleFactBtns: function(x,y){
        this.rulesFacts = this.parent.addChild(this.game.make.sprite(x,y,'sfl_rf'));
        this.rulesFacts.anchor.set(0.5);
        this.rulesBtn = this.game.add.graphics();
        this.rulesBtn.beginFill(0xfff);
        this.rulesBtn.drawRect(-230, -20, 200, 40);
        this.rulesBtn.alpha = 0;
        this.rulesFacts.addChild(this.rulesBtn);
        this.factsBtn = this.game.add.graphics();
        this.factsBtn.beginFill(0xfff);
        this.factsBtn.drawRect(-23, -20, 230, 40);
        this.factsBtn.alpha = 0;
        this.rulesFacts.addChild(this.factsBtn);

        this.rulesFacts.alpha = 0;//+++++++++++++++++++++++++++
    },
    setSoundBtn: function(x,y){
        this.soundToggleBtn = this.parent.addChild(this.game.make.sprite(x,y,'soundBtn',1));
        this.soundToggleBtn.anchor.set(0.5);
    },
    enableInputOnSoundBtn: function(){
        this.soundToggleBtn.inputEnabled = true;
        this.soundToggleBtn.input.useHandCursor = true;
        this.soundToggleBtn.events.onInputDown.add(this.audioClickHandler, this);
    },

    enableInputOnRuleFact: function () {
        this.rulesFacts.alpha = 1;
        this.rulesBtn.inputEnabled = true;
        this.rulesBtn.input.useHandCursor = true;
        this.rulesBtn.events.onInputDown.add(this.rulesClickHandler,this);
        this.factsBtn.inputEnabled = true;
        this.factsBtn.input.useHandCursor = true;
        this.factsBtn.events.onInputDown.add(this.factsClickHandler,this);
    },
    disableInputOnRuleFact: function () {
        this.game.canvas.style.cursor = "default";
        this.rulesBtn.inputEnabled = false;
        this.rulesBtn.input.useHandCursor = false;
        this.rulesBtn.events.onInputDown.remove(this.rulesClickHandler,this);
        this.factsBtn.inputEnabled = false;
        this.factsBtn.input.useHandCursor = false;
        this.factsBtn.events.onInputDown.remove(this.factsClickHandler,this);
    },

    rulesClickHandler: function() {
        window.open(this.gameInfoData.rules, '_blank');
    },
    factsClickHandler: function() {
        window.open(this.gameInfoData.policy, '_blank');
    },
    audioClickHandler: function () {
        // console.log('<< Hud.audioClickHandler >>');
        if (this.game.sound.mute === false) {
            this.game.sound.mute = true;
            this.soundToggleBtn.frame = 0;
        } else {
            this.game.sound.mute = false;
            this.soundToggleBtn.frame = 1;
        }
        //localStorage.setItem(this.gameInfo.gameName + '-audioOn', !this.game.sound.mute, 10000);
    }
};

module.exports = RuleFactSoundCtrler;
