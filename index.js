const express = require("express");
const vapidKeys = require("./keys.json");
const webPush = require("web-push");
const _ = require("lodash");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

webPush.setVapidDetails(
  "mailto:info@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscriptions = [];

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  if (!_.some(subscriptions, subscription)) {
    subscriptions.push(subscription);
  }

  res.status(201).json({
    message: "subscription added successfully.",
  });
});

app.post("/push", (req, res) => {
  const notification = req.body.notification;

  Promise.all(
    subscriptions.map((sub) =>
      webPush.sendNotification(sub, JSON.stringify(notification))
    )
  )
    .then(() =>
      res.json({
        message: "notifications sent successfully.",
      })
    )
    .catch(() =>
      res.status(500).json({
        message: "Server error.",
      })
    );
});

app.listen(3000, () => console.log("Server started on port 3000"));
