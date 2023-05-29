import AdminModel from "../model/AdminModel.js"
import jwt from 'jsonwebtoken'
import EventModel from "../model/EventModel.js"

export const loginAdmin = async (req, res) => {
    try {
        console.log(req.url)
        const { Email, Password } = req.body

        const user = await AdminModel.findOne({ Email })
        if (!user) return res.status(400).json({ isValid: false, errorType: 'INAVALIDEMAIL', errorMessage: 'Incorrect Email' })
        if (await user.matchPassword(Password) == false) return res.status(400).json({ isValid: false, errorType: 'PASSWORDNOTMATCH', errorMessage: 'Password Not Matched ' })

        const token = await jwt.sign({ Email: user.Email, _id: user._id }, 'someletterincluded', { expiresIn: "1h" })
        res.cookie("acessToken", token, { httpOnly: true, somesite: "strict" })
        res.status(200).json({ isValid: true, isLogedIn: true })
    } catch (error) {
        console.log(error)
    }
}

export const getEventDetails = async (req, res) => {
    try {
        console.log(req.url)

        const EventDetails = await EventModel.find({})
        return res.status(200).json({ EventDetails })
    } catch (error) {

    }
}