import mongoose, { Schema, model, connect, Types } from 'mongoose';

//Implementing AUTO INCREMENT with CounterSchema
const CounterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: {type: Number, required: true}
});

CounterSchema.methods.increment = async function() {
  this.seq += 1;
  return this.save();
};

const Counter = mongoose.model('Counter', CounterSchema);

Counter.findOneAndUpdate(
  { _id: 'userId' },
  { $inc: { seq: 1 } },
  { new: true, upsert: true }
)
.catch(console.error);

//---------------------------------------------------------//

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  userId : number;
  username: string;
  password: string;
  habits: Schema.Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<IUser>({
  userId: {type: Number},
  username: { type: String, required: true },
  password: { type: String, required: true },
  habits: [{
    type: Schema.Types.ObjectId,
    ref: 'Habit'
  }]
});

//Implementing ID AUTO INCREMENT 
UserSchema.pre('save', async function() {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { _id: 'userId' }, { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.userId = counter.seq;
  }
});

// 3. Create a Model.
export const User = model<IUser>('User', UserSchema);


