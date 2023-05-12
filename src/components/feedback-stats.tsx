import useFeedbackStore from "@/store";
import { useMemo } from "react";

export default function FeedbackStats() {
  const store = useFeedbackStore();
  const feedbacks = store.feedbacks;
  const count = useMemo(() => feedbacks.length, [feedbacks]);
  const sum = useMemo(
    () => feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0),
    [feedbacks]
  );
  let average = useMemo(
    () => (count > 0 ? (sum / count).toFixed(2) : (0.0).toFixed(2)),
    [count, sum]
  );

  return (
    <div className="flex justify-between items-center mb-11 text-white">
      <h4>{count} Reviews</h4>
      <h4>Ratings Average: {average}</h4>
    </div>
  );
}
