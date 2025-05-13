import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { checkIsAdmin, checkLogin } from "../../../../middlewares/auth";
import { dbQuery } from "../../../../helpers/databaseHelper";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    const isAdmin = await checkIsAdmin(authToken);

    if (!isAdmin) {
      return NextResponse.json(
        { status: "success", message: "Invalid credential", data: null },
        { status: 401 }
      );
    }

    const users = await dbQuery(
      `SELECT id, emirates_id, email, otp_verification_status, user_type from users WHERE id=? LIMIT 1`,
      [id]
    );

    return NextResponse.json(
      { status: "success", message: "", data: users[0] },
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

export async function PATCH(request) {
  try {
    const { userId, requestId, otpVerificationStatus, userType } =
      await request.json();

    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    const isAdmin = await checkIsAdmin(authToken);

    if (!isAdmin) {
      return NextResponse.json(
        { status: "success", message: "Invalid credential", data: null },
        { status: 401 }
      );
    }

    await dbQuery(
      `UPDATE users SET otp_verification_status=?, user_type=? WHERE id=?`,
      [otpVerificationStatus, userType, userId]
    );

    await dbQuery(`UPDATE access_request SET request_status=? WHERE id=?`, [
      "resolved",
      requestId,
    ]);

    return NextResponse.json(
      { status: "success", message: "Update successful", data: null },
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
