import mongoose from 'mongoose'

const connectDB = async (callBackFunc) => {
    try {   
        const connect = await mongoose.connect('mongodb+srv://spcpinnacle2k23:xVqT1RokNB8TUs3A@cluster0.ns3fqql.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/Pinnacle')
        callBackFunc()
    } catch (error) {
        console.log(error)
    }
}

export default connectDB