
import { classifyReport } from "../../../../services/ai-engine/src/classify-report.js";

export function handleIncomingText(text: string) {
  const value = text.trim();

  if (!value) {
    return {
      intent: "UNKNOWN",
      reply: "Please send a message describing what you need.",
    };
  }

  if (/^(hi|hello|hey)\b/i.test(value)) {
    return {
      intent: "GREETING",
      reply:
        "Welcome to Night-Owl Hub. You can ask about night travel or report a road issue.",
    };
  }

  if (/\b(report|blocked|flood|accident|unsafe|streetlight)\b/i.test(value)) {
    const classification = classifyReport(value);

    return {
      intent: "INCIDENT_REPORT",
      classification,
      reply:
        `Your message may describe a ${classification.type.toLowerCase().replaceAll("_", " ")}. ` +
        "This message has not been verified. Use the Night-Owl Hub report form to submit location details.",
    };
  }

  return {
    intent: "GENERAL",
    reply:
      "I can help with night travel or incident reporting. Tell me your request, and avoid sharing sensitive personal information.",
  };
}
