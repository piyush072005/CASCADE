
import { app } from "./app.js";

const port = Number(process.env.PORT || 4100);

app.listen(port, () => {
  console.log(`WhatsApp webhook listening on port ${port}`);
});
