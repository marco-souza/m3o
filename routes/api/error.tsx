import { define } from "../../utils.ts";
import { raise } from "@m3o/errors";

export const handler = define.handlers({
  GET(_ctx) {
    raise("Something went wrong");
  },
});
