const now = Date.now();

export function createDemoData() {
  localStorage.setItem(
    'saai_notes',
    JSON.stringify([
      { id: 'n1', title: 'Cell Biology', content: 'Review chapter 4 diagrams.' },
      { id: 'n2', title: 'Calculus', content: 'Practice integration by parts.' }
    ])
  );
  localStorage.setItem(
    'saai_tasks',
    JSON.stringify([
      { id: 't1', title: 'Math worksheet', done: false, subject: 'Math' },
      { id: 't2', title: 'History summary', done: true, subject: 'History' }
    ])
  );
  localStorage.setItem(
    'saai_sessions',
    JSON.stringify([
      { id: 's1', subject: 'Math', minutes: 25, date: new Date(now - 86400000).toISOString() },
      { id: 's2', subject: 'Science', minutes: 50, date: new Date(now - 2 * 86400000).toISOString() },
      { id: 's3', subject: 'History', minutes: 30, date: new Date(now - 3 * 86400000).toISOString() }
    ])
  );
}
