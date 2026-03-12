import type { Task } from '../types'

export type CreateTaskDto = Omit<Task, 'id'>



export async function getTasks(): Promise<Task[]> {
  const response = await fetch('/api/tasks')

  if (!response.ok) {
    throw new Error(`Не удалось загрузить задачу: ${response.status}`)
  }

  return response.json() as Promise<Task[]>
}



export async function createTask(payload: CreateTaskDto): Promise<Task> {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Не удалось создать задачу: ${response.status}`)
  }

  return response.json() as Promise<Task>
}