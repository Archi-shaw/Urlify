const { getUser } = require('../service/auth');

//Middleware to check if the user is authenticated

// function checkForAuthentication(req,res,next) {
//     // const authorizationHeaderValue = req.headers['authorization'];
//     // req.user = null;
//     const tokenCookie = req.cookies?.token;
//     if(!tokenCookie || !tokenCookie.startsWith('Bearaer')){
//   return next();
//     }
//     // const token = authorizationHeaderValue.split('Bearer')[1];
//     const token = tokenCookie;
//     const user = getUser(token);
//     req.user = user;
//     next();
//  const token = req.cookies?.token;
//  if (token) {
//     const user = getUser(token);
//     if (user) req.user = user;
//   }  next();
// }
// }

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    if (tokenCookie) {
        const user = getUser(tokenCookie);
        req.user = user;
    } else {
        req.user = null;
    }
    next();
}

// Authorization for specific roles
// This middleware checks if the user has one of the specified roles

function restrictTo(roles = []){
    return function(req,res,next){
     if(!req.user){
        return res.redirect("/login");
     }   
     if(!roles.includes(req.user.role)){
       return res.end("Unauthorized");
     }
     return next();
    }
}
module.exports = {
    // restrictToLoginUserOnly,
    // checkauth,
    checkForAuthentication,
    restrictTo,
};


// async function restrictToLoginUserOnly(req, res, next) {
//     const useruid = req.headers['authorization'];
//     console.log(req.headers);
//     if (!useruid) {
//         return res.redirect('/login');
//     }
//     const token = useruid.split("Bearer ")[1];
//     const user = getUser(token);
//     if (!user) {
//         return res.redirect('/login');
//     }
//     req.user = user; 
//     next(); 
// }

// async function checkauth(req, res, next) {
//     console.log(req.headers);
//     const useruid = req.headers["authorization"];
//     const token = useruid.split("Bearer ")[1];

//     const user = getUser(token);

//     req.user = user; 
//     next(); 
// }


