import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import Rating from "./rating";
import useFeedbackStore from "@/store";
import { apiCreateFeedback } from "@/api-requests";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [rating, setRating] = useState(10);
  const store = useFeedbackStore();
  const minTextLength = 10;

  const textInputRef = useRef<HTMLInputElement>(null);

  const handleRatingSelect = (value: number) => {
    setRating(value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMessage(null);
    setText(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.setPageLoading(true);

    if (text.trim().length < minTextLength) {
      setMessage("Text must be at least 10 characters");
      store.setPageLoading(false);
      return;
    }

    const feedbackData = JSON.stringify({
      text: text,
      rating: rating,
    });

    try {
      const feedback = await apiCreateFeedback(feedbackData);
      store.addFeedback(feedback);
      store.setPageLoading(false);
      toast.info("Feedback added successfully");
      setText("");
      setRating(10);
      if (textInputRef.current) {
        textInputRef.current.value = "";
      }
    } catch (error: any) {
      toast.error(error.toString());
      console.error(error);
      store.setPageLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-700 rounded-lg p-8 my-5 relative">
      <header className="max-w-md mx-auto">
        <h2 className="text-center text-2xl font-bold">
          How would you rate your service with us?
        </h2>
      </header>
      <form onSubmit={onSubmit}>
        <Rating selected={rating} onchange={handleRatingSelect} />
        <div className="flex border rounded-lg my-4 px-2 py-3">
          <input
            type="text"
            ref={textInputRef}
            onInput={handleInput}
            className="flex-grow border-none text-lg focus:outline-none"
            placeholder="Tell us something that keeps you coming back"
          />
          <button
            type="submit"
            disabled={store.page_loading}
            className={twMerge(
              "border-0 rounded-md w-28 h-10 cursor-pointer hover:bg-indigo-500",
              store.page_loading
                ? "bg-[#ccc] text-gray-800"
                : "bg-indigo-600 text-white"
            )}
          >
            Send
          </button>
        </div>

        {message && (
          <div className="pt-3 text-center text-purple-600">{message}</div>
        )}
      </form>
    </div>
  );
}
