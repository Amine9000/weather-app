import { MainNav } from "@/components/app-ui/main-nav";

function About() {
    return (<>
        <div className="h-full w-full flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6" />
                </div>
            </div>
            <div className="h-full w-full flex-1 p-4 pt-2">
                <div className="flex flex-col my-4">
                    <h2 className="text-3xl font-bold tracking-tight">SkyCast</h2>
                    <small className="text-gray-800 mt-2">SkyCast: Instant weather insights for your day, rain or shine.</small>
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-full md:w-2/3 border h-auto p-2 rounded-sm flex flex-col">
                        <div className="flex flex-col items-start space-y-1.5 p-3">
                            <h3 className="font-semibold leading-none tracking-tight">
                                Empowering Your Day with SkyCast
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Discover what sets us apart.
                            </p>
                        </div>
                        <div className="p-3">
                            <p className="text-sm text-start text-gray-800">
                                SkyCast revolutionizes your weather experience, providing immediate and comprehensive insights meticulously crafted for your day. Whether you're planning for a sun-soaked adventure or bracing for rain, SkyCast delivers real-time updates and forecasts, ensuring you're impeccably prepared for any atmospheric scenario. Stay seamlessly informed and make confident decisions with the convenience of SkyCast – your instant source for precise, timely, and personalized weather information.
                            </p>
                        </div>

                        <div className="flex flex-col items-start space-y-1.5 p-3">
                            <h3 className="font-semibold leading-none tracking-tight">
                                Team Members
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Meet our dedicated team members.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3">

                            <div className="flex items-center space-x-4">
                                <span className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full">
                                    <img className="aspect-square h-full w-full" src="https://placehold.co/64x64" />
                                </span>
                                <div className="flex flex-col justify-start">
                                    <p className="text-sm font-medium leading-none text-start">Sofia Davis</p>
                                    <p className="text-sm text-muted-foreground text-start">m@example.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full">
                                    <img className="aspect-square h-full w-full" src="https://placehold.co/64x64" />
                                </span>
                                <div className="flex flex-col justify-start">
                                    <p className="text-sm font-medium leading-none text-start">Sofia Davis</p>
                                    <p className="text-sm text-muted-foreground text-start">m@example.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full">
                                    <img className="aspect-square h-full w-full" src="https://placehold.co/64x64" />
                                </span>
                                <div className="flex flex-col justify-start">
                                    <p className="text-sm font-medium leading-none text-start">Sofia Davis</p>
                                    <p className="text-sm text-muted-foreground text-start">m@example.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full">
                                    <img className="aspect-square h-full w-full" src="https://placehold.co/64x64" />
                                </span>
                                <div className="flex flex-col justify-start">
                                    <p className="text-sm font-medium leading-none text-start">Sofia Davis</p>
                                    <p className="text-sm text-muted-foreground text-start">m@example.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full">
                                    <img className="aspect-square h-full w-full" src="https://placehold.co/64x64" />
                                </span>
                                <div className="flex flex-col justify-start">
                                    <p className="text-sm font-medium leading-none text-start">Sofia Davis</p>
                                    <p className="text-sm text-muted-foreground text-start">m@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default About;