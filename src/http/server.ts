import { env } from "../env";
import app from "./app";

app.listen(env.PORT, () => {
  console.log(`🔥 Server running on ${env.BASE_URL}`);
});