import { setupWorker } from "msw/browser";
import { categoryMock, reviewsById } from "./mockingHandler";

const handlers = [reviewsById,categoryMock];

export const worker = setupWorker(...handlers);