import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccessTime, Delete } from "@material-ui/icons";
import FirebaseService from "./FirebaseService";

import moment from "moment";
import "moment/locale/pt-br";
import "./styles.css";

// import moment from "moment";
moment.locale("pt-br");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    margin: "0 auto"
  },
  bgList: {
    backgroundColor: "#DFEFFF",
    margin: theme.spacing(1, 0)
  },
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function App() {
  const [dates, setDate] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    FirebaseService.getDataList("trainning", setDate);
  }, []);

  const onClick = async () => {
    const dateNow = Date.now();

    const saved = await FirebaseService.pushData("trainning", {
      timestamp: dateNow
    });

    const newDate = dates.concat({ key: saved.key, timestamp: dateNow });
    setDate(newDate);
  };

  const remove = key => {
    FirebaseService.deleteData("trainning", key);
  };

  return (
    <div className="App">
      <h1>Contrações de Treinamento</h1>
      <Button
        color="primary"
        onClick={onClick}
        variant="contained"
        size="large"
        startIcon={<AccessTime />}
      >
        +1
      </Button>
      <List align="center" className={classes.root} dense={true}>
        {dates.map((date, index) => (
          <ListItem key={`list-${index}`} className={classes.bgList}>
            <ListItemText primary={moment(date.timestamp).format("L - LTS")} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => remove(date.key)}
                aria-label="delete"
              >
                <Delete color="secondary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
