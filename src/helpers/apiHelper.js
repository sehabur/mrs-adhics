import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

export function generateToken(id) {
  return sign({ id }, process.env.JWT_SECRET, {});
}

export function encryptPassword(password) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

export async function decryptPassword(password, hash) {
  return compareSync(password, hash);
}
