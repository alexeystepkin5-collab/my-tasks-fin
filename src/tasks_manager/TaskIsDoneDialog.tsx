import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Stack

} from '@mui/material';
import type { Task } from '../types';

interface TaskIsDoneDialogProps {
  open: boolean;
  onClose: () => void;
  onIsDone: (task: Omit<Task, 'id'>) => void;
}

export const TaskIsDoneDialog: React.FC<TaskIsDoneDialogProps> = ({
    open,
    onClose,
    onIsDone
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [isdone, setisDone] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !priority.trim()) {
      return;
    }

    onIsDone({
      title: title.trim(),
      priority: priority.trim(),
      isdone, 
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setPriority('');
    setisDone(false);
    onClose();
  };

  //const [value, setValue] = useState('');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить задачу</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isdone}
                onChange={(e) => setisDone(e.target.checked)}
              />
            }
            label="Выполнено"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim() || !priority.trim()}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
