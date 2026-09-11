/** Calls a resource route loader the way React Router would, treating a thrown Response as the response. */
export async function call<Args extends { request: Request; params: object }>(
  loader: (args: Args) => Response | Promise<Response>,
  url: string,
  params: Args["params"],
  headers: HeadersInit = {},
): Promise<Response> {
  const args = {
    request: new Request(url, { headers }),
    params,
    context: {},
  } as unknown as Args;
  try {
    return await loader(args);
  } catch (thrown) {
    if (thrown instanceof Response) {
      return thrown;
    }
    throw thrown;
  }
}

export const authorized = { Authorization: "Bearer test-app-secret" };
