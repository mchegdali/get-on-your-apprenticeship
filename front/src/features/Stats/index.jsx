import styles from "./stats.module.css";

import { Suspense } from "react";
import { HouseStatsChart } from "./HouseStatsChart";
import { AliveStudentStatsChart } from "./AliveStudentStatsChart";

const StatsPage = () => {
  return (
    <>
      <h1>Statitics out of nowhere !</h1>

      <div className={styles.container}>
        <div className={styles.chart_container}>
          <p className={styles.chart_title}>Numbers of characters per house</p>
          <Suspense fallback={<>Loading...</>}>
            <HouseStatsChart />
          </Suspense>
        </div>

        <div className={styles.chart_container}>
          <p className={styles.chart_title}>Numbers of characters alive</p>
          <Suspense fallback={<>Loading...</>}>
            <AliveStudentStatsChart />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default StatsPage;
