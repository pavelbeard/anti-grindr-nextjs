import { AppError } from "./appError";

export function withErrorHandler(
  handler: (request: Request) => Promise<Response>
): (request: Request) => Promise<Response> {
  return async (request: Request) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof AppError) {
        return new Response(error.message, { status: error.statusCode });
      }
      console.error("Unexpected error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  };
}
