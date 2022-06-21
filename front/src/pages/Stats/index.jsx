import styles from "./stats.module.css";

import { Suspense } from "react";
import { HouseStatsChart } from "../../features/Stats/HouseStatsChart";
import { AliveStudentStatsChart } from "../../features/Stats/AliveStudentStatsChart";

const StatsPage = () => {
  return (
    <article className={styles.section}>
      <h1>Statitics out of nowhere !</h1>

      <div className={styles.container}>
        <div className={styles.chart}>
          <p className={styles.chart_title}>Numbers of characters per house</p>
          <div className={styles.chart_container}>
            <Suspense fallback={<>Loading...</>}>
              <HouseStatsChart />
            </Suspense>
          </div>
        </div>
        <div className={styles.chart}>
          <p className={styles.chart_title}>Numbers of characters alive</p>
          <div className={styles.chart_container}>
          
            <Suspense fallback={<>Loading...</>}>
              <AliveStudentStatsChart />
            </Suspense>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StatsPage;
