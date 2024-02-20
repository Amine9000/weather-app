import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { recentDataType } from "@/pages/Home";

export function RecentData({ data, unit }: { data: recentDataType[], unit: React.ReactNode }) {
  return (
    <div className="space-y-8">
      {data.slice(0, data.length - 2).map((d, i) => {
        return (
          <div className="flex items-center" key={i}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                {d.icon}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{d.formattedDate}</p>
              <p className="text-sm text-muted-foreground">
                {d.message}
              </p>
            </div>
            <div className="ml-auto font-medium flex gap-2">{d.value} {unit}</div>
          </div>
        );
      })}
    </div>
  )
}
