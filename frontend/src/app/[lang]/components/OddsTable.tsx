"use client";
import { ReactNode } from "react";
import { Odds } from".../../../lib/api";
function OddsTable({ oddsItem, home, away, points }: OddsTableProps) {
  const { away_team, bookmakers, home_team } = oddsItem;
  const startTime = new Date(oddsItem.commence_time).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (!points) {
    return (
      <div className="m-5 flex flex-col shadow-lg">
        <h2 className="text-3xl">
          {home_team} vs {away_team}
        </h2>
        <p className="text-cyan-700 text-sm">{startTime}</p>
        <div className="p-3">
          <span>{home_team}</span>
          <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
            {home}
          </div>
        </div>
        <div className="p-3">
          <span>{away_team}</span>
          <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
            {away}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="m-5 flex flex-col shadow-lg">
      <h2 className="text-3xl">
        {home_team} vs {away_team}
      </h2>
      <p className="text-cyan-700 text-sm">{startTime}</p>
      <div className="p-3">
        <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
          {points}
        </div>
      </div>
    </div>
  );
}

export default OddsTable;

interface OddsTableProps {
  oddsItem: Odds;
  home?: ReactNode;
  away?: ReactNode;
  points?: ReactNode;
}
