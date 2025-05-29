import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useAuth } from '../../contexts/AuthProvider';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      position: "absolute",
      display: 'flex',
      flexDirection: "column",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }
  }
})

/** @function Login Displays Login page  */
export default function Login() {
  const classes = useStyles()
	const [ setAuth ] = useAuth();
	const [ name, setName ] = useState('');
	const navigate = useNavigate();

  const submitHandler = (e) => {
    if(!name){
      return
    }
    setAuth({
      name
    }, navigate("/"))
  }

	return (
		<Box className={classes.wrapper}>
			<TextField
				id="standard-basic"
				label="Roll No"
				variant="standard"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
      <Button
        onClick={submitHandler}
        color="secondary"
      >
        Submit
      </Button>
		</Box>
	);
}
