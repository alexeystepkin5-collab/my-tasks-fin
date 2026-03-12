import { createServer, Model } from 'miragejs'
import type { Task } from '../types'

type TaskPayload = Omit<Task, 'id'>

let nextTaskId = 1

export function makeServer() {
  return createServer({
    models: {
      task: Model,
    },

    seeds(server: any) {
      const seedTasks: Task[] = [
        
      ]
      seedTasks.forEach((task) => server.create('task', task))
    },

    routes() {
      this.namespace = 'api'
      this.timing = 1000

      // GET /api/tasks -> отдаёт задачи
      this.get('/tasks', (schema: any) => {
        const records = schema.all('task').models
        return records.map((record: any) => record.attrs as Task)
      })

      // POST /api/tasks {данные новой задачи} -> создаёт задачу и отдаёт её с новым id
      this.post('/tasks', (schema: any, request: any) => {
        const payload = JSON.parse(request.requestBody) as TaskPayload

        const newTask: Task = {
          id: nextTaskId,
          ...payload,
        }
        nextTaskId += 1

        const record = schema.create('task', newTask)
        return record.attrs as Task
      })
    },
  })
}