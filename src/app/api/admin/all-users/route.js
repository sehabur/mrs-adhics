import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { checkIsAdmin, checkLogin } from "../../../../middlewares/auth";
import { dbQuery } from "../../../../helpers/databaseHelper";

export async function GET(request) {
  try {
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
      `SELECT id, emirates_id, email, otp_verification_status, user_type from users order by created_at desc`,
      []
    );

    return NextResponse.json(
      { status: "success", message: "", data: users },
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
