import express from "express";

const router = express.Router();

router.get("/getUser",  (req, res) => {
  res.send("User route");
});

export default router;
