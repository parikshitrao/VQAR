import { Box, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useEvaluate } from '../../contexts/EvaluateProvider';

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

export default function Question({ question, questionChangeHandler, hideEvaluateButton }) {
	const classes = useStyles();
	const [ , setEvalute ] = useEvaluate();

	function startEvaluation(e) {
		setEvalute(true);
	}

	return (
		<Box className={classes.box}>
			<TextField
				id="filled-basic"
				label="Question"
				color="secondary"
				variant="standard"
				value={question}
				onChange={questionChangeHandler}
				focused
			/>
			{!hideEvaluateButton && (
				<Button variant="contained" color="secondary" size="small" onClick={startEvaluation}>
					Evaluate
				</Button>
			)}
		</Box>
	);
}

Question.propTypes = {
	question: PropTypes.string.isRequired,
	questionChangeHandler: PropTypes.func.isRequired,
	hideEvaluateButton: PropTypes.bool
};
