import { Schema, model} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IHabit {
  name: string;
  color: string;
  activeDays: number[];
  user: Schema.Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const habitSchema = new Schema<IHabit>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  activeDays: { type: [Number], required: true},
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   } 
})

// 3. Create a Model.
export const Habit = model<IHabit>('Habit', habitSchema);
