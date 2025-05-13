import { NextResponse } from "next/server";
import { headers } from "next/headers";

import fs from "fs";
import path from "path";

import { checkIsDoctor } from "../../../../middlewares/auth";
import { dbQuery } from "../../../../helpers/databaseHelper";

import { DateTime } from "luxon";

function generateFileName() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  const todayDate = DateTime.now().toFormat("dd-MM-yyyy"); // Format: 12-02-2025
  return `report_${randomNumber}_${todayDate}.pdf`;
}

export async function POST(request) {
  try {
    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    const isDoctor = await checkIsDoctor(authToken);

    if (!isDoctor) {
      return NextResponse.json(
        { status: "success", message: "Invalid credential", data: null },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const reportId = formData.get("report_id");

    console.log("first22", reportId);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Define the upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = generateFileName();

    const fileLocation = "/uploads/" + fileName;

    // Save the file
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, fileBuffer);

    const dataFromDb = await dbQuery(
      `INSERT INTO medical_report_pdf_location (pdf_location, report_id)
                VALUES (?, ?)`,
      [fileLocation, reportId]
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Upload success",
        filePath: `/uploads/${file.name}`,
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
