import jwt from "jsonwebtoken";

import { dbQuery } from "../helpers/databaseHelper";

export async function checkLogin(authToken) {
  try {
    if (!authToken?.startsWith("Bearer")) {
      return null;
    }

    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return null;
    }

    const sql = `SELECT * from users WHERE id=? LIMIT 1`;
    const values = [decoded.id];
    const userDataFromDb = await dbQuery(sql, values);

    if (userDataFromDb.length == 0) {
      return null;
    }

    return { ...userDataFromDb[0], password: null };
  } catch (err) {
    return null;
  }
}

export async function checkIsAdmin(authToken) {
  const user = await checkLogin(authToken);
  if (user) {
    return user.user_type == "admin";
  } else {
    return false;
  }
}

export async function checkIsDoctor(authToken) {
  const user = await checkLogin(authToken);
  if (user) {
    return user.user_type == "doctor";
  } else {
    return false;
  }
}

export function getUserType(user) {
  return user.user_type;
}
