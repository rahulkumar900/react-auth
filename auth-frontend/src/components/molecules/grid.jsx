import React from "react";
import Card from "../atoms/card";
export default function Grid({ data = [] }) {
  return (
    <div className="grid  gap-4">
      {data.length ? (
        data.map((r, i) => <Card key={i} {...r} />)
      ) : (
        <div> No record found </div>
      )}
    </div>
  );
}
