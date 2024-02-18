import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type AppLineChartprops = {
    setAllTemperatures: (data: number[]) => void, setToDayTemperature: (data: number) => void, setToDayPressure: (data: number) => void, setToDayWindVelocity: (data: number) => void, setToDayHumidity: (data: number) => void,
}

export default function AppLineChart({ setAllTemperatures, setToDayTemperature, setToDayPressure, setToDayWindVelocity, setToDayHumidity }: AppLineChartprops) {
    const [max, setMax] = useState<number>();
    const [data, setData] = useState<{ time: string, real: number, prediction: number }[]>();
    useEffect(() => {
        async function fetchData() {
            const data = await fetch("http://127.0.0.1:8000/");
            const dataArr = await data.json();
            const len = dataArr[0].length;
            setMax(Math.round(Math.max(...dataArr[0], ...dataArr[1])) + 10)
            const newArr = [];
            setToDayTemperature(Math.round(dataArr[1][0]));
            setToDayPressure(12);
            setToDayWindVelocity(20);
            setToDayHumidity(17);
            setAllTemperatures(dataArr[1]);
            for (let i = 0; i < len; i++) {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + i);
                const formattedDate = `${days[currentDate.getDay()]} ${currentDate.getDate()}`;
                newArr.push({ time: formattedDate, real: Math.round(dataArr[0][i]), prediction: Math.round(dataArr[1][i]) });
            }
            setData(newArr)
        }
        fetchData();
    }, [])
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="prediction" domain={[0, max as number]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={"prediction"} stroke="#fcd34d" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={"real"} stroke="#374151" />
            </LineChart>
        </ResponsiveContainer>
    );
}