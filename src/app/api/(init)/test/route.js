import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { dbQuery } from "../../../../helpers/databaseHelper";
import { checkLogin } from "../../../../middlewares/auth";
import { sendMailToUser } from "../../../../helpers/mailHelper";

export async function GET(request) {
  try {
    const mailBody = `<html><body><h3>New Account Creation</h3><p>Use the below OTP for account creration.</p><h1>11111</h1><br/>If you face any difficulties or need any assistance please contact us at <a href="mailto:kuetianshub@gmail.com">kuetianshub@gmail.com</a></p></body></html>`;

    const data = await sendMailToUser("sehabur@gmail.com", "Test", mailBody);

    return NextResponse.json(
      { status: "success", message: "", data },
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
