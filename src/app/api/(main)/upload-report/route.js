import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { checkIsDoctor, checkLogin } from "../../../../middlewares/auth";
import { dbQuery } from "../../../../helpers/databaseHelper";

export async function POST(request) {
  try {
    const {
      patientId,
      age,
      gender,
      location,
      medicalCondition,
      treatmentResult,
    } = await request.json();

    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    // const checkIsDoctor = await checkIsAdmin(authToken);

    // if (!checkIsDoctor) {
    //   return NextResponse.json(
    //     { status: "success", message: "Invalid credential", data: null },
    //     { status: 401 }
    //   );
    // }

    const dataFromDb = await dbQuery(
      `INSERT INTO medical_report (patient_id, age, gender, location, medical_condition, treatment_result)
                  VALUES (?, ?, ?, ?, ?, ?)`,
      [
        Number(patientId),
        age,
        gender,
        location,
        medicalCondition,
        treatmentResult,
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
