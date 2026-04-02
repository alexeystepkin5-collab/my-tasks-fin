import { useState } from "react"
import type { Task } from "../types"
import { Stack } from "@mui/system"
import { Checkbox, FormControlLabel, Box, Typography } from "@mui/material"
import { TasksList } from "./TasksList"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTask, getTasks, type CreateTaskDto } from "../api/tasks"
import { TaskIsDoneDialog } from "./TaskIsDoneDialog"


type TasksManagerProps = {
  // tasks: Task[]
  // onIsDoneTask: (task: Task) => void  // функция которая принимает параметром дело и ничего не возвращает
}

export const TasksManager: React.FC<TasksManagerProps> = ({}) => {
 
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    //isError,
    //error,
  } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  const tasks = data ?? []; 

  const createTaskMutation = useMutation<Task, Error, CreateTaskDto>({  //здесь происходит измениение спика задач
    mutationFn: createTask,
    onSuccess: (createdTask) => {
            queryClient.setQueryData<Task[]>(['tasks'], (current = []) => [...current, createdTask])
    },
  })

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState<boolean>(false);
  const filteredTasks=(!searchQuery)?
    tasks : tasks.filter(task => task.isdone !== searchQuery);
  const selectedTask = tasks.find(task => task.id === selectedTaskId)
  

return (
    <Stack direction="row" spacing={2} width="80vw">
      <TaskIsDoneDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}          
            onIsDone={() => alert(JSON.stringify(selectedTask, null, 2))}
      />
      <Box width="50%">
        {isLoading && <Typography>Загрузка...</Typography>}
        <FormControlLabel   //фильтр отображения только не выполненых задач
          control={
          <Checkbox
            checked={searchQuery}
            onChange={(e) => setSearchQuery(e.target.checked)}
            />
        }
        label="Только не выполненные задачи"
        />
        <TasksList
          tasks={filteredTasks} //{tasks}
          onAddTask={(newTask) => createTaskMutation.mutateAsync(newTask)}
          selectedTaskId={selectedTaskId}
          onSelectTask={(id) => setSelectedTaskId(id)}
        />
      </Box>

      <Box width="50%" 
      >
        {selectedTaskId !== null ? (
          <Stack
            direction="column" spacing={2}
            sx={{"&:hover": {
              bgcolor: "rgb(192, 255, 255)",
              cursor: "pointer"
            }
          }}
          //onClick={() => console.log('Клик по стеку!')} // Ваша функция здесь
          onClick={() => setOpenDialog(true)}
          >
                     
            <Typography variant="h4">
              {tasks.find(task => task.id === selectedTaskId)?.title}
            </Typography>
            <Typography variant="h6">
              {tasks.find(task => task.id === selectedTaskId)?.priority}
            </Typography>
            <Typography variant="body1">
              {tasks.find(task => task.id === selectedTaskId)?.isdone 
                ? "Выполнено!" 
                : "Не выполнено!"
              }
            </Typography>
          </Stack>
        ) : (
          <Typography variant="h6">Выберите задачу</Typography>
        )
      }
      </Box>

    </Stack>
  )
}