import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import Question from '../Question/Index';
import Choice from '../Choice/Index';
import { useEvaluate } from '../../contexts/EvaluateProvider';
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles((theme) => {
  return {
    vcrInput: {
      display: 'flex',
      flexDirection: 'column',

			'& button': {
				height: 40,
				fontFamily: 'Cascadia Code',
        margin: "2px auto",
				[theme.breakpoints.down('sm')]: {
					height: 30
				},
			}
    }
  }
})

/**
 * @component
 * Input form for VCR page
 * propTypes are displayed Below
 * @returns 
 */
export default function VCRInput({ data, setData }) {
  const classes = useStyles()
	const [ setEvaluate ] = useEvaluate();

	function questionChangeHandler(event) {
		setData({ ...data, question: event.target.value });
	}

	function handleChoiceChange(event, i) {
		setData((prevData) => {
			prevData.answers[i] = event.target.value;
			setData({ ...prevData });
		});
	}

	function handleRationaleChange(event, i) {
		setData((prevData) => {
			prevData.rationales[i] = event.target.value;
			setData({ ...prevData });
		});
	}

  function startEvaluation(e) {
    console.log(data)
    setEvaluate(true)
  }

	return (
		<Box
      className={classes.vcrInput}
    >
			<Question
				hideEvaluateButton={true}
				question={data.question}
				questionChangeHandler={questionChangeHandler}
			/>
			{data.answers.map((choice, index) => {
				return (
					<Choice
						value={choice}
						key={index}
						valueChangeHandler={(e) => handleChoiceChange(e, index)}
						label={`Answer-${index + 1}`}
					/>
				);
			})}
			{data.rationales.map((choice, index) => {
				return (
					<Choice
						value={choice}
						key={index}
						valueChangeHandler={(e) => handleRationaleChange(e, index)}
						label={`Rationale-${index + 1}`}
					/>
				);
			})}
			<Button variant="contained" color="secondary" size="small" onClick={startEvaluation}>
				Evaluate
			</Button>
		</Box>
	);
}

VCRInput.propTypes = {
	data: PropTypes.shape({
		question: PropTypes.string.isRequired,
		answers: PropTypes.arrayOf(PropTypes.string).isRequired,
		rationales: PropTypes.arrayOf(PropTypes.string).isRequired
	}).isRequired,
	setData: PropTypes.func.isRequired
};
