import AnalyticsCharts from '../sections/analytics/AnalyticsCharts';
import InsightCards from '../sections/analytics/InsightCards';
import PomodoroTimer from '../sections/analytics/PomodoroTimer';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { computeStreak, insights } from '../sections/analytics/analyticsUtils';
import { useToast } from '../components/ToastProvider';

export default function AnalyticsPage() {
  const [sessions, setSessions] = useLocalStorageState('saai_sessions', []);
  const [tasks] = useLocalStorageState('saai_tasks', []);
  const { pushToast } = useToast();
  const derived = insights(sessions, tasks);

  return (
    <section>
      <h2>Analytics</h2>
      <PomodoroTimer
        onSessionLogged={(session) => {
          setSessions((prev) => [...prev, session]);
          pushToast('Pomodoro session logged');
        }}
      />
      <InsightCards insights={derived} />
      <AnalyticsCharts sessions={sessions} tasks={tasks} streak={computeStreak(sessions)} />
    </section>
  );
}
