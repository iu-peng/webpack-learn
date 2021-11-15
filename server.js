const express = require("express");

const app = express();

app.get("/api/data", (req, res) => {
  res.json({
    info: "数据来了",
  });
});

app.listen("9990");
