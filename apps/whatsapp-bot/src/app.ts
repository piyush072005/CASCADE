
import express from "express";
import { handleIncomingText } from "./services/message-handler.js";

export const app = express();
app.use(express.json({ limit: "1mb" }));

const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    verifyToken &&
    token === verifyToken &&
    typeof challenge === "string"
  ) {
    res.status(200).send(challenge);
    return;
  }

  res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  // Acknowledge quickly. Add signature verification before production use.
  res.sendStatus(200);

  try {
    const entries = req.body?.entry ?? [];

    for (const entry of entries) {
      for (const change of entry.changes ?? []) {
        const messages = change.value?.messages ?? [];

        for (const message of messages) {
          if (message.type !== "text") continue;

          const result = handleIncomingText(message.text?.body ?? "");
          console.log("WhatsApp message classified", {
            messageId: message.id,
            intent: result.intent,
          });

          // Do not log the sender's full message or private location.
          // A production version should send result.reply using Meta's API.
        }
      }
    }
  } catch (error) {
    console.error("Webhook processing failed", error);
  }
});
