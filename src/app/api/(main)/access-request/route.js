import { NextResponse } from "next/server";

import { dbQuery } from "../../../../helpers/databaseHelper";

export async function POST(request) {
  try {
    const { name, emiratesId, email, jobTitle, workPlace, userId, accessType } =
      await request.json();

    const dataFromDb = await dbQuery(
      `INSERT INTO access_request (name, emirates_id, email, job_title, work_place, user_id, request_status, access_type)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        emiratesId,
        email,
        jobTitle,
        workPlace,
        userId,
        "pending",
        accessType,
      ]
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Submission success",
        data: dataFromDb,
      },
      { status: 201 }
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
