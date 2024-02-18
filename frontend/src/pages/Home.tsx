import { MainNav } from "@/components/app-ui/main-nav";
import { Overview } from "@/components/app-ui/overview";
import { RecentSales } from "@/components/app-ui/recent-sales";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Droplet, Droplets, GaugeCircle, ThermometerSun, Wind } from "lucide-react";
import { useState } from "react";

function Home() {
    const [temperatures, setAllTemperatures] = useState<number[]>([])
    const [temperature, setTemperature] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [windVelocity, setWindVelocity] = useState<number>(0);
    const [pressure, setPressure] = useState<number>(0);
    return (<>
        <div className="hidden flex-col md:flex">
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
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Pressure
                                </CardTitle>
                                <GaugeCircle className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{pressure} <small className="text-emerald-700 text-sm">&#13225;</small> </div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Humidity
                                </CardTitle>
                                <Droplets className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex gap-2 items-center">{humidity} <Droplet className="w-5 h-5 text-indigo-700 text-sm" /></div>
                                <p className="text-xs text-muted-foreground">
                                    +180.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                                <ThermometerSun className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{temperature} <small className="text-yellow-600 text-sm">&#8451;</small></div>
                                <p className="text-xs text-muted-foreground">
                                    +19% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Air velocity
                                </CardTitle>
                                <Wind className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex items-baseline gap-2">{windVelocity} <small className="text-rose-700 text-sm">m/s</small> </div>
                                <p className="text-xs text-muted-foreground">
                                    +201 since last hour
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview setAllTemperatures={setAllTemperatures} setTemperature={setTemperature} setHumidity={setHumidity} setWindVelocity={setWindVelocity} setPressure={setPressure} />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>the weather next 5 days</CardTitle>
                                <CardDescription>
                                    SkyCast: Your 5-day forecast, ready in a glance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentSales temperatures={temperatures} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Home;