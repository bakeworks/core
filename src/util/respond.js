
/* respond.js
**
** Encapsulating reQuest/Response protocols.
**
** For use in both locally (eg functions calls) and
** remotely (eg http && socket requests).
**
*/

/*
https://en.wikipedia.org/wiki/HTTP_403

HTTP 403 provides a distinct error case from HTTP 401:

HTTP 401 is returned when the client has not authenticated,
and implies that a successful response may be returned following
valid authentication.

HTTP 403 is returned when the client is not permitted access to
the resource despite providing authentication such as insufficient
permissions of the authenticated account.

Error 403:
  "The server understood the request, but is refusing to authorize it.", RFC 7231[2]

Error 401:qr
  "The request requires user authentication. The response MUST include a WWW-Authenticate
  header field (section 14.47) containing a challenge applicable to the requested resource.
  The client MAY repeat the request with a suitable Authorization header field (section 14.8).
  If the request already included Authorization credentials, then the 401 response indicates
  that authorization has been refused for those credentials." RFC2616[1]

See "403 substatus error codes for IIS" for possible reasons of why the webserver
  is refusing to fulfill the request.
*/

import htmlUtil from './html'

const ERROR_CODES = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  ACCOUNT_NOT_ACTIVE: 'ACCOUNT_NOT_ACTIVE',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  USER_WITH_EMAIL_EXISTS: 'USER_WITH_EMAIL_EXISTS',
  INVALID_TOKEN: 'INVALID_TOKEN',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  MISSING_TOKEN: 'MISSING_TOKEN',
  INVALID_SCOPE: 'INVALID_SCOPE',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  DB_ERROR: 'DB_ERROR',
  MAILER_ERROR: 'MAILER_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  USER_NOT_AUTHORISED: 'USER_NOT_AUTHORISED'
}

const ERROR_LABELS = {
  [ERROR_CODES.INVALID_EMAIL]: 'Invalid email.',
  [ERROR_CODES.ACCOUNT_NOT_ACTIVE]: 'Account is not active.',
  [ERROR_CODES.INVALID_PASSWORD]: 'Invalid password.',
  [ERROR_CODES.USER_WITH_EMAIL_EXISTS]: 'An account with that email already exists.',
  [ERROR_CODES.INVALID_TOKEN]: 'Invalid authentication token.',
  [ERROR_CODES.EXPIRED_TOKEN]: 'Authentication token has expired.',
  [ERROR_CODES.MISSING_TOKEN]: 'Authentication token is missing.',
  [ERROR_CODES.INVALID_SCOPE]: 'Invalid scope in authentication token.',
  [ERROR_CODES.EXTERNAL_API_ERROR]: 'External API error.',
  [ERROR_CODES.DB_ERROR]: 'Database error.',
  [ERROR_CODES.MAILER_ERROR]: 'Mailer error.',
  [ERROR_CODES.SERVER_ERROR]: 'Internal server error.',
  [ERROR_CODES.USER_NOT_AUTHORISED]: 'User not authorised.',
}

const HTTP_CODES = {
  [ERROR_CODES.INVALID_EMAIL]: 401,
  [ERROR_CODES.ACCOUNT_NOT_ACTIVE]: 401,
  [ERROR_CODES.INVALID_PASSWORD]: 401,
  [ERROR_CODES.USER_WITH_EMAIL_EXISTS]: 401,
  [ERROR_CODES.INVALID_TOKEN]: 401,
  [ERROR_CODES.EXPIRED_TOKEN]: 401,
  [ERROR_CODES.MISSING_TOKEN]: 401,
  [ERROR_CODES.INVALID_SCOPE]: 401,

  [ERROR_CODES.USER_NOT_AUTHORISED]: 403, // forbidden

  [ERROR_CODES.EXTERNAL_API_ERROR]: 500,
  [ERROR_CODES.DB_ERROR]: 500,
  [ERROR_CODES.SERVER_ERROR]: 500,
}

function success(req, payload) {
  return {
    success: true,
    req,
    payload
  }
}

function error(req, code, details) {
  const res = {
    success: false,
    req,
    error: {
      code,
      details
    }
  }
  console.error(`core/qr/error : QR ERROR: ${JSON.stringify(res)}`)
  return res
}

function stackSuccess(req, prior) {
  return success(req, prior.payload)
}

function stackError(req, prior) {
  console.debug(`core/qr/stackError(req: ${req}, prior: ${JSON.stringify(prior)})`)
  return error(req, prior.error.code, prior.error.details)
}

function stack(req, prior) {
  return prior.success
    ? stackSuccess(req, prior)
    : stackError(req, prior)
}

function stringify(res) {
  return res.success
    ? `${res.req}: SUCCESS`
    : `${res.error.req}: ERROR : ${res.error ? res.error.code : 'NULL_ERROR'}`
}

function httpCode(response) {
  if (response.success) {
    return 200
  }
  const code = HTTP_CODE[response.error.code]
  if (!code) {
    console.debug('==============================================================================')
    console.debug(`bakeworks-core/util/response/httpCode(res.error: ${JSON.stringify(res.error)})`)
    console.debug('==============================================================================')
  }
  return code
}

/* routerResponse is expcted to behave as Express Router response object.
**
** options if given may specify:  { format: 'json' | 'html }
*/
function toRouter(routerResponse, response, options = {}) {
  const code = httpCode(response)
  const { format } = options
  if (response.success && format === 'html' ) {
    const html = htmlUtil.jsonToHtmlTable(response.payload)
    routerResponse.status(code).send(html)
  } else {
    routerResponse.status(code).send(response)
  }
}

export default  {
  ...ERROR_CODES, // splat to make usage concise
  ERROR_LABELS,
  HTTP_CODES,
  success,
  error,
  httpCode,
  stackSuccess,
  stackError,
  stack,
  stringify,
  toRouter
}
