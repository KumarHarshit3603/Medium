// src/index.ts
import { Hono } from "hono";

// src/generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id       Int     @id @default(autoincrement())\n  name     String\n  username String  @unique\n  email    String  @unique\n  password String\n  blogs    Blogs[]\n}\n\nmodel Blogs {\n  id       Int    @id @default(autoincrement())\n  title    String\n  content  String\n  username String\n  user     User   @relation(fields: [username], references: [username])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"username","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"blogs","kind":"object","type":"Blogs","relationName":"BlogsToUser"}],"dbName":null},"Blogs":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"username","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"BlogsToUser"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","blogs","_count","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_avg","_sum","_min","_max","User.groupBy","User.aggregate","Blogs.findUnique","Blogs.findUniqueOrThrow","Blogs.findFirst","Blogs.findFirstOrThrow","Blogs.findMany","Blogs.createOne","Blogs.createMany","Blogs.createManyAndReturn","Blogs.updateOne","Blogs.updateMany","Blogs.updateManyAndReturn","Blogs.upsertOne","Blogs.deleteOne","Blogs.deleteMany","Blogs.groupBy","Blogs.aggregate","AND","OR","NOT","id","title","content","username","equals","in","notIn","lt","lte","gt","gte","contains","startsWith","endsWith","not","name","email","password","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "ZxYgCQQAAEEAIC4AAD4AMC8AAAkAEDAAAD4AMDECAAAAATQBAAAAAUABAEAAIUEBAAAAAUIBAEAAIQEAAAABACAIAwAAQwAgLgAAQgAwLwAAAwAQMAAAQgAwMQIAPwAhMgEAQAAhMwEAQAAhNAEAQAAhAQMAAGEAIAgDAABDACAuAABCADAvAAADABAwAABCADAxAgAAAAEyAQBAACEzAQBAACE0AQBAACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACAJBAAAQQAgLgAAPgAwLwAACQAQMAAAPgAwMQIAPwAhNAEAQAAhQAEAQAAhQQEAQAAhQgEAQAAhAQQAAGAAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAYEAABfACAxAgAAAAE0AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAEBCwAADgAgBTECAAAAATQBAAAAAUABAAAAAUEBAAAAAUIBAAAAAQELAAAQADABCwAAEAAwBgQAAFIAIDECAEoAITQBAEkAIUABAEkAIUEBAEkAIUIBAEkAIQIAAAABACALAAATACAFMQIASgAhNAEASQAhQAEASQAhQQEASQAhQgEASQAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACAFBQAATQAgGAAATgAgGQAAUQAgGgAAUAAgGwAATwAgCC4AAD0AMC8AABwAEDAAAD0AMDECADYAITQBADcAIUABADcAIUEBADcAIUIBADcAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAFAwAATAAgMQIAAAABMgEAAAABMwEAAAABNAEAAAABAQsAACQAIAQxAgAAAAEyAQAAAAEzAQAAAAE0AQAAAAEBCwAAJgAwAQsAACYAMAUDAABLACAxAgBKACEyAQBJACEzAQBJACE0AQBJACECAAAABQAgCwAAKQAgBDECAEoAITIBAEkAITMBAEkAITQBAEkAIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgBQUAAEQAIBgAAEUAIBkAAEgAIBoAAEcAIBsAAEYAIAcuAAA1ADAvAAAyABAwAAA1ADAxAgA2ACEyAQA3ACEzAQA3ACE0AQA3ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAcuAAA1ADAvAAAyABAwAAA1ADAxAgA2ACEyAQA3ACEzAQA3ACE0AQA3ACENBQAAOQAgGAAAPAAgGQAAOQAgGgAAOQAgGwAAOQAgNQIAAAABNgIAAAAENwIAAAAEOAIAAAABOQIAAAABOgIAAAABOwIAAAABPwIAOwAhDgUAADkAIBoAADoAIBsAADoAIDUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BADgAIQ4FAAA5ACAaAAA6ACAbAAA6ACA1AQAAAAE2AQAAAAQ3AQAAAAQ4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQA4ACEINQIAAAABNgIAAAAENwIAAAAEOAIAAAABOQIAAAABOgIAAAABOwIAAAABPwIAOQAhCzUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BADoAIQ0FAAA5ACAYAAA8ACAZAAA5ACAaAAA5ACAbAAA5ACA1AgAAAAE2AgAAAAQ3AgAAAAQ4AgAAAAE5AgAAAAE6AgAAAAE7AgAAAAE_AgA7ACEINQgAAAABNggAAAAENwgAAAAEOAgAAAABOQgAAAABOggAAAABOwgAAAABPwgAPAAhCC4AAD0AMC8AABwAEDAAAD0AMDECADYAITQBADcAIUABADcAIUEBADcAIUIBADcAIQkEAABBACAuAAA-ADAvAAAJABAwAAA-ADAxAgA_ACE0AQBAACFAAQBAACFBAQBAACFCAQBAACEINQIAAAABNgIAAAAENwIAAAAEOAIAAAABOQIAAAABOgIAAAABOwIAAAABPwIAOQAhCzUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BADoAIQNDAAADACBEAAADACBFAAADACAIAwAAQwAgLgAAQgAwLwAAAwAQMAAAQgAwMQIAPwAhMgEAQAAhMwEAQAAhNAEAQAAhCwQAAEEAIC4AAD4AMC8AAAkAEDAAAD4AMDECAD8AITQBAEAAIUABAEAAIUEBAEAAIUIBAEAAIUYAAAkAIEcAAAkAIAAAAAAAAUsBAAAAAQVLAgAAAAFRAgAAAAFSAgAAAAFTAgAAAAFUAgAAAAEFEgAAYwAgEwAAZgAgSAAAZAAgSQAAZQAgTgAAAQAgAxIAAGMAIEgAAGQAIE4AAAEAIAAAAAAACxIAAFMAMBMAAFgAMEgAAFQAMEkAAFUAMEoAAFYAIEsAAFcAMEwAAFcAME0AAFcAME4AAFcAME8AAFkAMFAAAFoAMAMxAgAAAAEyAQAAAAEzAQAAAAECAAAABQAgEgAAXgAgAwAAAAUAIBIAAF4AIBMAAF0AIAELAABiADAIAwAAQwAgLgAAQgAwLwAAAwAQMAAAQgAwMQIAAAABMgEAQAAhMwEAQAAhNAEAQAAhAgAAAAUAIAsAAF0AIAIAAABbACALAABcACAHLgAAWgAwLwAAWwAQMAAAWgAwMQIAPwAhMgEAQAAhMwEAQAAhNAEAQAAhBy4AAFoAMC8AAFsAEDAAAFoAMDECAD8AITIBAEAAITMBAEAAITQBAEAAIQMxAgBKACEyAQBJACEzAQBJACEDMQIASgAhMgEASQAhMwEASQAhAzECAAAAATIBAAAAATMBAAAAAQQSAABTADBIAABUADBKAABWACBOAABXADAAAQQAAGAAIAMxAgAAAAEyAQAAAAEzAQAAAAEFMQIAAAABNAEAAAABQAEAAAABQQEAAAABQgEAAAABAgAAAAEAIBIAAGMAIAMAAAAJACASAABjACATAABnACAHAAAACQAgCwAAZwAgMQIASgAhNAEASQAhQAEASQAhQQEASQAhQgEASQAhBTECAEoAITQBAEkAIUABAEkAIUEBAEkAIUIBAEkAIQIEBgIFAAMBAwABAQQHAAAAAAUFAAgYAAkZAAoaAAsbAAwAAAAAAAUFAAgYAAkZAAoaAAsbAAwBAwABAQMAAQUFABEYABIZABMaABQbABUAAAAAAAUFABEYABIZABMaABQbABUGAgEHCAEICwEJDAEKDQEMDwENEQQOEgUPFAEQFgQRFwYUGAEVGQEWGgQcHQcdHg0eHwIfIAIgIQIhIgIiIwIjJQIkJwQlKA4mKgInLAQoLQ8pLgIqLwIrMAQsMxAtNBY"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/index.ts
import { PrismaPg } from "@prisma/adapter-pg";

