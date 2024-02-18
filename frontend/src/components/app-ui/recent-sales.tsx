import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { CloudSun, CloudSunRain, Sun } from "lucide-react"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function RecentSales({ temperatures }: { temperatures: number[] }) {
  const currentDate = new Date();
  return (
    <div className="space-y-8">
      {temperatures.slice(0, temperatures.length - 2).map((temp, i) => {
        const temperature = Math.round(temp);
        currentDate.setDate(currentDate.getDate() + 1);
        const formattedDate = `${days[currentDate.getDay()]} ${currentDate.getDate()}`;
        const dayState = { icon: <Sun />, message: "it is a sunny day" };
        if (temperature > 25) {
          dayState.icon = <Sun />;
          dayState.message = "It is a hot day!";
        } else if (temperature <= 25 && temperature > 10) {
          dayState.icon = <CloudSun />;
          dayState.message = "It is a pleasant day.";
        } else {
          dayState.icon = <CloudSunRain />;
          dayState.message = "It is a cool day with a chance of rain.";
        }
        return (
          <div className="flex items-center" key={i}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                {dayState.icon}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{formattedDate}</p>
              <p className="text-sm text-muted-foreground">
                {dayState.message}
              </p>
            </div>
            <div className="ml-auto font-medium">{temperature} <small className="text-gray-900 font-bold text-[12px]">&#8451;</small></div>
          </div>
        );
      })}
    </div>
  )
}
