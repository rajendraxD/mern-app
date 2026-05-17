export const requestLogger = (req, res, next) => {
  if (req.url === "/favicon.ico") {
    return next();
  }
  // human readable timestamp dd/mm/yyyy hh:mm:ss
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
  const url = req.url;
  const statusCode = res.statusCode;
  console.log(`[${timestamp}] ${statusCode || "Unknown"} ${method} ${url}`);
  next();
};

export const addTimeStamp = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};
