/**
 * @module
 *
 * This module contains a CLI script for composing a YAML file from a folder into a unique file.
 *
 * @example
 * ```sh
 * deno run --allow-read --allow-write main.ts ./folder ./output.yaml
 * ```
 */
import * as path from "@std/path";
import { merge } from "@m3o/yaml";

/**
 * This function is the main function for the CLI script.
 */
function main() {
  let [folder, output] = Deno.args ?? [];
  if (!folder || !output) {
    console.error("You need to pass the folder and output file");
    Deno.exit(1);
  }

  const dirname = Deno.cwd();
  folder = path.resolve(dirname, folder);
  output = path.resolve(dirname, output);

  console.log(`Composing YAML file from ${folder}...`);
  merge({ path: folder, output });

  console.log(`YAML file composed (${output})! 🎉`);
  Deno.exit(0);
}

if (import.meta.main) main();
