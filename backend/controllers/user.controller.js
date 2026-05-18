import {
  ApiError,
  tryCatchHandler,
} from "../middleware/errorHandler.middleware.js";
import sanitize from "mongo-sanitize";
import axios from "axios";
export const register = tryCatchHandler(async (req, res) => {
  // const { username, email, password } = sanitize(req.body);

  const user = axios.get(`https://jsonplaceholder.typicode.com/users`);
  console.log(JSON.parse(JSON.stringify(user)));
  console.log('------------------');
  // res.status(201).json({
  //   status: "success",
  //   message: "User registered successfully",
  //   data: JSON.parse(JSON.stringify(user)),
  // });
});
