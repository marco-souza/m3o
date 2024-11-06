type Ok<T> = {
  /**
   * The result of the function
   */
  result: T;
  /**
   * The error of the function
   */
  error: null;
};

type Err<T> = {
  /**
   * The result of the function
   */
  result: null;
  /**
   * The error of the function
   */
  error: T;
};

type Result<T> = Ok<T> | Err<Error>;

/**
 * This function receives a function and returns a result
 *
 * ```ts
 * const result = execSync(() => 1);
 * console.log(result); // { result: 1, error: null }
 *
 * const errorResult = execSync(() => {
 *   throw new Error("error");
 *   return 1;
 * });
 * console.log(errorResult); // { result: null, error: Error: error }
 * ```
 *
 * @param func The function to execute
 * @returns The Result of the function
 */
export function execSync<T>(func: () => T): Result<T> {
  try {
    return { result: func(), error: null };
  } catch (e) {
    const error = e as Error;
    return { result: null, error };
  }
}

/**
 * This function receives a function and returns a result
 *
 * ```ts
 * const result = exec(async () => 1);
 * console.log(result); // { result: 1, error: null }
 *
 * const errorResult = execSync(async () => {
 *   throw new Error("error");
 *   return 1;
 * });
 * console.log(errorResult); // { result: null, error: Error: error }
 * ```
 *
 * @param func The function to execute
 * @returns The Result of the function
 */
export async function exec<T>(
  func: () => Promise<T>,
): Promise<Result<T>> {
  try {
    return { result: await func(), error: null };
  } catch (e) {
    const error = e as Error;
    return { result: null, error };
  }
}
