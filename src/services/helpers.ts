import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IUser } from "../types/IUser";

interface WrongDataError {
  error: {
    data: {
      errors: {
        [key: string]: string;
      };
    };
  };
}

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isWrongDataError(obj: unknown): obj is WrongDataError {
  return (
    typeof obj === "object" &&
    obj != null &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (obj as any).error === "object"
  );
}

export function extractError(obj: unknown): string {
  if (isFetchBaseQueryError(obj)) {
    if (obj.status === "FETCH_ERROR" || obj.status === "PARSING_ERROR") {
      return obj.error;
    }
  }

  return "Something went wrong";
}

export function clearUser() {
  localStorage.removeItem("user");
}

export function saveUser(user: IUser) {
  localStorage.setItem("user", user.token);
}

export function loadUser(): string | null {
  const item = localStorage.getItem("user");
  if (!item) return null;

  return item;
}
