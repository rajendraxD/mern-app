export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const RESPONSE_STATUS = {
  SUCCESS: "success",
  FAIL: "fail",
  ERROR: "error",
};

export const MESSAGES = {
  USER: {
    NOT_FOUND: "User not found",
    CREATED: "User registered successfully",
    UPDATED: "User updated successfully",
    DELETED: "User deleted successfully",
    ALL_DELETED: "All users deleted successfully",
    LOGGED_IN: "User logged in successfully",
    LOGGED_OUT: "User logged out successfully",
    INVALID_CREDENTIALS: "Invalid credentials",
    NOT_FOUND_WITH_ID: "User not found with this id.",
  },
  AUTH: {
    UNAUTHORIZED: "You are not authorized to access this resource",
    FORBIDDEN: "You do not have permission to perform this action",
    TOKEN_EXPIRED: "Your token has expired. Please log in again",
    INVALID_TOKEN: "Invalid token. Please log in again",
  },
  SERVER: {
    INTERNAL_ERROR: "Internal Server Error",
    ROUTE_NOT_FOUND: "Route not found",
  },
  ACCESS_TOKEN: {
    REFRESHED: "Access token refreshed successfully",
    NOT_FOUND: "Access token not found",
    INVALID: "Invalid access token",
    EXPIRED: "Access token expired",
    DECODE_FAILED: "Failed to decode access token",
  },
  REFRESH_TOKEN: {
    NOT_FOUND: "Refresh token not found",
    INVALID: "Invalid refresh token",
    EXPIRED: "Refresh token expired",
    DECODE_FAILED: "Failed to decode refresh token",
  },
  SESSION: {
    EXPIRED: "Session expired. Please login to continue.",
  },
  CORS: {
    NOT_ALLOWED: "Not allowed by CORS",
  },
  ROLE: {
    NOT_AUTHORIZED: "You are not authorized to access this resource",
    NOT_ALLOWED: (role) =>
      `Role: ${role.toUpperCase()} is not allowed to access this resource.`,
  },
};

export const COOKIES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};
