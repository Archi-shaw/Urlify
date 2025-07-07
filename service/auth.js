// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "Archi@#$1234";


function setUser(user){
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role:user.role,
        }
        , secret);
    // sessionIdToUserMap.set(id, user);
}

function getUser(token){
    if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT verification error:", err.message);
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
}