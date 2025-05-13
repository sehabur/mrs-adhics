import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { checkIsAdmin, checkLogin } from "../../../../middlewares/auth";
import { dbQuery } from "../../../../helpers/databaseHelper";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    const isAdmin = await checkIsAdmin(authToken);

    if (!isAdmin) {
      return NextResponse.json(
        { status: "success", message: "Invalid credential", data: null },
        { status: 401 }
      );
    }

    const dataFromDb = await dbQuery(
      `SELECT * from access_request WHERE request_status=?`,
      [status]
    );

    return NextResponse.json(
      {
        status: "success",
        message: "",
        data: dataFromDb,
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
