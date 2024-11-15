type MiddlewareResponse = Promise<void | Response>;

type MiddlewareNext = (error?: unknown) => MiddlewareResponse;

type Routes = {
  [path: string]: RouteHandler;
};

type RouteHandler = {
  [key in HTTPMethod]?: (ctx: AppContext) => Response;
};

type TypedContext<T extends string> = Required<Context> & {
  params: ExtractPathParams<T>;
};

interface AdjustedResponse extends Omit<Omit<Response, "body">, "headers"> {
  body: string;
  headers: HeaderObject | Headers;
}

type HTTPBody =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | object
  | undefined
  | null;

type MinRequest = {
  url?: string | URL;
  headers?: Headers;
  method?: string;
  body?: HTTPBody;
};

type HTTPBodyFunction = () => HTTPBody | Promise<HTTPBody>;

interface MinResponse {
  body?: HTTPBody | HTTPBodyFunction;
  end?: () => void;
  status?: number;
  send?: (body?: HTTPBody) => void;
  setHeader?: (name: string, value: string) => void;
  headers?: Headers;
}

interface SendOptions {
  root: string;
  [key: string]: string | boolean | Record<string, string> | string[] | number;
}

interface Context {
  req?: MinRequest;
  request?: MinRequest;
  resp?: MinResponse;
  response?: MinResponse;
  next?: MiddlewareNext;
  body?: HTTPBody | HTTPBodyFunction;
  send?: (options: SendOptions) => Promise<void | Response | string> | void | Response | string;
  url?: string | URL;
  method?: string;
}

interface AppContext {
  req: MinRequest; // the original request object
  resp: MinResponse; // the original response object
  next: MiddlewareNext; // the next function
  body: HTTPBody | HTTPBodyFunction; // the body of the response
  status: number; // the status of the response
  params: Record<string, string>; // the path parameters
  send: () => void | Response | Promise<Response>; // the send method that will return a response
  headers: Headers; // the headers of the response
  method: HTTPMethod; // the method of the request
}

interface Config {
  remoteMap: {
    [remoteBaseURL: string]: {
      [alias: string]: string;
    };
  };
  version: SemVer;
  basePath: "/" | `/${string}`;
}

type ExtractPathParams<T extends string> = T extends
  `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractPathParams<Rest>]: string }
  : T extends `${infer _Start}:${infer Param}` ? { [k in Param]: string }
  : Record<string | number | symbol, never>;
