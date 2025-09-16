import mongoose from "mongoose";

const InterviewReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interviewMockId: {
    type: String,
    required: true,
  },
  overallPerformance: Number,
  voicePitch: String,
  communicationAbility: Number,
  mistakes: [String],
  correctionSuggestions: [String],
  overallRating: Number,
  suggestedEncouragements: [String],
  interviewDate: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export const InterviewReport = mongoose.model("InterviewReport", InterviewReportSchema);
