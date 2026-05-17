import cors from "cors";

export default function configureCors() {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", //local development
        "https://your-production-domain.com", //production domain
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow requests with no origin (like mobile apps or curl) and from allowed origins
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, // Allow cookies and authentication headers
    preflightContinue: false, // Pass the CORS preflight response to the next handler
    maxAge: 600, // Cache preflight response for 10 minutes (600 seconds)
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  });
}
