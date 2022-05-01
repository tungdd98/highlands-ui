import { camelCase, get, snakeCase } from "lodash";

// check if data is array
export const isArray = <T>(d: T): boolean => Array.isArray(d);

// check if data is object
export const isObject = <T>(d: T): boolean =>
  d === Object(d) && !isArray(d) && typeof d !== "function" && d !== null;

// convert object keys to camelCase
export function toCamel<T extends unknown>(
  d: T,
  filter = false
): T | Record<string, unknown> | undefined | null | string {
  if (isObject(d)) {
    const o: Record<string, unknown> = {};
    Object.keys(d as Record<string, unknown>).forEach(k => {
      o[camelCase(k)] = toCamel(get(d, k) as T, filter);
    });

    return o;
  }
  if (isArray(d)) {
    return (d as Array<unknown>).map((o: unknown) => toCamel(o, filter)) as T;
  }

  if (d === "") {
    return filter ? null : undefined;
  }

  if (d === null) {
    return "";
  }

  return d;
}

// convert object keys to snake_case
export function toSnakeCase<T extends unknown>(
  d: T,
  filter = false
): T | Record<string, unknown> | undefined {
  if (isObject(d)) {
    const o: Record<string, unknown> = {};
    Object.keys(d as Record<string, unknown>).forEach(k => {
      o[snakeCase(k)] = toSnakeCase(get(d, k) as T, filter);
    });

    return o;
  }
  if (isArray(d)) {
    return (d as Array<unknown>).map((o: unknown) =>
      toSnakeCase(o, filter)
    ) as T;
  }

  if (filter && d === "") {
    return undefined;
  }

  return d;
}
