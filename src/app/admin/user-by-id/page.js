import React from "react";

import Users from "./Users";

export default async function Page({ searchParams }) {
  const userId = (await searchParams).user_id;
  const requestId = (await searchParams).request_id;

  return (
    <>
      <Users requestId={requestId} userId={userId} />
    </>
  );
}
