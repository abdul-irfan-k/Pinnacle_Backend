import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const adminSchema = new Schema({
    Email: {
        type: String, required: true
    },
    Password: {
        type: String, required: true
    }

})

adminSchema.methods.matchPassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.Password)
}
const AdminModel = mongoose.model('AdminSchema', adminSchema)
export default AdminModel