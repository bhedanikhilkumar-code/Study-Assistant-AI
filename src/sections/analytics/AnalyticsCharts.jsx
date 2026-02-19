import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart
} from 'recharts';
import { aggregateStudyTimeByDay, aggregateTasksPerWeek, subjectDistribution } from './analyticsUtils';

export default function AnalyticsCharts({ sessions, tasks, streak }) {
  const dayData = aggregateStudyTimeByDay(sessions);
  const weekData = aggregateTasksPerWeek(tasks);
  const subjectData = subjectDistribution(sessions);

  return (
    <div className="card-grid charts">
      <article className="card chart-card">
        <h3>Study Time / Day</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutes" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </article>
      <article className="card chart-card">
        <h3>Tasks / Week</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tasks" stroke="#f97316" />
          </LineChart>
        </ResponsiveContainer>
      </article>
      <article className="card chart-card">
        <h3>Subject Distribution</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={subjectData} dataKey="minutes" nameKey="subject" outerRadius={80} fill="#14b8a6" />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </article>
      <article className="card chart-card">
        <h3>Current Streak</h3>
        <div className="streak">{streak} day(s)</div>
      </article>
    </div>
  );
}
