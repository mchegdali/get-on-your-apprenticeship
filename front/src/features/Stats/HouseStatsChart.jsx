import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { useRecoilValue, waitForAll } from "recoil";
import { housesNamesState, housesStudentsCountState } from "./stats.store";
ChartJS.register(ArcElement, Tooltip, Legend);

export const HouseStatsChart = () => {
  const houseNames = useRecoilValue(housesNamesState);

  const housesStudentsCount = useRecoilValue(
    waitForAll(
      houseNames.map((houseName) => housesStudentsCountState(houseName))
    )
  );

  const data = useMemo(
    () => ({
      labels: houseNames,
      datasets: [
        {
          label: "# of students",
          data: housesStudentsCount,
          backgroundColor: [
            "rgba(103, 0, 1, 0.2)", // gryffindor
            "rgba(0, 51, 0, 0.2)", // slytherin
            "rgba(0, 46, 95, 0.2)", // ravenclaw
            "rgba(204, 153, 0, 0.2)", // hufflepuff
            "rgba(33, 33, 33, 0.2)", // none
          ],
          borderColor: [
            "rgba(103, 0, 1, 1)", // gryffindor
            "rgba(0, 51, 0, 1)", // slytherin
            "rgba(0, 46, 95, 1)", // ravenclaw
            "rgba(204, 153, 0, 1)", // hufflepuff
            "rgba(33, 33, 33, 1)", // none
          ],
          borderWidth: 1,
        },
      ],
    }),
    [housesStudentsCount, houseNames]
  );

  return <Pie data={data} />;
};
