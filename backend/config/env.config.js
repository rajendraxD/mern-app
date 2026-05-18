const getEnv = (name, defaultValue) => {
  const value = process.env[name] || defaultValue;
  if (!value) {
    console.error(`Environment variable ${name} is not defined`);
    process.exit(1);
  }
  return value;
};

const env = {
  //   APP_NAME: getEnv("APP_NAME"),
  NODE_ENV: getEnv("NODE_ENV"),
  PORT: getEnv("PORT", 5000),

  MONGODB_URL: getEnv("MONGODB_URL"),
  DB_NAME: getEnv("DB_NAME"),
  
  FRONTEND_URL: getEnv("FRONTEND_URL"),

  //Redis
  REDIS_ENABLED: getEnv("REDIS_ENABLED", false).toLowerCase() === "true",
  REDIS_URL: getEnv("REDIS_URL"),
  
  //Access token
  // ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
  // ACCESS_TOKEN_EXPIRE: getEnv("ACCESS_TOKEN_EXPIRE"),
  // ACCESS_TOKEN_COOKIE_EXPIRE: getEnv("ACCESS_TOKEN_COOKIE_EXPIRE"),

  //Refresh token
  // REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
  // REFRESH_TOKEN_EXPIRE: getEnv("REFRESH_TOKEN_EXPIRE"),
  // REFRESH_TOKEN_COOKIE_EXPIRE: getEnv("REFRESH_TOKEN_COOKIE_EXPIRE"),
};

export default env;
