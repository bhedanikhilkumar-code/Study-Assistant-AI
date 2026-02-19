export function aggregateStudyTimeByDay(sessions) {
  const map = new Map();
  sessions.forEach((session) => {
    const day = new Date(session.date).toLocaleDateString(undefined, { weekday: 'short' });
    map.set(day, (map.get(day) || 0) + session.minutes);
  });
  return Array.from(map, ([day, minutes]) => ({ day, minutes }));
}

export function aggregateTasksPerWeek(tasks) {
  return [
    { week: 'This week', tasks: tasks.length },
    { week: 'Completed', tasks: tasks.filter((task) => task.done).length }
  ];
}

export function subjectDistribution(sessions) {
  const map = new Map();
  sessions.forEach((session) => map.set(session.subject, (map.get(session.subject) || 0) + session.minutes));
  return Array.from(map, ([subject, minutes]) => ({ subject, minutes }));
}

export function computeStreak(sessions) {
  const days = new Set(sessions.map((session) => new Date(session.date).toDateString()));
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function insights(sessions, tasks) {
  const bySubject = subjectDistribution(sessions).sort((a, b) => b.minutes - a.minutes);
  const topSubject = bySubject[0]?.subject || 'N/A';
  const completionRate = tasks.length ? Math.round((tasks.filter((task) => task.done).length / tasks.length) * 100) : 0;
  const consistency = Math.min(100, computeStreak(sessions) * 20);
  return { topSubject, completionRate, consistency };
}
