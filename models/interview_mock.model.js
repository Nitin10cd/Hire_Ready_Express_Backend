import mongoose from "mongoose";


// main interview mock schema here is the interview creation exists , which interview is created by  which users and the respective report of that interview
const InterviewMockSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ["manual", "resume_based"],
    required: true,
  },
  your_description: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  numberOfQuestions: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interviewReportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InterviewReport",
  },
}, { timestamps: true });

export const InterviewMock = mongoose.model("InterviewMock", InterviewMockSchema);
