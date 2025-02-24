import { define } from "../../utils.ts";
import { raise } from "@m3o/errors";

export const handler = define.handlers({
  GET(ctx) {
    setTimeout(() => {
      raise("Something went wrong");
    }, 100);

    return Response.redirect("/error", 302);
  },
});
