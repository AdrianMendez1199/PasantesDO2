// ========================
// verify token
// ========================


const verifyToken = (req, res, next) => {
    const token = req.get('token');
    console.log(token)
    res.json({
        token
    })
}



module.exports = {
    verifyToken
}