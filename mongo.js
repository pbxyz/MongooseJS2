import mongoose from 'mongoose'
const mongoPath = 'mongodb://root:pass@localhost:27017/test-db?authSource=admin'

export default async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return mongoose
}
