import tokenService from '../service/token-service.js'

export default function (req, res, next) {
    try {
        const accessToken = req.headers.authorization
        
        if (!accessToken) {
            return next(res.status(500).json({ message: 'Create error1' }))
        }
        // console.log('1:',authorizationHeader);
        
        
        // const accessToken = authorizationHeader
        // if (!accessToken) {
        //     return next(res.status(500).json({ message: 'Create error2' }))
        // }
        // console.log('2:', accessToken);
        
        const userData = tokenService.validateAccessToken(accessToken)
        
        if (!userData) {
            return next(res.status(500).json({ message: 'Create error2' }))
        }
        // console.log('3:', userData);

        req.user = userData
        next()
    } catch (e) {
        return next(res.status(500).json({ message: 'Create error (catch)' }))
    }
}





