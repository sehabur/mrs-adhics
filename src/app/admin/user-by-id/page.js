import React from "react";

import Users from "./Users";

export default async function Page({ searchParams }) {
  const id = (await searchParams).id;

  return (
    <>
      <Users id={id} />
    </>
  );
}
