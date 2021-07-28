import mongo from './mongo.js'
import userSchema from './schemas/user-schema.js'
import messageSchema from './schemas/message-schema.js'
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
      // await opsWithDBs.timeStampsValid()
      // await opsWithDBs.collectionNames()
      // await opsWithDBs.withMany()
      await opsWithDBs.nestedDocuments()

    } finally {
      setTimeout(() => { mongoose.connection.close(() => console.log('DB Disconnected')) }, 2500)
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

  collectionNames: async () => {
    await new messageSchema({ text: 'hello world' })
      .save()
  },

  withMany: async () => {
    // await userSchema.insertMany([
    //   {
    //     email: 'test1@email.com',
    //     username: 'test 1',
    //     password: 'password',
    //   },
    //   {
    //     email: 'test2@email.com',
    //     username: 'test 2',
    //     password: 'password',
    //   },
    //   {
    //     email: 'test3@email.com',
    //     username: 'test 3',
    //     password: 'password',
    //   },
    // ])

    await userSchema.deleteMany({
      username: [
        'test 1',
        'test 2'
      ]
    })
  },

  nestedDocuments: async () => {
    // const email = 'test1@email.com'

    // await new userSchema({
    //   email,
    //   username: 'test 1',
    //   password: 'password',
    //   messages: [
    //     {
    //       userId: email,
    //       text: 'hello world1'
    //     },
    //     {
    //       userId: email,
    //       text: 'hello world2'
    //     },
    //     {
    //       userId: email,
    //       text: 'hello world3'
    //     },
    //   ],
    // }).save()

    const result = await userSchema.findOne({
      'messages.text': 'hello world2'
    })
    console.log('RESULT:', result);
  },

}
