import mongoose from 'mongoose'

const reqString = {
    type: String,
    required: true,
}

const userSchema = mongoose.Schema({
    email: reqString,
    username: reqString,
    password: reqString,
    updates: Number,
    nameHistory: [String],
})

export default mongoose.model('user', userSchema)
