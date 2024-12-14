import { NextResponse } from "next/server";
import {
  dbCreateAndPopulate,
  populateTableWithSampleData,
} from "../../../../helpers/databaseHelper";

export async function GET(request) {
  try {
    await dbCreateAndPopulate();
    // await populateTableWithSampleData();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
