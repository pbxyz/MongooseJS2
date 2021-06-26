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
      // await opsWithDBs.findUpdateUser()
      // await opsWithDBs.editArray()
      // await opsWithDBs.sortLimitUser()
      await opsWithDBs.timeStampsValid()

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
        password,
        $inc: {
          updates: 1
        }
      },
      {
        upsert: true,
        new: true
      }
    )
    console.log('\nResult:\n', result)
  },

  editArray: async () => {
    const username = 'Ted'
    await userSchema.findOneAndUpdate(
      {
        email: 'test@email.com'
      },
      {
        username,
        // $pull: {
        //   nameHistory: username  // remove
        // }
        $addToSet: {
          nameHistory: username  // add no repeat
        }
        // $push: {
        //   nameHistory: username  // add
        // }
      }
    )
  },

  sortLimitUser: async () => {
    const results = await userSchema.find({})
      .sort({
        updates: -1
      })
      .limit(2)

    console.log('\nResults:\n', results)
  },

  timeStampsValid: async () => {
    const newUser = await new userSchema({
      email: 'test@email.com',
      username: 'Tom',
      password: 'Password1!',
      updates: 10
    })

    const valid = await new Promise(resolve => {
      newUser.validate(err => {
        if (err) {
          console.log('ERROR:', err)
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })

    if (valid) {
      await newUser.save()
      console.log('Saved new user')
    }

    // await userSchema.findOneAndUpdate({
    //   username: 'Tom',
    // }, {
    //   updates: 2,
    // })
  },

}
