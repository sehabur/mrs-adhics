import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { checkIsAdmin, checkLogin } from "../../../../middlewares/auth";
import { dbQuery } from "../../../../helpers/databaseHelper";

export async function POST(request) {
  try {
    const { requestStatus } = await request.json();

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
      `INSERT INTO access_request (request_status)
                  VALUES (?)`,
      [requestStatus]
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Update success",
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
