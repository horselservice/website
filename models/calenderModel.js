import { Schema, model, models } from "mongoose";

const calenderSchema = new Schema({
  timeOne: {
    value: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  timeTwo: {
    value: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  timeThree: {
    value: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  weekday: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const CalenderDay = models.CalenderDay || model("CalenderDay", calenderSchema);

export default CalenderDay;
