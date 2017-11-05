var FloatingText = {
    XO_SHOWED: 'XO_SHOWED',

    game:null,
    floatGroup:null,
    floatGroupD:null,
    floatGroupP:null,
    floatPrizeText:null,
    floatDescriptionText:null,
    soundScore: null,

    signal: new Phaser.Signal(),

    showFloatingText: function (game,desT,prizeT,x,y,parent) {
        this.game = game;

        this.floatGroup = game.add.group();
        this.floatGroup.x = x;
        this.floatGroup.y = y;
        parent.add(this.floatGroup);

        this.soundScore = this.game.add.audio('audio_score');

        this.createDescriptionText(desT);

        //this.createPrizeText(prizeT);
        var self = this;
        setTimeout(function() {
            self.createPrizeText(prizeT);
        }, 800);
    },

    createPrizeText: function (prizeT) {
        this.floatGroupP = this.floatGroup.addChild(this.game.add.group());
        this.floatGroupP.y = 30;

        var bottomText = this.game.add.text(0, 0, prizeT,
            {fontSize:65,font:'Open Sans',fontWeight:'bold',fill:'#0088dd',align:'center',stroke:'#000000',strokeThickness:28},
            this.floatGroupP);
        bottomText.anchor.set(0.5);
        bottomText.setShadow(0,5,'#000000',1,true,false);

        var topText = this.game.add.text(0, 0, prizeT,
            {fontSize:65,font:'Open Sans',fontWeight:'bold',fill:'#0088dd',align:'center',stroke:'#ffffff',strokeThickness:16},
            this.floatGroupP);
        topText.anchor.set(0.5);

        this.floatGroupP.scale.set(0.05);
        this.float(this.floatGroupP);

        //this.floatPrizeText = this.floatGroup.addChild(this.game.add.text(0, 30));
        //
        //this.floatPrizeText.fontSize = 65;
        ////this.floatPrizeText.fill = '#ffffff';
        ////this.floatPrizeText.font = 'Open Sans';
        ////
        ////this.floatPrizeText.stroke = '#0088dd';
        ////this.floatPrizeText.strokeThickness = 24;
        //
        //this.floatPrizeText.fill = '#0088dd';
        //this.floatPrizeText.font = 'Open Sans';
        //
        //this.floatPrizeText.stroke = '#ffffff';
        //this.floatPrizeText.strokeThickness = 24;
        //
        //this.floatPrizeText.setShadow(0,5,'#000000',9,true,false);
        //
        //this.floatPrizeText.align = 'center';
        ////this.cellNumber.lineSpacing = -8;
        //this.floatPrizeText.text = prizeT;
        //this.floatPrizeText.anchor.set(0.5);
        //this.floatPrizeText.scale.set(0.05);
        //
        //this.float(this.floatPrizeText);
    },
    createDescriptionText: function (desT) {
        this.floatGroupD = this.floatGroup.addChild(this.game.add.group());
        this.floatGroupD.y = -30;

        var bottomText = this.game.add.text(0, 0, desT,
            {fontSize:50,font:'Open Sans',fontWeight:'bold',fill:'#bb0000',align:'center',stroke:'#000000',strokeThickness:23},
            this.floatGroupD);
        bottomText.anchor.set(0.5);
        bottomText.setShadow(0,5,'#000000',9,true,false);

        var topText = this.game.add.text(0, 0, desT,
            {fontSize:50,font:'Open Sans',fontWeight:'bold',fill:'#bb0000',align:'center',stroke:'#ffffff',strokeThickness:13},
            this.floatGroupD);
        topText.anchor.set(0.5);

        this.floatGroupD.scale.set(0.05);
        this.float(this.floatGroupD);



        //this.floatDescriptionText = this.floatGroup.addChild(this.game.add.text(0, -30));
        //var topText = this.game.add.text(0, -30,desT,
        //    {fontSize:50,font:'Open Sans',fontWeight:'bold',fill:'#bb0000',align:'center',stroke:'#ffffff',strokeThickness:13},
        //    this.floatGroup);
        //topText.anchor.set(0.5);
        ////this.floatDescriptionText.addChild(topText);
        //
        //this.floatDescriptionText.fontSize = 50;
        ////this.floatDescriptionText.fill = '#ffffff';
        ////this.floatDescriptionText.font = 'Open Sans';
        ////
        ////this.floatDescriptionText.stroke = '#bb0000';
        ////this.floatDescriptionText.strokeThickness = 22;
        //
        //this.floatDescriptionText.fill = '#bb0000';
        //this.floatDescriptionText.font = 'Open Sans';
        //
        //this.floatDescriptionText.stroke = '#000000';
        //this.floatDescriptionText.strokeThickness = 23;
        //
        //this.floatDescriptionText.setShadow(0,5,'#000000',9,true,false);
        //
        //this.floatDescriptionText.align = 'center';
        ////this.cellNumber.lineSpacing = -8;
        //this.floatDescriptionText.text = desT;
        //this.floatDescriptionText.anchor.set(0.5);
        ////this.floatDescriptionText.scale.set(0.05);
        //
        ////this.float(this.floatDescriptionText);
    },

    float: function (obj) {
        this.soundScore.play();
        var popTween = this.game.add.tween(obj.scale).to({x:1,y:1},500,Phaser.Easing.Back.Out,true);
        var moveTween = this.game.add.tween(obj).to({x:0,y:-200},800,"Linear",true,1000);
        var fadeTween = this.game.add.tween(obj).to( { alpha: 0 }, 800, "Linear", true,1000);
    }

};

