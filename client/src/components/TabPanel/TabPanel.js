import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import FridgeList from "../Fridge/FridgeList";
import FruitAndVegList from "../FruitAndVeg/FruitAndVegList";

import "./TabPanel.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      // className="tab-list"
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: `rgb(185, 185, 185)`,
    minHeight: `calc(100vh - 64px)`
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Deli" {...a11yProps(0)} />
        <Tab label="Fridge" className="fridge" {...a11yProps(1)} />
        <Tab label="Frozen" {...a11yProps(2)} />
        <Tab label="Fruit & Veg" {...a11yProps(3)} />
        <Tab label="Household" {...a11yProps(4)} />
        <Tab label="Meats" {...a11yProps(5)} />
        <Tab label="Pantry" {...a11yProps(6)} />
        <Tab label="Personal Care" {...a11yProps(7)} />
        <Tab label="Other" {...a11yProps(8)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FridgeList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FruitAndVegList />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Eight
      </TabPanel>
      <TabPanel value={value} index={8}>
        Item Nine
      </TabPanel>
    </div>
  );
}
