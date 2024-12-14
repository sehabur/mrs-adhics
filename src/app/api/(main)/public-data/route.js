import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { dbQuery } from "../../../../helpers/databaseHelper";
import { checkLogin } from "../../../../middlewares/auth";

export async function POST(request) {
  try {
    const { ageMin, ageMax, gender, medicalCondition, location } =
      await request.json();

    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    const user = await checkLogin(authToken);

    // if (!user) {
    //   return NextResponse.json(
    //     { status: "success", message: "Invalid request", data: null },
    //     { status: 401 }
    //   );
    // }

    const dataFromDb = await dbQuery(
      `SELECT * from medical_report WHERE (age BETWEEN ? AND ?) AND gender=? AND medical_condition=? AND location=?`,
      [ageMin, ageMax, gender, medicalCondition, location]
    );

    if (dataFromDb.length == 0) {
      return NextResponse.json(
        {
          status: "success",
          message: "No data found matching your request",
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Data fetch successful",
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
