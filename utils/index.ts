
export const only = <T>(x: T | T[]) => Array.isArray(x) ? x[0] : x;
export const more = <T>(x?: T | T[]) => x === undefined ? [] : Array.isArray(x) ? x : [x];
