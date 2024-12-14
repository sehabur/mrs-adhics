import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { dbQuery } from "../../../../helpers/databaseHelper";

import { checkLogin } from "../../../../middlewares/auth";

export async function GET(request) {
  try {
    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    const user = await checkLogin(authToken);

    if (!user) {
      return NextResponse.json(
        { status: "success", message: "Unauthorized", data: null },
        { status: 401 }
      );
    }

    const sql = `SELECT * from medical_report`;
    const values = [];
    const dataFromDb = await dbQuery(sql, values);

    return NextResponse.json(
      { status: "success", message: "", data: dataFromDb },
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
