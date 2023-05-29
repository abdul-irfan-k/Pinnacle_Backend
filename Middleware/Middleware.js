import jwt from 'jsonwebtoken'

export const checkAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.acessToken
        if (!token) return res.status(400).json({ isError: true, errorType: 'TOKENNOTFOUND', isLogedIn: false })

        if (token) {
            const decode = await jwt.verify(token, 'someletterincluded')
            req.Email = decode.Email
            req._id = decode._id
            next()
        }
    } catch (error) {
        res.status(400).json({ isError: true, errorType: 'TOKENEXPIRED', isLogedIn: false })
    }
}

