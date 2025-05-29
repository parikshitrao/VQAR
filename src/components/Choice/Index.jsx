import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => {
	return {
		box: {
			width: 'fit-content',
			margin: '0 auto',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 8,
			// border: "1px solid red",

			'& input': {
				width: 530,
				height: 20,
				fontFamily: 'Cascadia Code',
				fontSize: '14px',
				marginLeft: '15px',
				[theme.breakpoints.down('md')]: {
					width: 400
				},
				[theme.breakpoints.down('sm')]: {
					width: 300
				}
			},
			'& button': {
				height: 40,
				fontFamily: 'Cascadia Code',
				[theme.breakpoints.down('sm')]: {
					height: 30
				}
			}
		}
	};
});
/**
 * @function Choice Handles radio buttons
 * @returns 
 */
export default function Choice({ value, valueChangeHandler, label }) {
	const classes = useStyles();

	return (
		<Box className={classes.box}>
			<TextField
				id="filled-basic"
				label={label}
				color="primary"
				variant="standard"
				value={value}
				onChange={valueChangeHandler}
				focused
			/>
		</Box>
	);
}

Choice.propTypes = {
	value: PropTypes.string.isRequired,
	valueChangeHandler: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
};
