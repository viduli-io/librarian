import { Param, PostDataCommon, Request as HarFormatRequest } from 'har-format'
import HTTPSnippet, { Options } from 'httpsnippet'
import { UrlWithParsedQuery } from 'node:url'
import stringifyObject from 'stringify-object'

/**
 * HTTPSnippet v3 types
 * Copied from: https://github.com/Kong/httpsnippet/blob/master/src/httpsnippet.ts
 * TODO: When upstream releases these changes, delete this bit and import the types
 * directly
 */
type PostDataBase = PostDataCommon & {
  text?: string;
  params?: Param[];
};

export type HarRequest = Omit<HarFormatRequest, 'postData'> & { postData: PostDataBase };

type ReducedHelperObject = Record<string, string[] | string>

export interface RequestExtras {
  postData: PostDataBase & {
    jsonObj?: ReducedHelperObject;
    paramsObj?: ReducedHelperObject;
    boundary?: string;
  };
  fullUrl: string;
  queryObj: ReducedHelperObject;
  headersObj: ReducedHelperObject;
  uriObj: UrlWithParsedQuery;
  cookiesObj: ReducedHelperObject;
  allHeaders: ReducedHelperObject;
}

type Request = HarRequest & RequestExtras;

type Transformer = (source: Request, options: Options) => string

const transformer: Transformer = (source, options) => {
  const { headersObj, postData } = source

  if (!postData?.jsonObj) {
    delete headersObj['Content-Type']
  }

  const formattedHeaders = stringifyObject(headersObj, {
    indent: '  ',
  }).replace(/\n/g, '\n  ')

  const formattedBody = postData?.jsonObj
    ? stringifyObject(postData.jsonObj, {
      indent: '  ',
    }).replace(/\n/g, '\n  ')
    : undefined

  const formattedParams = stringifyObject(source.queryObj, { indent: '  ' })
  // Object.entries().map(([key, value]) => [key, Array.isArray(value) ? value.join(', ') : value])

  return [
    `const params = new URLSearchParams(${formattedParams})`,
    `const res = await fetch('${source.url}?' + params.toString(), {`,
    `  method: '${source.method}',`,
    `  headers: ${formattedHeaders || '{}'},`,
    formattedBody && `  body: JSON.stringify(${formattedBody || '{}'})`,
    `})`,
    'const data = await res.json()',
  ].filter(Boolean).join('\n')
}

const fetchAsync = Object.assign(transformer, {
  info: {
    key: 'async-await',
    title: 'async/await',
  },
})

// HTTPSnippet v2 types are outdated
// @ts-ignore
HTTPSnippet.addTargetClient('javascript', fetchAsync)

HTTPSnippet.addTarget({
  info: {
    key: 'typescript',
    title: 'TypeScript',
    extname: 'ts',
    default: 'Fetch',
  },
  Fetch: fetchAsync,
} as any)

const axiosTransformer: Transformer = (source, options) => {

  const axiosOptions = stringifyObject({
    method: source.method,
    url: source.url,
    params: source.queryObj,
    headers: source.headersObj,
    data: source.postData.jsonObj,
  }, {
    indent: '  ',
  }).replace(/\n/g, '\n  ')

  return `
import axios from 'axios'

axios
  .request(${axiosOptions})
  .then(response => console.log(response.data))
  .catch(error => console.error(error))
`
}

const axiosTs = Object.assign(axiosTransformer, {
  info: {
    key: 'axios',
    title: 'Axios',
  },
})

// @ts-ignore
HTTPSnippet.addTargetClient('typescript', axiosTs)
