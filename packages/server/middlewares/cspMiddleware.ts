import { API_URL } from '../constants'
import { expressCspHeader, SELF, NONE, NONCE, INLINE } from 'express-csp-header'

export const cspMiddleware = () =>
  expressCspHeader({
    directives: {
      'default-src': [SELF, API_URL, 'ws://localhost:24678'],
      'font-src': [SELF],
      'media-src': [SELF],
      'object-src': [NONE],
      'script-src': [NONCE],
      'style-src': [SELF, INLINE],
      'worker-src': [SELF],
      'frame-ancestors': [NONE],
      'form-action': [NONE],
    },
  })