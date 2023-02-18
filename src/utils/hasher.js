import crypto from "crypto";

const hasher = (password, salt) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

export { hasher };
