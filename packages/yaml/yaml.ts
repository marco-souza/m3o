import { execSync } from "@m3o/results";

type Options = {
  /**
   * The path to the folder containing the YAML files
   */
  path: string;
  /**
   * The output file
   */
  output: string;
};

/**
 * This function receives a path and output file to compose a yaml file
 *
 * ```ts
 * import { yamlCompose } from "jsr:@m3o/yaml-mere";
 *
 * merge({
 *   path: "./folder",
 *   output: "./output.yaml"
 * });
 * ```
 */
export function merge(opts: Options) {
  const yamlFilesRes = execSync(() => {
    const allFiles = Deno.readDirSync(opts.path);
    const yamlFiles = Array.from(allFiles).filter((file) =>
      file.name.endsWith(".yaml") || file.name.endsWith(".yml")
    );
    return yamlFiles;
  });

  if (yamlFilesRes.error) {
    console.error("No directory found", opts);
    return;
  }

  const yamlFiles = yamlFilesRes.result;

  // open or create
  const outputFile = Deno.openSync(opts.output, {
    write: true,
    create: true,
  });

  const header = `# Composed YAML file generated usinng folder: ${opts.path}\n`;
  const headerRes = execSync(() =>
    outputFile.writeSync(new TextEncoder().encode(header))
  );
  if (headerRes.error) {
    console.error(headerRes);
    return;
  }

  for (const idx in yamlFiles) {
    const yaml = yamlFiles[idx];
    const fullPath = `${opts.path}/${yaml.name}`;
    const header = `# from file: ${fullPath}\n`;

    const contentResult = execSync(() => Deno.readTextFileSync(fullPath));
    if (contentResult.error) {
      console.error(contentResult);
      continue;
    }

    if (contentResult.result === "") {
      continue;
    }

    let separator = "\n---\n";
    if (idx === String(yamlFiles.length - 1)) {
      separator = "\n";
    }

    const outputFileRes = execSync(() =>
      outputFile.writeSync(
        new TextEncoder().encode(
          `${header}${contentResult.result}${separator}`,
        ),
      )
    );
    if (outputFileRes.error) {
      console.error(outputFileRes);
      continue;
    }
  }
}
