import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import ImagePanel from '../ImagePanel/Index';
import Question from '../Question/Index';
import { getMaxNoOfImages, getRandomDataPoint } from '../../utils/api_calls';
import VQAModelPanel from '../ModelPanel/VQAPanel';
import { fetchVocabulary } from '../../utils/helpers';
import { VQA_URL } from '../../utils/const';
import SampleQuestions from '../SampleQuestions/Index';
import { makeStyles } from '@mui/styles';
import { useVocab } from '../../contexts/VocabProvider';
import MySnackbar from '../MySnackbar/Index';

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		modelPanels: {
			[theme.breakpoints.up('sm')]: {
				display: 'flex',
				width: '100%'
			},
			[theme.breakpoints.down('md')]: {
				flexDirection: 'column'
			}
		}
	};
});

export default function VQA() {
	const classes = useStyles();
	const [ maxImages, setMaxImages ] = useState(0);
	const [ question, setQuestion ] = useState('');
	const [ split ] = useState('val');
	const [ vocab, setVocab ] = useVocab();
	const [ warningOpen, setWarningOpen ] = useState(false);
	const [ warningMessage, setWarningMessage ] = useState('');
	// const saaaHomeUrl = process.env.REACT_APP_DEMO ? MOCK_API : SAAA_HOME_URL;
	// const mcanHomeUrl = process.env.REACT_APP_DEMO ? MOCK_API : MCAN_HOME_URL;
	 const isFirst  = useState(true);
	let index = 1;
	const [ imageIndex, setImageIndex ] = useState(isFirst ? 1 : index);

	useEffect(
		() => {
			getMaxNoOfImages(split).then((maxNumber) => {
				setMaxImages(maxNumber);
			});
		},
		[ split ]
	);

	// Fetch vocab from the server
	useEffect(() => {
		fetchVocabulary(VQA_URL).then((v) => {
			setVocab(v);
		});
		getRandomDataPoint(split).then(imid => setImageIndex(imid))
		
		// index = imageIndex;
	}, []);

	/**
	 * @function validateQuestion get word by word from the input field and make it into an array
	 * @param {string} question 
	 * @returns @type {Array.<string>}
	 */
	function validateQuestion(question) {
		if(question[question.length -1] !== " "){
			return []
		}
		let words = question.split(' ');
		let invalidWords = [];
		for (let word of words) {
			if (!vocab.includes(word.toLowerCase())) {
				invalidWords.push(word);
			}
		}

		return invalidWords;
	}

	function questionChangeHandler(e) {
		let invalidWords = validateQuestion(e.target.value);
		// console.log(invalidWords)
		if(invalidWords.length !== 0){
			let msg = `The words [${invalidWords.join()}] are not found in the vocab. They'll be replaced with UNK`;
			setWarningMessage(msg);
			setWarningOpen(true)
		}
		setQuestion(e.target.value);
	}

	function handleWarningClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setWarningOpen(false);
	}

	return (
		<Box className={classes.wrapper}>
			<ImagePanel
				maxImages={maxImages}
				imageIndex={imageIndex}
				setImageIndex={setImageIndex}
				apiUrl={VQA_URL}
			/>
			<SampleQuestions task="vqa" imageIndex={imageIndex} />
			<Question question={question} questionChangeHandler={questionChangeHandler} />
			
			<Box className={classes.modelPanels}>
				<VQAModelPanel
					modelName="Show Ask Attend and Answer"
					apiUrl={VQA_URL}
					question={question}
					imageIndex={imageIndex}
					mcan={false}
				/>
				<VQAModelPanel
					modelName="Deep Modular Co-attention"
					apiUrl={VQA_URL}
					question={question}
					imageIndex={imageIndex}
					mcan={true}
				/>
			</Box>
			<MySnackbar open={warningOpen} handleClose={handleWarningClose} msg={warningMessage}/>
		</Box>
	);
}
