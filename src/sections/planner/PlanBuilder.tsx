import { useState } from 'react'
import { generatePlan } from '@/lib/planner/generator'
import type { Task } from '@/types/models'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function PlanBuilder({ onCreateTasks }: { onCreateTasks: (tasks: Task[]) => void }) {
  const [examDate, setExamDate] = useState('')
  const [subjects, setSubjects] = useState('')
  const [dailyHours, setDailyHours] = useState(2)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')

  const build = () => onCreateTasks(generatePlan({ examDate, subjects, dailyHours, difficulty }))

  return (
    <Card>
      <h3 className="font-semibold">Study plan builder</h3>
      <div className="mt-2 grid gap-2 md:grid-cols-2">
        <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
        <Input placeholder="Subjects comma separated" value={subjects} onChange={(e) => setSubjects(e.target.value)} />
        <Input type="number" value={dailyHours} onChange={(e) => setDailyHours(Number(e.target.value))} />
        <select className="rounded border px-3 py-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}>
          <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
        </select>
      </div>
      <div className="mt-2 flex gap-2">
        <Button onClick={build}>Generate</Button>
        <Button variant="secondary" onClick={build}>Regenerate</Button>
      </div>
    </Card>
  )
}
