import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

import API from "../../API";
import "./FridgeList.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  shoppingItem: {
    marginRight: theme.spacing(2),
  },
  deleteBtn: {
    flexGrow: 1,
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
};

export default function ListFridge() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const getAndSetGroceries = async () => {
      const getGroceries = await API.getAllGroceries();
      setGroceries(getGroceries);
    }
    getAndSetGroceries();
    console.log(groceries);
  }, []);

  const updateItem = async (event, id) => {
    event.stopPropagation();
    const payload = {
      isPurchased: !groceries.find(item => item._id === id).isPurchased
    }
    const updatedItem = await API.updateGrocery(id, payload);
    setGroceries(groceries.map(item => (item._id === id ? updatedItem : item)))
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {groceries.filter(item => item.section === "Fridge" && item.isPurchased === false).map(({_id, item, isPurchased}, i) => (
          <ListItem 
            button
            key={i}
            onClick={event => updateItem(event, _id)}
            className={isPurchased ? "isPurchased" : ""}
          >
            <ListItemText className ={`to-purchase ${classes.shoppingItem}`} primary={item} />

          </ListItem>
        ))}
        
      </List>

      <Divider />

      <List component="nav" aria-label="secondary mailbox folders">
        {groceries.filter(item => item.section === "Fridge" && item.isPurchased === true).map(({_id, item, isPurchased}, i) => (
          <ListItem 
            button
            key={i}
            onClick={event => updateItem(event, _id)}
            className={isPurchased ? "isPurchased" : ""}
            >
            <ListItemText className ={`purchased ${classes.shoppingItem}`} primary={item} />

            <ListItemIcon>
              <DeleteIcon className={classes.deleteBtn} fontSize="small" />
            </ListItemIcon>

          </ListItem>
        ))}
      </List>
    </div>
  );
}
