/* Shared application-form types + initial state. Kept OUT of apply-actions.ts
   because a "use server" module may only export async functions — exporting an
   object or type from there breaks the whole server-actions module. */

export type ApplyState = {
  status: "idle" | "success" | "error";
  message: string;
  delivered: boolean;
  errors: Record<string, string>;
  values: Record<string, string>;
};

export const APPLY_INITIAL: ApplyState = {
  status: "idle",
  message: "",
  delivered: false,
  errors: {},
  values: {},
};
