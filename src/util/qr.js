/* qr.js
**
** Encapsulating reQuest/Response protocols.
**
** For use in both locally (eg functions calls) and
** remotely (eg http && socket requests).
**
*/

// TODO: this must be same as client src/lib/errors.js
// TODO: should be in common module

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

const TAG = {
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

const ERROR = {

  ...TAG,

  LABEL: {
    [TAG.INVALID_EMAIL]: 'Invalid email.',
    [TAG.ACCOUNT_NOT_ACTIVE]: 'Account is not active.',
    [TAG.INVALID_PASSWORD]: 'Invalid password.',
    [TAG.USER_WITH_EMAIL_EXISTS]: 'An account with that email already exists.',
    [TAG.INVALID_TOKEN]: 'Invalid authentication token.',
    [TAG.EXPIRED_TOKEN]: 'Authentication token has expired.',
    [TAG.MISSING_TOKEN]: 'Authentication token is missing.',
    [TAG.INVALID_SCOPE]: 'Invalid scope in authentication token.',
    [TAG.EXTERNAL_API_ERROR]: 'External API error.',
    [TAG.DB_ERROR]: 'Database error.',
    [TAG.MAILER_ERROR]: 'Mailer error.',
    [TAG.SERVER_ERROR]: 'Internal server error.',
    [TAG.USER_NOT_AUTHORISED]: 'User not authorised.',
  },

  HTTP_CODE: {
    [TAG.INVALID_EMAIL]: 401,
    [TAG.ACCOUNT_NOT_ACTIVE]: 401,
    [TAG.INVALID_PASSWORD]: 401,
    [TAG.USER_WITH_EMAIL_EXISTS]: 401,
    [TAG.INVALID_TOKEN]: 401,
    [TAG.EXPIRED_TOKEN]: 401,
    [TAG.MISSING_TOKEN]: 401,
    [TAG.INVALID_SCOPE]: 401,

    [TAG.USER_NOT_AUTHORISED]: 403, // forbidden

    [TAG.EXTERNAL_API_ERROR]: 500,
    [TAG.DB_ERROR]: 500,
    [TAG.SERVER_ERROR]: 500,
  }
}

function success(req, payload) {
  return {
    success: true,
    req,
    payload
  }
}

function error(req, tag, details) {
  const res = {
    success: false,
    req,
    error: {
      tag,
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
  return error(req, prior.error.tag, prior.error.details)
}

function stack(req, prior) {
  return prior.success
    ? stackSuccess(req, prior)
    : stackError(req, prior)
}

function stringify(res) {
  return res.success
    ? `${res.req}: SUCCESS`
    : `${res.error.req}: ERROR : ${res.error ? res.error.tag : 'NULL_ERROR'}`
}

function httpCode(res) {
  const code = ERROR.HTTP_CODE[res.error.tag]
  if (!code) {
    console.log('==================================================')
    console.log(`core/qr/httpCode(res.error: ${JSON.stringify(res.error)})`)
    console.log('==================================================')
  }
  return code
}

function toRouter(routerResponse, requestResult) {
  const code = requestResult.success
    ? 200
    : httpCode(requestResult)
  routerResponse.status(code).send(requestResult)
}

export default {
  ERROR,
  success,
  error,
  httpCode,
  stackSuccess,
  stackError,
  stack,
  stringify,
  toRouter
}
