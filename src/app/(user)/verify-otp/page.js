import React from "react";
import VerifyOtp from "./VerifyOtp";

export default async function Page({ searchParams }) {
  const id = (await searchParams).id;

  return (
    <div>
      <VerifyOtp id={id} />
    </div>
  );
}
