"use client"

import { ResponsiveContainer } from "recharts"
import AppLineChart from "./lineChart"

type overviewprops = {
  setAllTemperatures: (data: number[]) => void, setTemperature: (data: number) => void, setPressure: (data: number) => void, setWindVelocity: (data: number) => void, setHumidity: (data: number) => void,
}

export function Overview({ setAllTemperatures, setTemperature, setPressure, setWindVelocity, setHumidity }: overviewprops) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AppLineChart setAllTemperatures={setAllTemperatures} setToDayTemperature={setTemperature} setToDayPressure={setPressure} setToDayWindVelocity={setWindVelocity} setToDayHumidity={setHumidity} />
    </ResponsiveContainer>
  )
}
