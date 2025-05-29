// @flow

import PropTypes from 'prop-types';
import { Paper, Typography, CircularProgress, Switch } from '@mui/material';
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Answer from '../Answer/Index';
import { useState } from 'react';
import { fetchPrediction, sendUserFeedback } from '../../utils/helpers';
import { useEvaluate } from '../../contexts/EvaluateProvider';
import FeedbackForm from '../FeedbackForm/Index';
import MySnackbar from '../MySnackbar/Index';
import DiscreteSlider from '../MCANattention/DiscreteSlider';
import { useCookies } from 'react-cookie';
import { VQA_URL } from '../../utils/const';


const useStyles = makeStyles((theme) => {
	//console.log(theme);
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
			padding: 10,
			height: 'fit-content'
		},
		switch: {
			float: 'right'
		}
	};
});


/**
 * @component
 * @param {string} modelName
 * @param {string} apiUrl
 * @param {string} question
 * @param {number} imageIndex
 * @param {boolean} mcan
 * @returns 
 */
export default function VQAModelPanel({ modelName, apiUrl, question, imageIndex,mcan }) {
	const classes = useStyles();
	const [ answer, setAnswer ] = useState('');
	const [ evaluate, setEvaluate ] = useEvaluate();
	const [ loading, setLoading ] = useState(false);
	const [ timeTaken, setTimeTaken ] = useState(null);
	const [ modelActive, setModelActive ] = useState(true);
	const [ showFeedback, setShowFeedback ] = useState(false);
	const [ feedback, setFeedback ] = React.useState({
		answer: null,
		attention: null,
		relevance_score: -1,
		user_answer: '',
		explanation: ''
	});
	const [warningMessage, setWarningMessage] = useState("");
	const [cookies] = useCookies(['user']);
	const [jsonArray, setJsonArray] = useState({});
	const [tempImageIndex, setTempImageIndex] = useState(0);
	const [base64Data, setBase64Data] = useState(".");
	const [coordValues, setCoordValues] = useState({});
	const [imageValues, setImageValues] = useState({});

	const alternateImageUrl = 'http://localhost:4000/saaaImage?imageIndex=';
	const [useAltImage, setUseAltImage] = useState(false);
	
	// const testURL = 'http://localhost:4000/saaaImage?imageIndex=1'
	// function ifUrlExist(url, callback) {
	// 	let request = new XMLHttpRequest;
	// 	request.open('GET', url, true);
	// 	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	// 	request.setRequestHeader('Accept', '*/*');
	// 	request.onprogress = function(event) {
	// 		let status = event.target.status;
	// 		let statusFirstNumber = (status).toString()[0];
	// 		switch (statusFirstNumber) {
	// 			case '2':
	// 				request.abort();
	// 				return callback(true);
	// 			default:
	// 				request.abort();
	// 				return callback(false);
	// 		};
	// 	};
	// 	request.send('');
		
	// };

	//   useEffect(() => {
	// 	ifUrlExist(testURL, function(exists) {
	// 		setUseAltImage(true);
	// 	});
	//   }, []);

	useEffect(() => {
		if(process.env.REACT_APP_DEMO){
			setUseAltImage(true);
		}
	  }, []);
	

	let model_number = -1;
	/** Model no 1 is MCAN; Model no 0 is SAAA */
	if(mcan){
		model_number = 1;
	}else{
		model_number = 0;
	}

	/** @type {string} contains User id cookie */
	let cookieUserID = cookies.userID;
	// console.log("Cookie:"+cookieUserID)

	useEffect(
		() => {
			if (evaluate) {
				getAnswer();
				setEvaluate(false);
			}
		},
		[ evaluate ]
	);


/**
 * @async 
 * @function getAnswer get and set answer
 * @returns 
 */
	async function getAnswer() {
		if (!modelActive) {
			return;
		}
		let inputData = { imageIndex, question, model_number};

		try {
			setLoading(true);
			let startTime = performance.now();
			let data = await fetchPrediction(apiUrl, inputData);
			//assignData(inputData);
			let endTime = performance.now();
			setTimeTaken(endTime - startTime);
			setLoading(false);
			setShowFeedback(true);
			setAnswer(data.answer);
			if(!mcan){setBase64Data(data.attention_data)}
			if (mcan){
				setTempImageIndex(imageIndex);
				setJsonArray(data.attention_data.question_values);
				setCoordValues(data.attention_data.coordinates);
				setImageValues(data.attention_data.image_values);
			}
			//console.log(Object.keys(data.attention_data.question_values).length);
			//if (mcan){assigndata();}
		} catch (err) {
			console.error(err);
		}
	}


	// useEffect(() => {
	// 	console.log("ImageValues: "+JSON.stringify(imageValues))

	// },[imageValues])

	/**
	 * @function handleRadioChange Function that handles radio button
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

/* --------------------------------------------------------------------------------------------- */

/**
 * @function sendFeedback get the input from user else warning message
 * @returns 
 */
	async function sendFeedback() {
		console.log(feedback);
		// if (!feedback.answer || !feedback.attention) {
		if (!feedback.answer || feedback.relevance_score === -1) {
			console.log('You have to pick something!');
			setWarningMessage('Please Provide Feedback');
			return false;
		}

		if (/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(feedback.user_answer)){
		}else{
			setWarningMessage('Avoid punctuation in answer');
			return false;
		}

		// If the answer is wrong, then user answer is required!!
		if (feedback.answer === 'no' && !feedback.user_answer) {
			setWarningMessage('Please provide the actual answer.');
			return false;
		}

		if(feedback.relevance_score === -1){
			setWarningMessage('Relevance score must be between 0 and 4 (Inclusive)');
			return false;
		}

		console.log(feedback);

		// setAuth(cookieUserID);
		// console.log("auth: "+ auth);


/**
 * @async
 * @function sendUserFeedback we set the current time & then we send feedback input to backend
 * @param {string} apiUrl 
 * @param {object} data 
 * 	@param {string} cookieUserID
 * 	@param {object} feedback
 * 		@param {} feedback.answer
 * 		@param {} feedback.attention
 * 		@param {number} feedback.relevance_score
 * 		@param {string} feedback.user_answer
 * 		@param {string} feedback.explaination
 * 	@param {number} imageIndex
 * 	@param {string} question
 * 	@param {string} answer
 * 	@returns 
 */
		sendUserFeedback(apiUrl, {model_number, cookieUserID, feedback, imageIndex, question, answer });

		setFeedback({
			answer: null,
			attention: null,
			relevance_score: -1,
			user_answer: '',
			explaination: ''
		});
		setShowFeedback(false);
	}
	
/* --------------------------------------------------------------------------------------------- */
	
/**
 * Send opacity to words using word attention
 * @param {string} currentelement 
 * @param {number} index 
 * @returns 
 */
	function setFontColor(currentelement,index){
		var colorG = (jsonArray[index]*1)+0.1;
		var colorGrad = colorG.toFixed(2);
		let rgbaColor = "rgba(237,108,3,"+colorGrad+")";
		return <div key= {index} style={{ color: rgbaColor,"flex":"0 1 auto" }}>{currentelement}&nbsp;</div>;
	}

/**
 * @function questionAtt Assigns word attention to question 
 * @param {string} question 
 * @returns 
 */
	function questionAtt(question){
		let myarray = question.split(' ');
		// let result = myarray.map( (currentelement, index) => <div style={{ color: '${setfontColor(index)}',"flex":"0 1 auto" }}>{currentelement}&nbsp;</div>);
		let result = myarray.map( (currentelement, index) => setFontColor(currentelement,index));
		return result;
	}

/* --------------------------------------------------------------------------------------------- */
      


	return (
		<Paper
			className={classes.panel}
			elevation={modelActive ? 10 : 3}
			sx={{ backgroundColor: modelActive ? 'white' : '#eeeeee' }}
		>
			<Switch
				className={classes.switch}
				checked={modelActive}
				onChange={(e) => {
					setModelActive(!modelActive);
				}}
				inputProps={{ 'aria-label': 'controlled' }}
				color="primary"
			/>
			<Typography sx={{ fontFamily: 'Cascadia Code' }}>{modelName}</Typography>
			{loading ? <CircularProgress color="secondary" /> : <Answer answer={answer} />}
			
			{/* Question Attention for MCAN*/}
			{(answer && modelActive && mcan===true) &&
			<span>
				<div style={{"display":"flex","flexDirection":"row"}}>{questionAtt(question)}</div>
			</span>
			}

			<Typography sx={{ fontFamily: 'Cascadia Code', fontSize: '12px' }}>
				{!loading && timeTaken && `Took ${(timeTaken / 1000).toFixed(2)}`}
			</Typography>

{/* --------------------------------------------------------------------------------------------- */}
			
			{/* Feedback Form for both models */}
			{modelActive &&
			showFeedback && (
				<FeedbackForm handleRadioChange={handleRadioChange} sendFeedback={sendFeedback} feedback={feedback} />
			)}

{/* --------------------------------------------------------------------------------------------- */}

			{/* BASE 64 image SAAA model */}
			{(answer && modelActive && mcan===false) && <Paper component="img" className={classes.img} src={useAltImage ? `${alternateImageUrl}${imageIndex}`:`data:image/jpeg;base64,${base64Data}`} alt={`Image-${imageIndex}`} sx={{mt: 2, width: "100%", height: "auto"}}  />}
			
			{/* image with slider MCAN */}
			{(answer && modelActive && mcan===true && Object.keys(imageValues).length > 0 && Object.keys(coordValues).length > 0 ) && <DiscreteSlider constApiUrl= {VQA_URL} imageIndex={tempImageIndex} coords={coordValues} imgValues={imageValues}/>}
			{/* {(answer && modelActive && mcan===true) && <Paper component="img" className={classes.img} src={useAltImage ? `${alternateImageUrl}${imageIndex}`:`data:image/jpeg;base64,${base64Data}`} alt={`Image-${imageIndex}`} sx={{mt: 2, width: "100%", height: "auto"}}  />} */}
			<MySnackbar open={warningMessage !== ""} handleClose={handleWarningClose} msg={warningMessage} />
		</Paper>
	);
}

VQAModelPanel.propTypes = {
	modelName: PropTypes.string.isRequired,
	question: PropTypes.string.isRequired,
	apiUrl: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired,
	mcan:PropTypes.bool.isRequired
};
