import Event from '../models/events.js';
import User from '../models/user.js';
import { hashPassword } from '../lib/hash_pwd.js';
export const resolvers = {
  events: async () => {
    const events = await Event.find({});
    return events.map(event => ({
      ...event._doc,
      _id: event._id.toString(),
      date: event.date instanceof Date ? event.date.toISOString() : event.date
    }));
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(args.eventInput.date)
    });
    await event.save();
    return event;
  },
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User already exists.');
      }
      const hashedPassword = await hashPassword(args.userInput.password);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const savedUser = await user.save();
      return savedUser;
    } catch (err) {
      throw err;
    }
  }
};
