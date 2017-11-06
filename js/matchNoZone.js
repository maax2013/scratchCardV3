var MatchNo = require('./matchNo');

var MatchNoZone = {

    init: function(game, revealGroup,showingGroup, topNbottomUnits){
        this.game = game;
        this.revealGroup = revealGroup;
        this.showingGroup = showingGroup;
        this.offX = 52;
        this.offY = 250;
        this.unitWidth = 67;
        this.unitHeight = 85;
        this.unitPadX = 5;
        this.unitPadY = 5;

        this.foilHolder = game.add.group();
        this.foilHolder.x = this.offX;
        this.foilHolder.y = this.offY;
        revealGroup.add(this.foilHolder);
        this.foilHolder.alpha = 0.3;

        this.allUnits = [];

        for(var row=0;row<1;row++){
            for(var i=0;i<7;i++){
                var x1= i*(this.unitWidth+this.unitPadX*2);
                var y1 = row*(this.unitHeight+this.unitPadY*2);

                this.foilHolder.create(x1+this.unitPadX,y1+this.unitPadY,'smallTile');

                var thisUnitX = x1+this.offX+this.unitPadX;
                var thisUnitY = y1+this.offY+this.unitPadY;
                var thisNoUnit = new MatchNo(this.game,revealGroup,showingGroup,thisUnitX,thisUnitY,this.unitWidth,this.unitHeight);

                topNbottomUnits.push(thisNoUnit);
                this.allUnits.push(thisNoUnit);
            }
        }
    },

    setBoard: function (numbers, matchedNumbers) {

        var tempN = 0;

        this.allUnits.forEach(function(element){
            // console.log(numbers[tempN]);
            element.setNumber(numbers[tempN]);

            if(matchedNumbers.indexOf(numbers[tempN])>-1){
                element.flagMatched();
            }
            tempN++;
        },this);

    },

    showFoil: function (delay) {
        this.game.add.tween(this.foilHolder).to({alpha:1},500,"Linear",true,delay);
    },

    createBMDs: function(wholeImg){
        this.allUnits.forEach(function(element){
            element.copyBMD(wholeImg);
        },this);
    },

};

module.exports = MatchNoZone;
