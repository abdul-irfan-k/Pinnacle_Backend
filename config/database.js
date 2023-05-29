import mongoose from 'mongoose'

const connectDB = async (callBackFunc) => {
    try {   
        const connect = await mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/Pinnacle')
        callBackFunc()
    } catch (error) {
        console.log(error)
    }
}

export default connectDB