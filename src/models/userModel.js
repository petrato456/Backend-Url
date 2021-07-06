const bcrypt = require('bcryptjs');
const mongoose = require('../config/mongodb/mongo');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    token: {
      type: String,
      select: false,
    },
    tokenExpires: {
      type: String,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  console.log(this.password);
  const hashPass = await bcrypt.hash(this.password, 10);
  this.password = hashPass;

  next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;