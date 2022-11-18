import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: "330px",
    margin: "0 auto",
    marginTop: "100px"
  },
  title: {
    fontSize: 40,
    fontStyle: "bold",
    color: "black"
  },
  mybtn3: {
    background: "purple",
    color: "white",
    marginLeft: "19px",
    fontSize: "11px"
  },
  clr: {
    background: "#f3ebeb",
    padding: "10px"
  },
  wth: {
    width: "245px"
  },
  updatebtn: {
    background: "red",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    border: "none"
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const [state, setstate] = useState([])
  const [addNew, setAddNew] = useState('')
  const [update, setupdate] = useState('')
  //for get
  useEffect(() => {
    const res = axios.get('http://localhost:5000/api/favorite').then(res => {
      if (res.data.success) {
        setstate(res.data.tasks)
      }
    })
  }, [])

  //for post
  const handlesubmit = (e: any) => {
    axios.post('http://localhost:5000/api/favorite', { task: addNew }).then(res => {
      if (res.data.success) {
        setstate(res.data.tasks)
      }
    })
  }
  //for clearing all tasks...
  const deleteTasks = () => {
    axios.delete('http://localhost:5000/api/favorite').then((res) => {
      setstate([])
    })
  };
  //for updating task...
  const updatetask = (id: any) => {
    axios
      .put(`http://localhost:5000/api/favorite/${id}`, {
        task: update
      })
      .then((response) => {
        setupdate(response.data.tasks);
      });
  }
  //for deleting task...
  const deletetask = (id: any) => {
    axios.delete(`http://localhost:5000/api/favorite/${id}`, {
    })
      .then((response) => {
        state.filter((task: any) => {
          if (task !== id) {
            return setstate(id);
          }
        })
        setstate(response.data.tasks)
      }
      );
  }
  return (
    <Card className={classes.root}
      variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Todo App
        </Typography>
        <Typography variant="h5" component="h2">
          <Box m={1} >
            <TextField label="Add Your New Todo " variant="outlined" size='small' name="todo" className={classes.wth} onChange={(e) => setAddNew(e.target.value)} />
            < IconButton onClick={handlesubmit} style={{ padding: "0" }}>
              < AddIcon color="secondary" fontSize='large' />
            </IconButton>
          </Box>
        </Typography>
        {state?.length ? state.map((item, id) => {
          return (
            <Box m={1} className={classes.clr} >
              <TextField variant="outlined" size='small' defaultValue={item} fullWidth onChange={(e) => setupdate(e.target.value)} />
              <IconButton color="secondary" onClick={() => updatetask(id)}> <EditIcon /> </IconButton>
              <IconButton color="secondary" onClick={() => deletetask(id)}><DeleteIcon /> </IconButton>
            </Box>
          )
        }) : "no task"}
        <Typography color="textPrimary">
          <Box m={1}>
            {`You have ${state?.length} pending tasks`}
            < Button className={classes.mybtn3} variant="contained" size='small' onClick={deleteTasks} >
              Clear All
            </Button>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}


