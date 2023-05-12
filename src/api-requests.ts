import { Feedback } from "@prisma/client";

export type ErrorResponse = {
  status: string;
  message: string;
};
export type FeedbackListResponse = {
  status: string;
  results: number;
  feedbacks: Feedback[];
};

export type FeedbackResponse = {
  status: string;
  data: { feedback: Feedback };
};

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson
      ? data.message || response.statusText
      : response.statusText;
    throw new Error(message);
  }

  return data as T;
}

export async function apiCreateFeedback(
  feedbackData: string
): Promise<Feedback> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/feedbacks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: feedbackData,
  });

  return handleResponse<FeedbackResponse>(response).then(
    (data) => data.data.feedback
  );
}

export async function apiFetchSingleFeedback(
  feedbackId: string
): Promise<Feedback> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/feedbacks/${feedbackId}`
  );

  return handleResponse<FeedbackResponse>(response).then(
    (data) => data.data.feedback
  );
}

export async function apiFetchFeedbacks(
  page: number,
  limit: number
): Promise<Feedback[]> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/feedbacks?page=${page}&limit=${limit}`
  );

  return handleResponse<FeedbackListResponse>(response).then(
    (data) => data.feedbacks
  );
}

export async function apiDeleteFeedback(feedbackId: string): Promise<void> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/feedbacks/${feedbackId}`,
    {
      method: "DELETE",
    }
  );

  if (response.status !== 204) {
    const errorResponse: ErrorResponse = await response.json();
    if (errorResponse) {
      throw new Error(errorResponse.message);
    } else {
      throw new Error(`API error: ${response.status}`);
    }
  }
}
