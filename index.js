import mongo from './mongo.js'
import userSchema from './schemas/user-schema.js'
import { passGen } from "./mylib.js"

const connectToMongoDB = async () => {
  await mongo().then(async (mongoose) => {
    try {
      console.log('Connected to mongodb!')

      // await opsWithDBs.saveUser()
      // await opsWithDBs.findUser()
      // await opsWithDBs.updateUser()
      // await opsWithDBs.deleteUser()
      await opsWithDBs.findUpdateUser()

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
    console.log('\nResult:\n', result)
  },

  updateUser: async () => {
    await userSchema.updateOne(
      {
        password: 'Password1!'
      },
      {
        password: passGen(3, 5, 5, 1, 0)
      }
    )

    // await userSchema.updateMany({},
    //   {
    //     password: 'Password1!'
    //   }
    // )
  },

  deleteUser: async () => {
    await userSchema.deleteMany(
      {
        email: 'test@email.com'
      }
    )
    // await userSchema.deleteOne(
    //   {
    //     username: 'Ted'
    //   }
    // )
  },

  findUpdateUser: async () => {
    const password = 'abc123'
    const result = await userSchema.findOneAndUpdate(
      {
        username: 'Ted'
      },
      {
        email: 'test@email.com',
        username: 'Ted',
        password
      },
      {
        upsert: true,
        new: true
      }
    )
    console.log('\nResult:\n', result)
  },

}
