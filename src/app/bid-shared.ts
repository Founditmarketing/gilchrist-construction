/* Shared bid-form types + initial state. Kept OUT of actions.ts because a
   "use server" module may only export async functions — exporting an object
   (BID_INITIAL) or a type from there breaks the whole server-actions module. */

export type BidState = {
  status: "idle" | "success" | "error";
  message: string;
  delivered: boolean;
  errors: Record<string, string>;
  values: Record<string, string>;
};

export const BID_INITIAL: BidState = {
  status: "idle",
  message: "",
  delivered: false,
  errors: {},
  values: {},
};
