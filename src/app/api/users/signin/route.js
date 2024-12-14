import { NextResponse } from "next/server";

import { dbQuery } from "../../../../helpers/databaseHelper";
import { decryptPassword, generateToken } from "../../../../helpers/apiHelper";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const userDataFromDb = await dbQuery(
      `SELECT * from users WHERE email = ? LIMIT 1`,
      [email]
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

    const passwordMatched = await decryptPassword(password, user.password);

    if (!passwordMatched) {
      return NextResponse.json(
        { status: "success", message: "Password does not match", data: null },
        { status: 401 }
      );
    }

    if (user.otp_verification_status != "verified") {
      return NextResponse.json(
        {
          status: "success",
          message: "User is not verified",
          data: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Login successful",
        data: {
          ...user,
          password: null,
          token: generateToken(user.id),
          isLoggedIn: true,
        },
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
