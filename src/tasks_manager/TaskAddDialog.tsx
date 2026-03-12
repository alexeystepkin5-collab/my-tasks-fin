import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  Select,
  FormControl,
  InputLabel,
  MenuItem

} from '@mui/material';
import type { Task } from '../types';

interface TaskAddDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id'>) => void;
}

export const TaskAddDialog: React.FC<TaskAddDialogProps> = ({
    open,
    onClose,
    onAdd
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [isdone, setisDone] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !priority.trim()) {
      return;
    }

    onAdd({
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
          <TextField
            label="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel>Выберите приоритет *</InputLabel>
            <Select
              title="Заполните это поле."
              label="Выберите приоритет"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              fullWidth
              required
              >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Normal"}>Normal</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>
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
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
