import mongoose from 'mongoose';


const tokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  token: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});


export default mongoose.model('tokenVerify', tokenSchema);
