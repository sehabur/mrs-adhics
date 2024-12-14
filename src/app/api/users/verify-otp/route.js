import { NextResponse } from "next/server";

import { dbQuery } from "../../../../helpers/databaseHelper";
import { decryptPassword, generateToken } from "../../../../helpers/apiHelper";

export async function POST(request) {
  try {
    const { id, otp } = await request.json();

    const userDataFromDb = await dbQuery(
      `SELECT * from users WHERE id=? LIMIT 1`,
      [id]
    );

    if (userDataFromDb.length == 0) {
      return NextResponse.json(
        {
          status: "success",
          message: "User not found",
          data: null,
        },
        { status: 400 }
      );
    }

    const user = userDataFromDb[0];

    if (user.last_otp != otp) {
      return NextResponse.json(
        {
          status: "success",
          message: "OTP does not match",
          data: null,
        },
        { status: 401 }
      );
    }

    await dbQuery(`UPDATE users SET otp_verification_status = ? WHERE id = ?`, [
      "verified",
      id,
    ]);

    return NextResponse.json(
      {
        status: "success",
        message: "Signup successful",
        data: { ...user, password: null, token: generateToken(user.id) },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: error?.message || "Something went wrong",
        data: null,
      },
      { status: 500 }
    );
  }
}
