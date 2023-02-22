import mongoose from 'mongoose';

const testsSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId, ref: 'tests' },
  name: { type: String, required: true },
  totalWeight: { type: Number, required: true },
  questionsList: [{
    type: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: { type: Number, required: true },
    weight: { type: Number, required: true },
    options: {
      type: [String],
      required: true
    },
  }],
});

const Test = mongoose.model('tests', testsSchema);
module.exports = Test;
