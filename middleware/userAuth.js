const { checkToken } = require('../service/jwtAuth')


function softAuth(req, res, next) {
    const token = req.cookies.token
    if (!token) return next()

    const payload = checkToken(token)
    // if (payload) {
    //     req.user = payload
    // }
    req.user = payload
    next()
}

function hardAuth(req, res, next) {
    const user = req.user
    if(!user){
        const token = req.cookies.token
        if(!token) return res.redirect("/signin")
        
        const payload = checkToken(token)
        if (!payload) return res.clearCookie("token").redirect("/signin")
        
        req.user = payload
        next()
    }
    next()
}


module.exports = { softAuth , hardAuth }