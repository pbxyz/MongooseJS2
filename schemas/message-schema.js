import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    text: String,
})

export default mongoose.model('message', messageSchema, 'message')
