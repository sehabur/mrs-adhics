import { NextResponse } from "next/server";

import { dbQuery } from "../../../../helpers/databaseHelper";
import { encryptPassword } from "../../../../helpers/apiHelper";
import { sendOtpMailToUser } from "../../../../helpers/mailHelper";

function generateSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export async function POST(request) {
  try {
    const { emiratesId, email, password } = await request.json();

    const otp = generateSixDigitNumber();

    const sql = `INSERT INTO users (emirates_id, email, password, last_otp, otp_verification_status, user_type)
                  VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
      emiratesId || "",
      email,
      encryptPassword(password),
      otp,
      "pending",
      "default",
    ];

    const dataFromDb = await dbQuery(sql, values);

    const data = await sendOtpMailToUser(email, otp);

    if (!data?.messageId) {
      return NextResponse.json(
        {
          status: "fail",
          message: "OTP sending failed",
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Verification OTP sent to your email address",
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
