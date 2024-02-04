export function generateRandomString(bytes: number) {
  // if (import.meta.env.NEXT_RUNTIME === "nodejs") {
  //   const crypto = require("crypto");
  //   return crypto.randomBytes(bytes).toString("hex");
  // }

  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return [...array].map((b) => b.toString(16).padStart(2, "0")).join("");
}
