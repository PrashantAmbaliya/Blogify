const jwt = require('jsonwebtoken')

const secret = "demoSecret";

function generateToken(user) {
    const payload = {
        id : user._id,
        name: user.name,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role : user.role,
    }
    const token = jwt.sign(payload,secret)
    return token;
}

function checkToken(token) {
    try {
        const payload = jwt.verify(token,secret);
        return payload;
    } catch (error) {
        console.log(error.message);
    }
    
}

module.exports = {generateToken,checkToken}