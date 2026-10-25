
import { app } from "./app.js";
import { env, validateEnv } from "./config/env.js";

validateEnv();

app.listen(env.port, () => {
  console.log(`Night-Owl API listening on port ${env.port}`);
});
