import { regExpUtils } from "@/utils";

export const getURL = (paths: string[], index: number): string => {
  // If params contain IDs or dynamic variables then we need to add them into the URL
  // So if the next param in the path array after current index has numeric characters then its dynamic so we
  // add it into the slice
  if (regExpUtils.containNumber(paths?.[index + 1] || "")) {
    return `/${paths.slice(0, index + 2).join("/")}`;
  }
  // Otherwise we don't add it if its only string
  return `/${paths.slice(0, index + 1).join("/")}`;
};
