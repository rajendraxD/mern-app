import express from "express";
import { register } from "../controllers/user.controller.js";
import { validate } from "../middleware/InputValidator.middleware.js";
import { body } from "express-validator";

const router = express.Router();

router.get(
  "/register",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isString()
      .withMessage("Username must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Username must only contain letters")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email")
    //   .custom(async (value) => {
    //     const user = await UserModel.findOne({ email: value });
    //     if (user) {
    //       throw new Error("Email already in use");
    //     }
    //   }
    // )
    ,
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .isLength({ max: 20 })
      .withMessage("Password must be at most 20 characters long"),
  ],
  validate,
  register,
);
// router.get("/login",login);
// router.get("/logout",logout);

export default router;
