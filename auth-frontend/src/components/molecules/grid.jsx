import React from "react";
import Card from "../atoms/card";
export default function Grid({ data = [] }) {
  console.log(data.length);
  return (
    <div>
      {data.length ? (
        data.map((r, i) => <Card key={i} {...r} />)
      ) : (
        <div> No record found </div>
      )}
    </div>
  );
}
