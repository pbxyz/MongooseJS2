import mongoose from 'mongoose'

const reqString = {
    type: String,
    required: true,
}

const userSchema = mongoose.Schema({
    email: reqString,
    username: reqString,
    password: reqString,
    updates: {
        type: Number,
        default: 5,
        min: 0,
        max: 10
    },
    nameHistory: [String],
}, {
    timestamps: true
})

export default mongoose.model('user', userSchema)
