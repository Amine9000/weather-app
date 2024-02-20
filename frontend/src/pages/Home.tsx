import { MainNav } from "@/components/app-ui/main-nav";
import { Overview } from "@/components/app-ui/overview";
import { RecentData } from "@/components/app-ui/RecentData";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CloudRainWind, CloudSun, CloudSunRain, Droplet, Droplets, Gauge, GaugeCircle, Sun, SunDim, ThermometerSun, Tornado, Waves, Wind } from "lucide-react";
import { useEffect, useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

enum datatypeEnum {
    TEMPERATURE = "temperature",
    PRESSURE = "pressure",
}
const messages = {
    temperature: {
        l1: "It is scorching hot!",
        l2: "It is pleasantly warm.",
        l3: "It is cool with a chance of rain.",
    },
    pressure: {
        l1: "The pressure is high and it's hot!",
        l2: "The pressure is moderate, and it's a nice day.",
        l3: "The pressure is low, and there's a chance of rain.",
    },
    humidity: {
        l1: "It is humid and hot!",
        l2: "The humidity is comfortable, making it a pleasant day.",
        l3: "It is cool with a chance of rain.",
    },
    windv: {
        l1: "Windy and hot!",
        l2: "A pleasant breeze is blowing.",
        l3: "Cool with a chance of rain and some wind.",
    }
};

const icons = {
    temperature: {
        l1: <Sun />,
        l2: <SunDim />,
        l3: <CloudSun />,
    },
    pressure: {
        l1: <Gauge />,
        l2: <Gauge />,
        l3: <Gauge />,
    },
    humidity: {
        l1: <Droplet />,
        l2: <Droplets />,
        l3: <Waves />,
    },
    windv: {
        l1: <Tornado />,
        l2: <CloudRainWind />,
        l3: <Wind />,
    }
};



type dataType = { time: string, real: number, prediction: number }[];
type toDayDataType = { unit: string | React.ReactNode, value: number };
type currentDataType = {
    [k: string]: toDayDataType
}
type classesObjType = { [key: string]: string };
const units: {
    [key: string]: React.ReactNode,
} = {
    temperature: <small className="text-yellow-600 text-sm">&#8451;</small>,
    pressure: <small className="text-yellow-600 text-sm">mBar</small>,
    humidity: <small className="text-yellow-600 text-sm">%</small>,
    windv: <small className="text-yellow-600 text-sm">m/s</small>
}


const initialCurrentData: currentDataType = {
    "temperature": { unit: units["temperature"], value: 0 },
    "pressure": { unit: units["pressure"], value: 0 },
    "humidity": { unit: units['humidity'], value: 0 },
    "windv": { unit: units["windv"], value: 0 },
}


export type recentDataType = { icon: React.ReactNode, message: string, formattedDate: string, value: number }

function classifyData(datatype: datatypeEnum, d: number, i: number) {
    const days_long = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const singleData = Math.round(d);
    currentDate.setDate(currentDate.getDate() + i);
    const formattedDate = `${days_long[currentDate.getDay()]} ${currentDate.getDate()}`;
    const dayState: recentDataType = { icon: null, message: "", formattedDate: formattedDate, value: singleData };
    if (singleData > 25) {
        dayState.icon = icons[datatype].l1;
        dayState.message = messages[datatype].l1;
    } else if (singleData <= 25 && singleData > 10) {
        dayState.icon = icons[datatype].l2;
        dayState.message = messages[datatype].l2;
    } else {
        dayState.icon = icons[datatype].l3;
        dayState.message = messages[datatype].l3;
    }
    return dayState;
}


function Home() {
    // const { datatype } = useParams();
    const [datatype, setDataType] = useState<string>("temperature");
    const [dataTypeClasses, setDataTypeClasses] = useState<classesObjType>({
        temperature: "border-yellow-600",
        pressure: "",
        humidity: "",
        windv: "",
    })
    const [recentData, setRecentData] = useState<recentDataType[]>([])
    const [currentData, setCurrentData] = useState<currentDataType>(initialCurrentData);
    const [data, setData] = useState<dataType>();
    const [max, setMax] = useState<number>(0);
    const [min, setMin] = useState<number>(10);
    const [unit, setUnit] = useState<React.ReactNode>(units["temperature"]);

    useEffect(() => {
        async function getAllCurrentData() {
            const curData = await fetch(`http://127.0.0.1:8000/all`);
            const curDataObj = await curData.json();
            const nCurData: currentDataType = {
                "temperature": { unit: units["temperature"], value: Math.round(curDataObj.temp) },
                "pressure": { unit: units["pressure"], value: Math.round(curDataObj.press) },
                "humidity": { unit: units["humidity"], value: Math.round(curDataObj.hum) },
                "windv": { unit: units["windv"], value: Math.round(curDataObj.windv) },
            }
            setCurrentData(nCurData);
        }
        getAllCurrentData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`http://127.0.0.1:8000/${datatype}`);
            const dataArr = await data.json();
            const len = dataArr[0].length;
            setMax(Math.round(Math.max(...dataArr[0], ...dataArr[1])) + 2)
            setMin(Math.round(Math.min(...dataArr[0], ...dataArr[1])) - 2)
            const newArr = [];
            const newData = dataArr[1].map((d: number, i: number) => classifyData(datatype as datatypeEnum, d, i));
            setRecentData(newData);
            setUnit(units[datatype as string])
            switch (datatype) {
                case "temperature":
                    setCurrentData({ ...currentData, temperature: { unit: units[datatype as string], value: Math.round(dataArr[1][0]) } })
                    break;
                case "pressure":
                    setCurrentData({ ...currentData, pressure: { unit: units[datatype as string], value: Math.round(dataArr[1][0]) } })
                    break;
                case "humidity":
                    setCurrentData({ ...currentData, humidity: { unit: units[datatype as string], value: Math.round(dataArr[1][0]) } })
                    break;
                case "windv":
                    setCurrentData({ ...currentData, windv: { unit: units[datatype as string], value: Math.round(dataArr[1][0]) } })
                    break;
                default:
                    break;
            }
            for (let i = 0; i < len; i++) {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + i);
                const formattedDate = `${days[currentDate.getDay()]} ${currentDate.getDate()}`;
                newArr.push({ time: formattedDate, real: Math.round(dataArr[0][i]), prediction: Math.round(dataArr[1][i]) });
            }
            setData(newArr)
        }
        fetchData();
    }, [datatype])

    function handleDatatypeChange(datatype: string) {
        setDataType(datatype);
        const newClasses: classesObjType = {};
        for (const key in dataTypeClasses) {
            newClasses[key] = datatype == key ? "border-yellow-600" : "";
        }
        setDataTypeClasses(newClasses);
    }

    return (<>
        <div className="flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6" />
                </div>
            </div>
            <div className="flex-1 p-4 pt-2">
                <div className="flex flex-col my-4">
                    <h2 className="text-3xl font-bold tracking-tight">SkyCast</h2>
                    <small className="text-gray-800 mt-2">SkyCast: Instant weather insights for your day, rain or shine.</small>
                </div>

                <div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-4">
                        <Card className={`cursor-pointer ${dataTypeClasses.pressure}`} onClick={() => handleDatatypeChange("pressure")}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Pressure
                                </CardTitle>
                                <GaugeCircle className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentData.pressure.value} {currentData.pressure.unit}</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card className={`cursor-pointer ${dataTypeClasses.humidity}`} onClick={() => handleDatatypeChange("humidity")}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Humidity
                                </CardTitle>
                                <Droplets className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex gap-2 items-center">{currentData.humidity.value} {currentData.humidity.unit}</div>
                                <p className="text-xs text-muted-foreground">
                                    +180.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card className={`cursor-pointer ${dataTypeClasses.temperature}`} onClick={() => handleDatatypeChange("temperature")}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                                <ThermometerSun className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentData.temperature.value} {currentData.temperature.unit}</div>
                                <p className="text-xs text-muted-foreground">
                                    +19% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card className={`cursor-pointer ${dataTypeClasses.windv}`} onClick={() => handleDatatypeChange("windv")}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Air velocity
                                </CardTitle>
                                <Wind className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex items-baseline gap-2">{currentData.windv.value} {currentData.windv.unit}</div>
                                <p className="text-xs text-muted-foreground">
                                    +201 since last hour
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview data={data as dataType} min={min as number} max={max as number} />
                            </CardContent>
                        </Card>
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>the weather next 5 days</CardTitle>
                                <CardDescription>
                                    SkyCast: Your 5-day forecast, ready in a glance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentData data={recentData} unit={unit} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Home;