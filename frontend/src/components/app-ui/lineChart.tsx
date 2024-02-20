import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


type AppLineChartprops = {
    data: { time: string, real: number, prediction: number }[],
    min: number,
    max: number
}

export default function AppLineChart({ data, min, max }: AppLineChartprops) {
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
                <YAxis dataKey="prediction" domain={[min as number, max as number]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={"prediction"} stroke="#fcd34d" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={"real"} stroke="#374151" />
            </LineChart>
        </ResponsiveContainer>
    );
}