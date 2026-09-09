import type { FieldErrors } from "./validation";

/**
 * Shape of the lead form's action state.
 *
 * This lives outside the `"use server"` module on purpose: a Server Actions
 * file may only export async functions, so a plain object exported from there
 * would arrive as `undefined` in the client component.
 */
export interface LeadFormState {
  status: "idle" | "success" | "error";
  message: string;
  errors: FieldErrors;
}

export const initialLeadFormState: LeadFormState = {
  status: "idle",
  message: "",
  errors: {},
};
