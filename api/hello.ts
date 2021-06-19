import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "../deps.ts";

// deno-lint-ignore require-await
export async function handler(
  event: APIGatewayProxyEventV2,
  _context: Context,
): Promise<APIGatewayProxyResultV2> {
  console.log("[hello] got request!");
  return {
    statusCode: 200,
    headers: { "content-type": "text/html;charset=utf8" },
    body: JSON.stringify({
      message: `Welcome to deno ${Deno.version.deno} 🦕`,
      input: event,
    }),
  };
}
