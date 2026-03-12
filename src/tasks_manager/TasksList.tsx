import type React from "react"
import type { Task } from "../types"
import { Button, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { TaskAddDialog } from "./TaskAddDialog"

type TasksListProps = {
  tasks: Task[]
  onAddTask: (task: Task) => void
  selectedTaskId: number | null
  onSelectTask: (id: number) => void
}

export const TasksList: React.FC<TasksListProps> = ({ tasks, onAddTask, selectedTaskId, onSelectTask }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Stack direction="column" spacing={2}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setOpenDialog(true)}
      >
        + Добавить задачу
      </Button>

      <TaskAddDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={(newTask) => {
          onAddTask({ ...newTask, id: Date.now() })
        }}
      />

      {tasks.map(task => (
        <Stack
          key={task.id}
          direction="row"
          spacing={1}
          onClick={() => onSelectTask(task.id)}
          sx={{
            bgcolor: task.id === selectedTaskId ? "rgba(255, 255, 255, 0.25)" : "transparent",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
              cursor: "pointer"
            }
          }}
        >
          <Typography variant="h6">{task.title}</Typography>
          <Typography variant="subtitle1">{task.priority}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}