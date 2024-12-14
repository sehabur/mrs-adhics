import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { checkLogin } from "../../../../middlewares/auth";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    const user = await checkLogin(authToken);

    if (!user || id != user.id) {
      return NextResponse.json(
        { status: "success", message: "Invalid request", data: null },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "", data: user },
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
