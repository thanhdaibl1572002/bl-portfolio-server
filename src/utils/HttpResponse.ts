import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'

class HttpResponse<T> {

  public statusCode: HttpStatusCode
  public statusText: HttpStatusText
  public message?: string
  public data?: T
  public headers: Record<string, string>
  public timeStamp?: string

  constructor(
    statusCode: HttpStatusCode, 
    statusText: HttpStatusText,
    message?: string,
    data?: T,
    headers: Record<string, string> = { 'Content-Type': 'application/json' }, 
    timeStamp: string = new Date().toLocaleString(),
  ) {
    this.statusCode = statusCode
    this.statusText = statusText
    this.message = message
    this.data = data
    this.headers = headers
    this.timeStamp = timeStamp
  }
 
  static continue<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.CONTINUE,
      HttpStatusText.CONTINUE,
      message,
      data,
    )
  }
  
  static switchingProtocols<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.SWITCHING_PROTOCOLS,
      HttpStatusText.SWITCHING_PROTOCOLS,
      message,
      data,
    )
  }
  
  static processing<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.PROCESSING,
      HttpStatusText.PROCESSING,
      message,
      data,
    )
  }

  static ok<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.OK,
      HttpStatusText.OK,
      message,
      data,
    )
  }
  
  static created<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.CREATED,
      HttpStatusText.CREATED,
      message,
      data,
    )
  }
  
  static accepted<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.ACCEPTED,
      HttpStatusText.ACCEPTED,
      message,
      data,
    )
  }
  
  static nonAuthoritativeInformation<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.NON_AUTHORITATIVE_INFORMATION,
      HttpStatusText.NON_AUTHORITATIVE_INFORMATION,
      message,
      data,
    )
  }
  
  static noContent<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.NO_CONTENT,
      HttpStatusText.NO_CONTENT,
      message,
      data,
    )
  }
  
  static resetContent<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.RESET_CONTENT,
      HttpStatusText.RESET_CONTENT,
      message,
      data,
    )
  }
  
  static partialContent<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.PARTIAL_CONTENT,
      HttpStatusText.PARTIAL_CONTENT,
      message,
      data,
    )
  }
  
  static multiStatus<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.MULTI_STATUS,
      HttpStatusText.MULTI_STATUS,
      message,
      data,
    )
  }
  
  static alreadyReported<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.ALREADY_REPORTED,
      HttpStatusText.ALREADY_REPORTED,
      message,
      data,
    )
  }
  
  static imUsed<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.IM_USED,
      HttpStatusText.IM_USED,
      message,
      data,
    )
  }

  
  static multipleChoices<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.MULTIPLE_CHOICES,
      HttpStatusText.MULTIPLE_CHOICES,
      message,
      data,
    )
  }
  
  static movedPermanently<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.MOVED_PERMANENTLY,
      HttpStatusText.MOVED_PERMANENTLY,
      message,
      data,
    )
  }
  
  static found<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.FOUND,
      HttpStatusText.FOUND,
      message,
      data,
    )
  }
  
  static seeOther<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.SEE_OTHER,
      HttpStatusText.SEE_OTHER,
      message,
      data,
    )
  }
  
  static notModified<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.NOT_MODIFIED,
      HttpStatusText.NOT_MODIFIED,
      message,
      data,
    )
  }
  
  static useProxy<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.USE_PROXY,
      HttpStatusText.USE_PROXY,
      message,
      data,
    )
  }
  
  static switchProxy<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.SWITCH_PROXY,
      HttpStatusText.SWITCH_PROXY,
      message,
      data,
    )
  }
  
  static temporaryRedirect<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.TEMPORARY_REDIRECT,
      HttpStatusText.TEMPORARY_REDIRECT,
      message,
      data,
    )
  }
  
  static permanentRedirect<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.PERMANENT_REDIRECT,
      HttpStatusText.PERMANENT_REDIRECT,
      message,
      data,
    )
  }

  
  static badRequest<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.BAD_REQUEST,
      HttpStatusText.BAD_REQUEST,
      message,
      data,
    )
  }
  
  static unauthorized<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.UNAUTHORIZED,
      HttpStatusText.UNAUTHORIZED,
      message,
      data,
    )
  }
  
  static paymentRequired<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.PAYMENT_REQUIRED,
      HttpStatusText.PAYMENT_REQUIRED,
      message,
      data,
    )
  }
  
  static forbidden<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.FORBIDDEN,
      HttpStatusText.FORBIDDEN,
      message,
      data,
    )
  }
  
  static notFound<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.NOT_FOUND,
      HttpStatusText.NOT_FOUND,
      message,
      data,
    )
  }
  
  static methodNotAllowed<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.METHOD_NOT_ALLOWED,
      HttpStatusText.METHOD_NOT_ALLOWED,
      message,
      data,
    )
  }
  
  static notAcceptable<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.NOT_ACCEPTABLE,
      HttpStatusText.NOT_ACCEPTABLE,
      message,
      data,
    )
  }
  
  static proxyAuthenticationRequired<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED,
      HttpStatusText.PROXY_AUTHENTICATION_REQUIRED,
      message,
      data,
    )
  }
  
  static requestTimeout<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.REQUEST_TIMEOUT,
      HttpStatusText.REQUEST_TIMEOUT,
      message,
      data,
    )
  }
  
  static conflict<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.CONFLICT,
      HttpStatusText.CONFLICT,
      message,
      data,
    )
  }
  
  static gone<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.GONE,
      HttpStatusText.GONE,
      message,
      data,
    )
  }
  
  static lengthRequired<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.LENGTH_REQUIRED,
      HttpStatusText.LENGTH_REQUIRED,
      message,
      data,
    )
  }
  
  static preconditionFailed<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.PRECONDITION_FAILED,
      HttpStatusText.PRECONDITION_FAILED,
      message,
      data,
    )
  }
  
  static payloadTooLarge<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.PAYLOAD_TOO_LARGE,
      HttpStatusText.PAYLOAD_TOO_LARGE,
      message,
      data,
    )
  }
  
  static uriTooLong<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.URI_TOO_LONG,
      HttpStatusText.URI_TOO_LONG,
      message,
      data,
    )
  }
  
  static unsupportedMediaType<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,
      HttpStatusText.UNSUPPORTED_MEDIA_TYPE,
      message,
      data,
    )
  }
  
  static rangeNotSatisfiable<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.RANGE_NOT_SATISFIABLE,
      HttpStatusText.RANGE_NOT_SATISFIABLE,
      message,
      data,
    )
  }
  
  static expectationFailed<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.EXPECTATION_FAILED,
      HttpStatusText.EXPECTATION_FAILED,
      message,
      data,
    )
  }
  
  static imATeapot<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.IM_A_TEAPOT,
      HttpStatusText.IM_A_TEAPOT,
      message,
      data,
    )
  }
  
  static misdirectedRequest<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.MISDIRECTED_REQUEST,
      HttpStatusText.MISDIRECTED_REQUEST,
      message,
      data,
    )
  }
  
  static unprocessableEntity<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.UNPROCESSABLE_ENTITY,
      HttpStatusText.UNPROCESSABLE_ENTITY,
      message,
      data,
    )
  }
  
  static locked<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.LOCKED,
      HttpStatusText.LOCKED,
      message,
      data,
    )
  }
  
  static failedDependency<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.FAILED_DEPENDENCY,
      HttpStatusText.FAILED_DEPENDENCY,
      message,
      data,
    )
  }
  
  static upgradeRequired<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.UPGRADE_REQUIRED,
      HttpStatusText.UPGRADE_REQUIRED,
      message,
      data,
    )
  }
  
  static preconditionRequired<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.PRECONDITION_REQUIRED,
      HttpStatusText.PRECONDITION_REQUIRED,
      message,
      data,
    )
  }
  
  static tooManyRequests<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.TOO_MANY_REQUESTS,
      HttpStatusText.TOO_MANY_REQUESTS,
      message,
      data,
    )
  }
  
  static requestHeaderFieldsTooLarge<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE,
      HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE,
      message,
      data,
    )
  }
  
  static unavailableForLegalReasons<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS,
      HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS,
      message,
      data,
    )
  }

  
  static internalServerError<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      HttpStatusText.INTERNAL_SERVER_ERROR,
      message,
      data,
    )
  }
  
  static notImplemented<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.NOT_IMPLEMENTED,
      HttpStatusText.NOT_IMPLEMENTED,
      message,
      data,
    )
  }
  
  static badGateway<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.BAD_GATEWAY,
      HttpStatusText.BAD_GATEWAY,
      message,
      data,
    )
  }
  
  static serviceUnavailable<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.SERVICE_UNAVAILABLE,
      HttpStatusText.SERVICE_UNAVAILABLE,
      message,
      data,
    )
  }
  
  static gatewayTimeout<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.GATEWAY_TIMEOUT,
      HttpStatusText.GATEWAY_TIMEOUT,
      message,
      data,
    )
  }
  
  static httpVersionNotSupported<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED,
      HttpStatusText.HTTP_VERSION_NOT_SUPPORTED,
      message,
      data,
    )
  }
  
  static variantAlsoNegotiates<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.VARIANT_ALSO_NEGOTIATES,
      HttpStatusText.VARIANT_ALSO_NEGOTIATES,
      message,
      data,
    )
  }
  
  static insufficientStorage<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.INSUFFICIENT_STORAGE,
      HttpStatusText.INSUFFICIENT_STORAGE,
      message,
      data,
    )
  }
  
  static loopDetected<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.LOOP_DETECTED,
      HttpStatusText.LOOP_DETECTED,
      message,
      data,
    )
  }
  
  static notExtended<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.NOT_EXTENDED,
      HttpStatusText.NOT_EXTENDED,
      message,
      data,
    )
  }
  
  static networkAuthenticationRequired<T>(message?: string, data?: T): HttpResponse<T> {
    return new HttpResponse<T>(
      HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED,
      HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED,
      message,
      data,
    )
  }

}

export default HttpResponse