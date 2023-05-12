import { apiDeleteFeedback } from "@/api-requests";
import useFeedbackStore from "@/store";
import { Feedback } from "@prisma/client";
import { MouseEvent, useCallback } from "react";
import { toast } from "react-toastify";

interface Props {
  feedback: Feedback;
}

function confirmDelete(message: string): boolean {
  return window.confirm(message);
}

export function FeedbackItem({ feedback }: Props): JSX.Element {
  const store = useFeedbackStore();

  const onDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const confirmed = confirmDelete(
        "Do you really want to delete this item?"
      );

      if (confirmed) {
        store.setPageLoading(true);
        apiDeleteFeedback(feedback.id)
          .then(() => {
            store.setPageLoading(false);
            toast.info("Feedback deleted successfully");
            store.deleteFeedback(feedback.id);
          })
          .catch((error: any) => {
            toast.error(error.toString());
            store.setPageLoading(false);
          });
      }
    },
    [feedback.id]
  );

  return (
    <div className="bg-white text-gray-700 rounded-lg p-8 my-5 relative">
      <div className="bg-pink-500 text-white rounded-full border-2 border-gray-200 w-12 h-12 flex items-center justify-center text-2xl font-bold absolute top-0 left-0 -mt-4 -ml-4">
        {feedback.rating}
      </div>
      <button
        type="button"
        className="absolute font-bold top-2 right-4 cursor-pointer bg-transparent border-none"
        onClick={onDelete}
      >
        X
      </button>
      <p>{feedback.text}</p>
    </div>
  );
}
