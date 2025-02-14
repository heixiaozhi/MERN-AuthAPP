const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'You need a name'],
    },
    email: {
      type: String,
      required: [true, 'You need a email'],
    },
    password: {
      type: String,
      required: [true, 'You need a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
