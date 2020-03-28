import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

export default function FormDialog() {
  //modal state
  const [open, setOpen] = useState(false);
  //form state
  const [section, setSection] = useState('');
  //item state
  const [item, setItem] = useState('');

  //handle new item entered in form
  const handleItemChange = event => {
    console.log(`Item: ${event.target.value}`);
    setItem(event.target.value);
  };

  //handle new section entered in form
  const handleSectionChange = event => {
    console.log(`Section: ${event.target.value}`);
    setSection(event.target.value);
  };

  //handle open & close modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //sections for form
  const sections = [
    {
      value: '',
      label: '',
    },
    {
      value: 'Deli',
      label: 'Deli',
    },
    {
      value: 'Fridge',
      label: 'Fridge',
    },
    {
      value: 'Frozen',
      label: 'Frozen',
    },
    {
      value: 'Fruit & Veg',
      label: 'Fruit & Veg',
    },
    {
      value: 'Household',
      label: 'Household',
    },
    {
      value: 'Meats',
      label: 'Meats',
    },
    {
      value: 'Pantry',
      label: 'Pantry',
    },
    {
      value: 'Personal Care',
      label: 'Personal Care',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

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

            <form className="" noValidate autoComplete="off">
              <TextField
                  autoFocus
                  margin="dense"
                  id="item"
                  label="Item"
                  type="text"
                  onChange={handleItemChange}
                  value={item}
                  fullWidth
                />
              <TextField
                id="section"
                select
                label="Section"
                value={section}
                onChange={handleSectionChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Choose a section"
              >
                {sections.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </form>

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
