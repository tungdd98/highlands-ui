import { get } from "lodash";

import { isArray, isObject } from "./convert-object-keys";

export type ObjectType = {
  [key: string]: unknown;
};

export function trimValue<T extends unknown>(d: T): T | ObjectType {
  if (typeof d === "string") {
    return d.trim() as T;
  }

  if (isObject(d)) {
    const o: ObjectType = {};
    Object.keys(d as Record<string, unknown>).forEach(k => {
      o[k] = trimValue(get(d, k) as T);
    });

    return o;
  }

  if (isArray(d)) {
    return (d as Array<unknown>).map((i: unknown) => trimValue(i)) as T;
  }

  return d;
}
