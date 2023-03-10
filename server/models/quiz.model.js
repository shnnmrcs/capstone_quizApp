import mongoose from 'mongoose';

const quizzesSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId, ref: 'quiz' },
  testID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tests',
    required: true,
  },
  score: { type: Number, required: true },
  dateTaken: { type: String, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const Quiz = mongoose.model('quiz', quizzesSchema);
module.exports = Quiz;
