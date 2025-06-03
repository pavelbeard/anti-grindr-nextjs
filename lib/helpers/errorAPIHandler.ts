import { AppError } from "./appError";

export function withErrorHandler(
  handler: (...args: any[]) => Promise<Response>
): (...args: any[]) => Promise<Response> {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof AppError) {
        return new Response(error.message, { status: error.statusCode });
      }
      console.error("Unexpected error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  };
}
