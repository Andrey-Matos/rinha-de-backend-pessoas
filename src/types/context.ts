export const contextVariables = {
  UUID: "uuid",
  CACHED: "cached",
} as const;

export type ContextVariables = Record<
  (typeof contextVariables)[keyof typeof contextVariables],
  string
>;
