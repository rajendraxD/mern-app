export const requestLogger = (req, res, next) => {
  if (req.url === "/favicon.ico") {
    return next();
  }

  // Start time
  const start = Date.now();

  res.on("finish", () => {
    // Human readable timestamp
    const timestamp = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const method = req.method;
    const url = req.originalUrl || req.url;
    const statusCode = res.statusCode;

    // Calculate response time
    const responseTime = `${Date.now() - start}ms`;

    // Log level based on status code
    const logLevel =
      statusCode >= 500
        ? "error"
        : statusCode >= 400
        ? "warn"
        : "info";

    console[logLevel](
      `[${timestamp}] ${statusCode} ${method} ${url} - ${responseTime}`
    );
  });

  next();
};

export const addTimeStamp = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};