// ../../../../../node_modules/@hono/node-server/dist/index.mjs
import { createServer as createServerHTTP } from "http";
import { Http2ServerRequest as Http2ServerRequest2 } from "http2";
import { Http2ServerRequest } from "http2";
import { Readable } from "stream";
import crypto from "crypto";
var RequestError = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "RequestError";
  }
};
var toRequestError = (e) => {
  if (e instanceof RequestError) {
    return e;
  }
  return new RequestError(e.message, { cause: e });
};
var GlobalRequest = global.Request;
var Request = class extends GlobalRequest {
  constructor(input, options) {
    if (typeof input === "object" && getRequestCache in input) {
      input = input[getRequestCache]();
    }
    if (typeof options?.body?.getReader !== "undefined") {
      ;
      options.duplex ??= "half";
    }
    super(input, options);
  }
};
var newHeadersFromIncoming = (incoming) => {
  const headerRecord = [];
  const rawHeaders = incoming.rawHeaders;
  for (let i = 0; i < rawHeaders.length; i += 2) {
    const { [i]: key, [i + 1]: value } = rawHeaders;
    if (key.charCodeAt(0) !== /*:*/
    58) {
      headerRecord.push([key, value]);
    }
  }
  return new Headers(headerRecord);
};
var wrapBodyStream = /* @__PURE__ */ Symbol("wrapBodyStream");
var newRequestFromIncoming = (method, url, headers, incoming, abortController) => {
  const init = {
    method,
    headers,
    signal: abortController.signal
  };
  if (method === "TRACE") {
    init.method = "GET";
    const req = new Request(url, init);
    Object.defineProperty(req, "method", {
      get() {
        return "TRACE";
      }
    });
    return req;
  }
  if (!(method === "GET" || method === "HEAD")) {
    if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) {
      init.body = new ReadableStream({
        start(controller) {
          controller.enqueue(incoming.rawBody);
          controller.close();
        }
      });
    } else if (incoming[wrapBodyStream]) {
      let reader;
      init.body = new ReadableStream({
        async pull(controller) {
          try {
            reader ||= Readable.toWeb(incoming).getReader();
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(value);
            }
          } catch (error) {
            controller.error(error);
          }
        }
      });
    } else {
      init.body = Readable.toWeb(incoming);
    }
  }
  return new Request(url, init);
};
var getRequestCache = /* @__PURE__ */ Symbol("getRequestCache");
var requestCache = /* @__PURE__ */ Symbol("requestCache");
var incomingKey = /* @__PURE__ */ Symbol("incomingKey");
var urlKey = /* @__PURE__ */ Symbol("urlKey");
var headersKey = /* @__PURE__ */ Symbol("headersKey");
var abortControllerKey = /* @__PURE__ */ Symbol("abortControllerKey");
var getAbortController = /* @__PURE__ */ Symbol("getAbortController");
var requestPrototype = {
  get method() {
    return this[incomingKey].method || "GET";
  },
  get url() {
    return this[urlKey];
  },
  get headers() {
    return this[headersKey] ||= newHeadersFromIncoming(this[incomingKey]);
  },
  [getAbortController]() {
    this[getRequestCache]();
    return this[abortControllerKey];
  },
  [getRequestCache]() {
    this[abortControllerKey] ||= new AbortController();
    return this[requestCache] ||= newRequestFromIncoming(
      this.method,
      this[urlKey],
      this.headers,
      this[incomingKey],
      this[abortControllerKey]
    );
  }
};
[
  "body",
  "bodyUsed",
  "cache",
  "credentials",
  "destination",
  "integrity",
  "mode",
  "redirect",
  "referrer",
  "referrerPolicy",
  "signal",
  "keepalive"
].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    get() {
      return this[getRequestCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    value: function() {
      return this[getRequestCache]()[k]();
    }
  });
});
Object.setPrototypeOf(requestPrototype, Request.prototype);
var newRequest = (incoming, defaultHostname) => {
  const req = Object.create(requestPrototype);
  req[incomingKey] = incoming;
  const incomingUrl = incoming.url || "";
  if (incomingUrl[0] !== "/" && // short-circuit for performance. most requests are relative URL.
  (incomingUrl.startsWith("http://") || incomingUrl.startsWith("https://"))) {
    if (incoming instanceof Http2ServerRequest) {
      throw new RequestError("Absolute URL for :path is not allowed in HTTP/2");
    }
    try {
      const url2 = new URL(incomingUrl);
      req[urlKey] = url2.href;
    } catch (e) {
      throw new RequestError("Invalid absolute URL", { cause: e });
    }
    return req;
  }
  const host = (incoming instanceof Http2ServerRequest ? incoming.authority : incoming.headers.host) || defaultHostname;
  if (!host) {
    throw new RequestError("Missing host header");
  }
  let scheme;
  if (incoming instanceof Http2ServerRequest) {
    scheme = incoming.scheme;
    if (!(scheme === "http" || scheme === "https")) {
      throw new RequestError("Unsupported scheme");
    }
  } else {
    scheme = incoming.socket && incoming.socket.encrypted ? "https" : "http";
  }
  const url = new URL(`${scheme}://${host}${incomingUrl}`);
  if (url.hostname.length !== host.length && url.hostname !== host.replace(/:\d+$/, "")) {
    throw new RequestError("Invalid host header");
  }
  req[urlKey] = url.href;
  return req;
};
var responseCache = /* @__PURE__ */ Symbol("responseCache");
var getResponseCache = /* @__PURE__ */ Symbol("getResponseCache");
var cacheKey = /* @__PURE__ */ Symbol("cache");
var GlobalResponse = global.Response;
var Response2 = class _Response {
  #body;
  #init;
  [getResponseCache]() {
    delete this[cacheKey];
    return this[responseCache] ||= new GlobalResponse(this.#body, this.#init);
  }
  constructor(body, init) {
    let headers;
    this.#body = body;
    if (init instanceof _Response) {
      const cachedGlobalResponse = init[responseCache];
      if (cachedGlobalResponse) {
        this.#init = cachedGlobalResponse;
        this[getResponseCache]();
        return;
      } else {
        this.#init = init.#init;
        headers = new Headers(init.#init.headers);
      }
    } else {
      this.#init = init;
    }
    if (typeof body === "string" || typeof body?.getReader !== "undefined" || body instanceof Blob || body instanceof Uint8Array) {
      ;
      this[cacheKey] = [init?.status || 200, body, headers || init?.headers];
    }
  }
  get headers() {
    const cache = this[cacheKey];
    if (cache) {
      if (!(cache[2] instanceof Headers)) {
        cache[2] = new Headers(
          cache[2] || { "content-type": "text/plain; charset=UTF-8" }
        );
      }
      return cache[2];
    }
    return this[getResponseCache]().headers;
  }
  get status() {
    return this[cacheKey]?.[0] ?? this[getResponseCache]().status;
  }
  get ok() {
    const status = this.status;
    return status >= 200 && status < 300;
  }
};
["body", "bodyUsed", "redirected", "statusText", "trailers", "type", "url"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    get() {
      return this[getResponseCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    value: function() {
      return this[getResponseCache]()[k]();
    }
  });
});
Object.setPrototypeOf(Response2, GlobalResponse);
Object.setPrototypeOf(Response2.prototype, GlobalResponse.prototype);
async function readWithoutBlocking(readPromise) {
  return Promise.race([readPromise, Promise.resolve().then(() => Promise.resolve(void 0))]);
}
function writeFromReadableStreamDefaultReader(reader, writable, currentReadPromise) {
  const cancel = (error) => {
    reader.cancel(error).catch(() => {
    });
  };
  writable.on("close", cancel);
  writable.on("error", cancel);
  (currentReadPromise ?? reader.read()).then(flow, handleStreamError);
  return reader.closed.finally(() => {
    writable.off("close", cancel);
    writable.off("error", cancel);
  });
  function handleStreamError(error) {
    if (error) {
      writable.destroy(error);
    }
  }
  function onDrain() {
    reader.read().then(flow, handleStreamError);
  }
  function flow({ done, value }) {
    try {
      if (done) {
        writable.end();
      } else if (!writable.write(value)) {
        writable.once("drain", onDrain);
      } else {
        return reader.read().then(flow, handleStreamError);
      }
    } catch (e) {
      handleStreamError(e);
    }
  }
}
function writeFromReadableStream(stream, writable) {
  if (stream.locked) {
    throw new TypeError("ReadableStream is locked.");
  } else if (writable.destroyed) {
    return;
  }
  return writeFromReadableStreamDefaultReader(stream.getReader(), writable);
}
var buildOutgoingHttpHeaders = (headers) => {
  const res = {};
  if (!(headers instanceof Headers)) {
    headers = new Headers(headers ?? void 0);
  }
  const cookies = [];
  for (const [k, v] of headers) {
    if (k === "set-cookie") {
      cookies.push(v);
    } else {
      res[k] = v;
    }
  }
  if (cookies.length > 0) {
    res["set-cookie"] = cookies;
  }
  res["content-type"] ??= "text/plain; charset=UTF-8";
  return res;
};
var X_ALREADY_SENT = "x-hono-already-sent";
if (typeof global.crypto === "undefined") {
  global.crypto = crypto;
}
var outgoingEnded = /* @__PURE__ */ Symbol("outgoingEnded");
var handleRequestError = () => new Response(null, {
  status: 400
});
var handleFetchError = (e) => new Response(null, {
  status: e instanceof Error && (e.name === "TimeoutError" || e.constructor.name === "TimeoutError") ? 504 : 500
});
var handleResponseError = (e, outgoing) => {
  const err = e instanceof Error ? e : new Error("unknown error", { cause: e });
  if (err.code === "ERR_STREAM_PREMATURE_CLOSE") {
    console.info("The user aborted a request.");
  } else {
    console.error(e);
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "Content-Type": "text/plain" });
    }
    outgoing.end(`Error: ${err.message}`);
    outgoing.destroy(err);
  }
};
var flushHeaders = (outgoing) => {
  if ("flushHeaders" in outgoing && outgoing.writable) {
    outgoing.flushHeaders();
  }
};
var responseViaCache = async (res, outgoing) => {
  let [status, body, header] = res[cacheKey];
  let hasContentLength = false;
  if (!header) {
    header = { "content-type": "text/plain; charset=UTF-8" };
  } else if (header instanceof Headers) {
    hasContentLength = header.has("content-length");
    header = buildOutgoingHttpHeaders(header);
  } else if (Array.isArray(header)) {
    const headerObj = new Headers(header);
    hasContentLength = headerObj.has("content-length");
    header = buildOutgoingHttpHeaders(headerObj);
  } else {
    for (const key in header) {
      if (key.length === 14 && key.toLowerCase() === "content-length") {
        hasContentLength = true;
        break;
      }
    }
  }
  if (!hasContentLength) {
    if (typeof body === "string") {
      header["Content-Length"] = Buffer.byteLength(body);
    } else if (body instanceof Uint8Array) {
      header["Content-Length"] = body.byteLength;
    } else if (body instanceof Blob) {
      header["Content-Length"] = body.size;
    }
  }
  outgoing.writeHead(status, header);
  if (typeof body === "string" || body instanceof Uint8Array) {
    outgoing.end(body);
  } else if (body instanceof Blob) {
    outgoing.end(new Uint8Array(await body.arrayBuffer()));
  } else {
    flushHeaders(outgoing);
    await writeFromReadableStream(body, outgoing)?.catch(
      (e) => handleResponseError(e, outgoing)
    );
  }
  ;
  outgoing[outgoingEnded]?.();
};
var isPromise = (res) => typeof res.then === "function";
var responseViaResponseObject = async (res, outgoing, options = {}) => {
  if (isPromise(res)) {
    if (options.errorHandler) {
      try {
        res = await res;
      } catch (err) {
        const errRes = await options.errorHandler(err);
        if (!errRes) {
          return;
        }
        res = errRes;
      }
    } else {
      res = await res.catch(handleFetchError);
    }
  }
  if (cacheKey in res) {
    return responseViaCache(res, outgoing);
  }
  const resHeaderRecord = buildOutgoingHttpHeaders(res.headers);
  if (res.body) {
    const reader = res.body.getReader();
    const values = [];
    let done = false;
    let currentReadPromise = void 0;
    if (resHeaderRecord["transfer-encoding"] !== "chunked") {
      let maxReadCount = 2;
      for (let i = 0; i < maxReadCount; i++) {
        currentReadPromise ||= reader.read();
        const chunk = await readWithoutBlocking(currentReadPromise).catch((e) => {
          console.error(e);
          done = true;
        });
        if (!chunk) {
          if (i === 1) {
            await new Promise((resolve) => setTimeout(resolve));
            maxReadCount = 3;
            continue;
          }
          break;
        }
        currentReadPromise = void 0;
        if (chunk.value) {
          values.push(chunk.value);
        }
        if (chunk.done) {
          done = true;
          break;
        }
      }
      if (done && !("content-length" in resHeaderRecord)) {
        resHeaderRecord["content-length"] = values.reduce((acc, value) => acc + value.length, 0);
      }
    }
    outgoing.writeHead(res.status, resHeaderRecord);
    values.forEach((value) => {
      ;
      outgoing.write(value);
    });
    if (done) {
      outgoing.end();
    } else {
      if (values.length === 0) {
        flushHeaders(outgoing);
      }
      await writeFromReadableStreamDefaultReader(reader, outgoing, currentReadPromise);
    }
  } else if (resHeaderRecord[X_ALREADY_SENT]) {
  } else {
    outgoing.writeHead(res.status, resHeaderRecord);
    outgoing.end();
  }
  ;
  outgoing[outgoingEnded]?.();
};
var getRequestListener = (fetchCallback, options = {}) => {
  const autoCleanupIncoming = options.autoCleanupIncoming ?? true;
  if (options.overrideGlobalObjects !== false && global.Request !== Request) {
    Object.defineProperty(global, "Request", {
      value: Request
    });
    Object.defineProperty(global, "Response", {
      value: Response2
    });
  }
  return async (incoming, outgoing) => {
    let res, req;
    try {
      req = newRequest(incoming, options.hostname);
      let incomingEnded = !autoCleanupIncoming || incoming.method === "GET" || incoming.method === "HEAD";
      if (!incomingEnded) {
        ;
        incoming[wrapBodyStream] = true;
        incoming.on("end", () => {
          incomingEnded = true;
        });
        if (incoming instanceof Http2ServerRequest2) {
          ;
          outgoing[outgoingEnded] = () => {
            if (!incomingEnded) {
              setTimeout(() => {
                if (!incomingEnded) {
                  setTimeout(() => {
                    incoming.destroy();
                    outgoing.destroy();
                  });
                }
              });
            }
          };
        }
      }
      outgoing.on("close", () => {
        const abortController = req[abortControllerKey];
        if (abortController) {
          if (incoming.errored) {
            req[abortControllerKey].abort(incoming.errored.toString());
          } else if (!outgoing.writableFinished) {
            req[abortControllerKey].abort("Client connection prematurely closed.");
          }
        }
        if (!incomingEnded) {
          setTimeout(() => {
            if (!incomingEnded) {
              setTimeout(() => {
                incoming.destroy();
              });
            }
          });
        }
      });
      res = fetchCallback(req, { incoming, outgoing });
      if (cacheKey in res) {
        return responseViaCache(res, outgoing);
      }
    } catch (e) {
      if (!res) {
        if (options.errorHandler) {
          res = await options.errorHandler(req ? e : toRequestError(e));
          if (!res) {
            return;
          }
        } else if (!req) {
          res = handleRequestError();
        } else {
          res = handleFetchError(e);
        }
      } else {
        return handleResponseError(e, outgoing);
      }
    }
    try {
      return await responseViaResponseObject(res, outgoing, options);
    } catch (e) {
      return handleResponseError(e, outgoing);
    }
  };
};
var createAdaptorServer = (options) => {
  const fetchCallback = options.fetch;
  const requestListener = getRequestListener(fetchCallback, {
    hostname: options.hostname,
    overrideGlobalObjects: options.overrideGlobalObjects,
    autoCleanupIncoming: options.autoCleanupIncoming
  });
  const createServer = options.createServer || createServerHTTP;
  const server = createServer(options.serverOptions || {}, requestListener);
  return server;
};
var serve = (options, listeningListener) => {
  const server = createAdaptorServer(options);
  server.listen(options?.port ?? 3e3, options.hostname, () => {
    const serverInfo = server.address();
    listeningListener && listeningListener(serverInfo);
  });
  return server;
};

