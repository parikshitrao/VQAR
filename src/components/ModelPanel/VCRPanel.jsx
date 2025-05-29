// @flow

import PropTypes from 'prop-types';
import { Paper, Typography, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { fetchPrediction, sendUserFeedback } from '../../utils/helpers';
import { useEvaluate } from '../../contexts/EvaluateProvider';
import Answer from '../Answer/Index';
// import { useAuth } from '../../contexts/AuthProvider';
import VCRFeedbackForm from '../FeedbackForm/VCRFeedback';
import MySnackbar from '../MySnackbar/Index';
import { useCookies } from 'react-cookie';


const useStyles = makeStyles((theme) => {
	console.log(theme);
	return {
		panel: {
			[theme.breakpoints.down('md')]: {
				width: '55%'
			},
			[theme.breakpoints.down('sm')]: {
				width: '100%'
			},
			width: '35%',
			margin: '20px auto',
			padding: 10
		}
	};
});
/**
 * @component
 * Proptypes are defined at the bottom
 * @returns 
 */
export default function VCRModelPanel({ modelName, apiUrl, data, imageIndex, vcrMode }) {
	const classes = useStyles();
	// const [ auth, setAuth ] = useAuth();
	const [ prediction, setPrediction ] = useState({
		answer: "",
		rationale: "",
	});
	const [ evaluate, setEvaluate ] = useEvaluate();
	const [ loading, setLoading ] = useState(false);
	const [ timeTaken, setTimeTaken ] = useState(null);
	const [ showFeedback, setShowFeedback ] = useState(false);
	const [ feedback, setFeedback ] = React.useState({
		answer: null,
		rationale: null,
		attention: null,
		answer_relevance_score: -1,
		rationale_relevance_score: -1,
		user_answer: '',
		user_rationale: '',
	});
	const [warningMessage, setWarningMessage] = useState("");

	const [cookies] = useCookies(['user']);
	//console.log("Stored Cookie "+cookies.userID);
	let cookieUserID = cookies.userID;

	useEffect(
		() => {
			// console.log("Model Panel: ", evaluate, evaluateRef.current);
			if (evaluate) {
				// console.log('getting asnwer');
				getAnswer();
				setEvaluate(false);
			}
		},
		[ evaluate ]
	);
/**
 * @async
 * @function sendFeedback Function that handles feedback from users 
 * @returns 
 */
	async function sendFeedback() {
		console.log(feedback);
		// if (!feedback.answer || !feedback.attention) {
		if (!feedback.answer || feedback.answer_relevance_score === -1 || feedback.rationale_relevance_score === -1) {
			console.log('You have to pick something!');
			setWarningMessage('Please Provide Feedback');
			return false;
		}

		// If the answer is wrong, then user answer is required!!
		if (feedback.answer === 'no' && !feedback.user_answer) {
			setWarningMessage('Please provide the actual answer.');
			return false;
		}

		// If the rationale is wrong, then user rationale is required!!
		if (feedback.rationale === 'no' && !feedback.user_rationale) {
			setWarningMessage('Please provide the actual answer.');
			return false;
		}

		if(feedback.answer_relevance_score === -1 || feedback.rationale_relevance_score === -1){
			setWarningMessage('Relevance score must be between 0 and 4 (Inclusive)');
			return false;
		}

		console.log(feedback);
		
		sendUserFeedback(apiUrl, { cookieUserID, feedback, imageIndex, data });

		setFeedback({
			answer: null,
			rationale: null,
			attention: null,
			answer_relevance_score: -1,
			rationale_relevance_score: -1,
			user_answer: '',
			user_rationale: '',
		});
		setShowFeedback(false);
	}

/**
 * 
 * @param {string} name 
 * @param {number} value 
 */
	function handleRadioChange(name, value) {
		setFeedback({ ...feedback, [name]: value });
		// console.log({ feedback });
		setWarningMessage("")
	}

	function handleWarningClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		// setWarningOpen(false)
		setWarningMessage("")
	}
/**
 * @async
 * @function getAnswer It retreive answer from backend and sets it
 * It fetches answer and pridiction, measures time taken for fetching.
 * And shows feedback option
 */
	async function getAnswer() {
		let predictionData = {
			questionData: data,
			imageIdx: imageIndex,
			task_type: vcrMode
		};

		try {
			setLoading(true);
			let startTime = performance.now();
			let ans = await fetchPrediction(apiUrl, predictionData);
			let endTime = performance.now();
			setTimeTaken(endTime - startTime);
			setLoading(false);
			// setPrediction(ans);
			let answer = ans.answer_batch_outputs[0].predicted_answer
			let rationale = ans.rational_batch_outputs[0].predicted_rationale
			setPrediction({answer, rationale})
			setShowFeedback(true)
			// setAnswerWithRationale(ansWrat)
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<Paper className={classes.panel} elevation={10}>
			<Typography sx={{ fontFamily: 'Cascadia Code' }}>{modelName}</Typography>
			{loading ? <CircularProgress color="secondary" /> : <><Answer answer={`${prediction.answer}`} showMeta={false}/> I think becase, <Answer answer={prediction.rationale} showMeta={false}/></>}
			<Typography sx={{ fontFamily: 'Cascadia Code', fontSize: '12px' }}>
				{!loading && timeTaken && `Took ${(timeTaken / 1000).toFixed(2)}s`}
			</Typography>

			{showFeedback && (
				<VCRFeedbackForm handleRadioChange={handleRadioChange} sendFeedback={sendFeedback} feedback={feedback} />
			)}

			{/* {(attMapUrl && modelActive) && <Paper component="img" src={attMapUrl} alt={`Attention Map`} sx={{mt: 2, width: "100%", height: "auto"}}/>} */}

			<MySnackbar open={warningMessage !== ""} handleClose={handleWarningClose} msg={warningMessage} />
		</Paper>
	);
}

VCRModelPanel.propTypes = {
	modelName: PropTypes.string.isRequired,
	apiUrl: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired,
	vcrMode: PropTypes.string.isRequired,
	data: PropTypes.shape({
		question: PropTypes.string.isRequired,
		answers: PropTypes.arrayOf(PropTypes.string).isRequired,
		rationales: PropTypes.arrayOf(PropTypes.string).isRequired
	}).isRequired
};
