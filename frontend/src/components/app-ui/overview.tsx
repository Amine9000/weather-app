"use client"

import { ResponsiveContainer } from "recharts"
import AppLineChart from "./lineChart"

type overviewprops = {
  data: { time: string, real: number, prediction: number }[],
  min: number,
  max: number
}

export function Overview({ data, min, max }: overviewprops) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AppLineChart data={data} min={min} max={max} />
    </ResponsiveContainer>
  )
}