// src/index.ts
import "dotenv/config";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

// src/validation.ts
import { z } from "zod";
var signupschema = z.object(
  {
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    name: z.string()
  }
);
var signinschema = z.object({
  username: z.string(),
  password: z.string()
});

// src/index.ts
var app = new Hono();
app.use("*", async (c, next) => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
  });
  const prisma = new PrismaClient({ adapter });
  c.set("prisma", prisma);
  await next();
});
app.post("/app/v1/signup", async (c) => {
  const prisma = c.get("prisma");
  const userdata = await c.req.json();
  const valid = signupschema.safeParse(userdata);
  if (!valid.success) {
    return c.json({
      message: "invalid credentials"
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: userdata.name,
        username: userdata.username,
        email: userdata.email,
        password: await bcrypt.hash(userdata.password, 10)
      }
    });
    const token = await sign(userdata, process.env.JWT_SECRET || "");
    return c.json({
      message: "successfully signed up",
      token
    });
  } catch (e) {
    c.status(403);
    return c.text("error");
  }
});
app.post("/app/v1/signin", async (c) => {
  const prisma = c.get("prisma");
  const userdata = await c.req.json();
  const valid = signinschema.safeParse(userdata);
  if (!valid.success) {
    return c.json(
      {
        message: "invalid credentials"
      }
    );
  }
  try {
    const result = await prisma.user.findUnique({
      where: {
        username: userdata.username
      }
    });
    console.log(result);
    if (result) {
      const founduser = {
        name: result.name,
        username: result.username,
        email: result.email,
        password: result.password
      };
      const isMatch = await bcrypt.compare(userdata.password, founduser.password);
      if (!isMatch) {
        return c.text("wrong password");
      }
      const token = await sign(userdata, process.env.JWT_SECRET || "");
      return c.json({
        message: "successfully signed in",
        token
      });
    } else {
      return c.text("unable to sign in ");
    }
  } catch (e) {
    c.status(403);
    return c.text("some error happened");
  }
});
app.post("/app/v1/blog", async (c) => {
  const prisma = c.get("prisma");
  const userdata = await c.req.json();
  try {
    const result = await prisma.blogs.create({
      data: {
        username: userdata.username,
        title: userdata.title,
        content: userdata.content
      }
    });
    return c.json({
      message: "blog successfully posted"
    });
  } catch (e) {
    c.status(403);
    return c.text("error");
  }
});
app.put("/app/v1/blog", async (c) => {
  const prisma = c.get("prisma");
  const userdata = await c.req.json();
  try {
    const result = await prisma.blogs.update({
      where: {
        id: userdata.id
      },
      data: {
        title: userdata.title,
        content: userdata.content
      }
    });
    if (result) return c.json({ message: "updated successfully" });
    else return c.json({ message: "error" });
  } catch (e) {
    c.status(403);
    return c.json({ message: "error" });
  }
});
app.get("/app/v1/blogs", async (c) => {
  const prisma = c.get("prisma");
  try {
    const userdata = await prisma.blogs.findMany({});
    return c.json(userdata);
  } catch (e) {
    return c.text("couldnt connect to database");
  }
});
serve({
  fetch: app.fetch,
  port: 3e3
});
var index_default = app;
export {
  index_default as default
};
//# sourceMappingURL=index.js.map