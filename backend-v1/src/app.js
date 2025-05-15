import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import v1Routes from './api/v1/index.js';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import errorMiddleware from './utils/middlewares/error-middleware.js'
import cors from 'cors';
import compression from 'compression';
dotenv.config();
const app = express();

// Enable CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }));

/*
Helmet is a Node.js middleware that sets secure HTTP headers to protect your Express apps 
from well-known web vulnerabilities.
Here are some real-time examples of what helmet does in a Node.js/Express app:

⸻

🔐 1. Prevents Clickjacking

// Sets X-Frame-Options: DENY
app.use(helmet.frameguard({ action: 'deny' }));

✅ Blocks your site from being loaded in an iframe on another domain.

⸻

🧠 2. Hides Technology Stack

// Removes X-Powered-By: Express
app.use(helmet.hidePoweredBy());

✅ Prevents attackers from knowing you’re using Express (reduces attack surface).

⸻

🔐 3. Prevents XSS Attacks

// Sets Content-Security-Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted.cdn.com']
  }
}));

✅ Blocks inline scripts or untrusted script sources — mitigating cross-site scripting.

⸻

🛡️ 4. Sets Secure Referrer Policy

app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

✅ Controls how much referrer info is sent with requests to other sites.

⸻

🔒 5. Forces HTTPS via HSTS

app.use(helmet.hsts({ maxAge: 31536000 }));

✅ Tells browsers to only use HTTPS for your site for 1 year.


*/


app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
// here we consume the middleware
// app.use(middleware)

/*
app.use(compression()) in an Express.js app is used to reduce the size of 
HTTP responses using Gzip or Brotli compression, which helps:

🚀 Benefits:
	1.	Faster page loads → Compresses HTML, CSS, JS, JSON, etc.
	2.	Lower bandwidth usage → Saves server resources.
	3.	Improves Lighthouse scores → Better SEO & Core Web Vitals.
	4.	Improves mobile performance → Especially on slower networks.
*/
// Compression
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/v1', v1Routes); // prefix the version of api 

// 404 Middleware
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.originalUrl}`,
    });
  });

// Error handling middleware
app.use(errorMiddleware);

export default app;