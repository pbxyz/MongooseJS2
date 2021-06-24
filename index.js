import mongo from './mongo.js'
import userSchema from './schemas/user-schema.js'

const connectToMongoDB = async () => {
  await mongo().then(async (mongoose) => {
    try {
      console.log('Connected to mongodb!')

      // await opsWithDBs.saveUser()
      await opsWithDBs.findUser()

    } finally {
      mongoose.connection.close()
    }
  })
}
connectToMongoDB()

// <-----------------------------------------> //

const opsWithDBs = {

  saveUser: async () => {
    const user = {
      email: 'test@email.com',
      username: 'Ted',
      password: 'Password1!',
    }
    await new userSchema(user).save()
  },

  findUser: async () => {
    // const result = await userSchema.find({}) // all docs
    const result = await userSchema.findOne({ username: 'Bob' })
    console.log('\nResult:\n', result);
  }

}
