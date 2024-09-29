// Library

// Utils
import { Apis } from "@/utils/api";

// Interface
import { createReviewIFC } from "@/interfaces/reviewIFC";

export const createReviewApi = async (data: createReviewIFC) => {
    return await Apis.post("/review", data);
};
