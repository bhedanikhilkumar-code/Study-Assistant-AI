import type { Dispatch, SetStateAction } from 'react'
import { PlanBuilder } from '@/sections/planner/PlanBuilder'
import { Button } from '@/components/ui/button'
import type { Task } from '@/types/models'

export function PlannerPage({ tasks, setTasks }: { tasks: Task[]; setTasks: Dispatch<SetStateAction<Task[]>> }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Planner</h1>
      <PlanBuilder onCreateTasks={(generated) => setTasks((t) => [...generated, ...t])} />
      <div className="space-y-2">
        {tasks.length === 0 ? 'No tasks yet.' : tasks.map((t) => <div key={t.id} className="rounded border p-2 flex justify-between"><span>{t.title} ({t.dueDate})</span><Button variant="ghost" onClick={() => setTasks((all) => all.map((x) => (x.id === t.id ? { ...x, completed: !x.completed } : x)))}>{t.completed ? 'Undo' : 'Complete'}</Button></div>)}
      </div>
    </div>
  )
}
