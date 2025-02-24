import { define } from "../../utils.ts";
import { JSDOM } from "jsdom";

const PROFILE_FETCH =
  "https://jsr.io/user/8acca4cb-387a-46bb-b269-485916ab7ae6";

export const handler = define.handlers({
  async GET(_ctx) {
    const res = await fetch(PROFILE_FETCH);
    const dom = new JSDOM(await res.text());
    const document = dom.window.document;

    const packages = Array.from(
      document.querySelectorAll(`ol > li > a`),
    ).map((pkg: any) => pkg?.textContent);

    return new Response(
      JSON.stringify(packages),
    );
  },
});
