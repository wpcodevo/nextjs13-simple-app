import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { FeedbackItem } from "./feedback-item";
import { apiFetchFeedbacks } from "@/api-requests";
import useFeedbackStore from "@/store";

const FeedbackList: React.FC = () => {
  const store = useFeedbackStore();
  const feedbackList = store.feedbacks;

  const fetchFeedbacks = async () => {
    const page = 1;
    const limit = 10;

    store.setPageLoading(true);

    try {
      const feedbacks = await apiFetchFeedbacks(page, limit);
      store.setFeedbackList(feedbacks);
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
    }

    store.setPageLoading(false);
  };

  useEffect(() => {
    fetchFeedbacks();
    window.addEventListener("focus", fetchFeedbacks);
    return () => {
      window.removeEventListener("focus", fetchFeedbacks);
    };
  }, []);

  return (
    <div>
      {feedbackList.map((feedback) => {
        const key = feedback.id.toString();
        return <FeedbackItem key={key} feedback={feedback} />;
      })}

      {feedbackList.length === 0 && (
        <p className="max-w-md mx-auto py-6 text-center text-lg rounded-md bg-white">
          No feebacks found
        </p>
      )}
    </div>
  );
};

export default FeedbackList;
