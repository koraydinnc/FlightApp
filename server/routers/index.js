const express = require("express");
const router = express.Router();
const userRouter = require('./user')


router.get("/", (req, res) => {
    res.send("api");
});


router.use("/user", userRouter);


module.exports = router;
