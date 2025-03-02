/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "./ui/card";

export const AverageStatsCard = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => {
  const Icon = icon;
  return (
    <Card className="min-w-[250px] flex-1 grow">
      <CardContent className="flex flex-col items-start gap-4 p-3 px-5">
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl font-bold">{value}</p>
          <div className="bg-gray-100 rounded-full p-3 dark:bg-gray-800">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {label}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};
