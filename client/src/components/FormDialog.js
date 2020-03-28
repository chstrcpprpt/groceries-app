import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormDialog() {
  //modal state
  const [open, setOpen] = React.useState(false);
  //form state
  const [value, setValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      <IconButton aria-label="add">
        <AddCircleRoundedIcon color="inherit" fontSize="large" onClick={handleClickOpen}/>
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your new grocery item
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="item"
            label="Item"
            type="text"
            fullWidth
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Section</FormLabel>
            <RadioGroup aria-label="section" name="section1" value={value} onChange={handleChange}>
              <FormControlLabel value="Fridge" control={<Radio />} label="Fridge" />
              <FormControlLabel value="Fruit & Veg" control={<Radio />} label="Fruit & Veg" />
              <FormControlLabel value="Bakery" control={<Radio />} label="Bakery" />
              <FormControlLabel value="Meats" control={<Radio />} label="Meats" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
