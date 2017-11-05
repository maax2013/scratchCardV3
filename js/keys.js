var Keys = {
    TYPE_CASH: 'cash',
    TYPE_TOKEN: 'token',

    key1:{
        prizeType: 'token',
        prizeValue: 10000,
        ssIndex:10
    },

    key2:{
        prizeType: 'token',
        prizeValue: 7500,
        ssIndex:11
    },

    key3:{
        prizeType: 'token',
        prizeValue: 5000,
        ssIndex:12
    },

    key4:{
        prizeType: 'token',
        prizeValue: 2500,
        ssIndex:13
    },

    key5:{
        prizeType: 'token',
        prizeValue: 2000,
        ssIndex:14
    },

    key6:{
        prizeType: 'token',
        prizeValue: 1000,
        ssIndex:15
    },

    key7:{
        prizeType: 'token',
        prizeValue: 750,
        ssIndex:16
    },
    key8:{
        prizeType: 'token',
        prizeValue: 500,
        ssIndex:17
    },
    key9:{
        prizeType: 'token',
        prizeValue: 250,
        ssIndex:18
    },
    key10:{
        prizeType: 'token',
        prizeValue: 200,
        ssIndex:19
    },
    key11:{
        prizeType: 'token',
        prizeValue: 100,
        ssIndex:20
    },
    key12:{
        prizeType: 'token',
        prizeValue: 50,
        ssIndex:21
    },
    key13:{
        prizeType: 'cash',
        prizeValue: 10000,
        ssIndex:30
    },
    key14:{
        prizeType: 'cash',
        prizeValue: 100,
        ssIndex:31
    },
    key15:{
        prizeType: 'cash',
        prizeValue: 50,
        ssIndex:32
    },
    key16:{
        prizeType: 'cash',
        prizeValue: 20,
        ssIndex:33
    },
    key18:{
        prizeType: 'cash',
        prizeValue: 10,
        ssIndex:34
    },


    getAllKeys: function () {
        var allKeys = [
            this.key1,this.key2,this.key3,this.key4,this.key5,this.key6,this.key7,this.key8,this.key9,this.key10,this.key11,this.key12,this.key13,this.key14,this.key15,this.key16,this.key18
        ];
        return allKeys;
    }
};

module.exports = Keys;