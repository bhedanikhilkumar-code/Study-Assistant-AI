import type { Task } from '@/types/models'

export type PlanInput = { examDate: string; subjects: string; dailyHours: number; difficulty: 'easy' | 'medium' | 'hard' }

export function generatePlan(input: PlanInput): Task[] {
  const subjectList = input.subjects.split(',').map((s) => s.trim()).filter(Boolean)
  const scale = input.difficulty === 'hard' ? 1.5 : input.difficulty === 'medium' ? 1.2 : 1
  const baseDate = input.examDate ? new Date(input.examDate) : new Date()
  return subjectList.map((subject, idx) => {
    const date = new Date(baseDate)
    date.setDate(date.getDate() - (subjectList.length - idx))
    return {
      id: crypto.randomUUID(),
      title: `${subject}: ${Math.round(input.dailyHours * scale)}h focused practice`,
      dueDate: date.toISOString().slice(0, 10),
      completed: false,
    }
  })
}
