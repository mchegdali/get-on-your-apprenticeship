import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { studentsAliveCountState } from "./stats.store";
ChartJS.register(ArcElement, Tooltip, Legend);

export const AliveStudentStatsChart = () => {
  const housesStudentsCount = useRecoilValue(studentsAliveCountState);

  const data = useMemo(
    () => ({
      labels: ["Alive", "Dead"],
      datasets: [
        {
          label: "# of students",
          data: housesStudentsCount,
          backgroundColor: [
            "rgba(70, 184, 0, 0.8)", // alive
            "rgba(193, 15, 23, 0.8)", // dead
          ],
          borderWidth: 0,
        },
      ],
    }),
    [housesStudentsCount]
  );

  return <Pie data={data} />;
};
