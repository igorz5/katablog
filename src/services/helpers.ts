import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IUser } from "../types/IUser";

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isWrongDataError(
  obj: unknown
): obj is { error: { data: { errors: { [key: string]: string } } } } {
  return (
    typeof obj === "object" &&
    obj != null &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (obj as any).error === "object"
  );
}

export function isErrorWithMessage(error: unknown): error is {
  data: {
    errors: {
      message: string;
    };
  };
} {
  return (
    typeof error === "object" &&
    error != null &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).data.errors.message === "string"
  );
}

export function extractError(error: unknown): string {
  return isErrorWithMessage(error)
    ? error.data.errors.message
    : "Something went wrong";
}

export function saveUser(user: IUser) {
  localStorage.setItem("user", user.token);
}

export function loadUser(): IUser | null {
  const item = localStorage.getItem("user");
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
}
