'use strict'

const
    Utils = require('./utils'),
    UIDGenerator = require('uid-generator'),
    uidgen = new UIDGenerator()
;

module.exports = class Admin extends Utils{

    getToken(callback){
        if (typeof callback!='function') callback = function(){};
        uidgen.generate((err, uid) => {
            if (err) throw err;
            callback(uid);
        });
    }

    lets_test_socketIO(options,callback){
        if (typeof callback!='function') callback = function(){};

        return callback(options);
    }
}
