// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

sentry.init({
  dsn: 'https://068bab59db02d51da9e1099e4c9ddd23@o4507989833285632.ingest.de.sentry.io/4508018481037392',
  integrations: [
    nodeProfilingIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0
})