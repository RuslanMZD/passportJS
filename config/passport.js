const User = require("../models/user-module");
const config =require("../config/db");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports=(passport)=>{

    var opts = {} // объект содержащий опции по поводу авторизации
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // какой тип авторизации будет использоваться
opts.secretOrKey = config.secret;  // секрктный ключ
// opts.issuer = 'accounts.examplesoft.com';   url какой веб сервер используем
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {  //jwtStrategy  используемая стратегияя, в который передаем опции opts, а 2парам это ф-ция , jwt_payload - это польз-ль который пытается авториз
    User.findOne({id: jwt_payload.sub}, function(err, user) {   // sub это id
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


}


