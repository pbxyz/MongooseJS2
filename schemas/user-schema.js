import mongoose from 'mongoose'

const reqString = {
    type: String,
    required: true,
}

const messagesSchema = mongoose.Schema({
    userId: reqString,
    text: reqString
}, {
    timestamps: true
})

const userSchema = mongoose.Schema({
    _id: reqString,
    email: reqString,
    username: reqString,
    level: Number,
    password: reqString,
    messages: [messagesSchema],
    // messages: {
    //     type: Number,
    //     default: 5,
    //     min: 0,
    //     max: 10
    // },
    nameHistory: [String],
    testScore: [Number],
}, {
    timestamps: true
})

export default mongoose.model('user', userSchema)
