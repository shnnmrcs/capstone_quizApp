import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizHistory: [
    {
      testID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tests',
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      dateTaken: { type: String, required: true },
    },
  ],
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
