import { Feedback } from "@prisma/client";
import { create } from "zustand";

type initialState = {
  page_loading: boolean;
  setPageLoading: (loading: boolean) => void;
  feedbacks: Feedback[];
  addFeedback: (feedback: Feedback) => void;
  setFeedbackList: (feedbacks: Feedback[]) => void;
  deleteFeedback: (id: string) => void;
};

const useFeedbackStore = create<initialState>((set) => ({
  page_loading: false,
  feedbacks: [],
  setPageLoading: (loading: boolean) =>
    set((state) => ({ ...state, page_loading: loading })),
  addFeedback: (feedback: Feedback) =>
    set((state) => ({
      ...state,
      feedbacks: [feedback, ...state.feedbacks],
    })),
  setFeedbackList: (feedbacks: Feedback[]) =>
    set((state) => ({ ...state, feedbacks })),
  deleteFeedback: (id: string) =>
    set((state) => ({
      ...state,
      feedbacks: state.feedbacks.filter((feedback) => feedback.id != id),
    })),
}));

export default useFeedbackStore;
