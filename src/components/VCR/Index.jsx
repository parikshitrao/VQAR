import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import ImagePanel from '../ImagePanel/Index';
import { R2C_HOME_URL } from '../../utils/const';
import VCRInput from '../VCRInput/Index';
import VCRModelPanel from '../ModelPanel/VCRPanel';
import { fetchRandomQuestions } from '../../utils/helpers';

// const useStyles = makeStyles((theme) => {
// 	return {
// 		wrapper: {}
// 	};
// });


/**
 * @component
 * Displays imagepanel and VCR model components
 * @returns
 */
export default function VCR() {
	const [ imageIndex, setImageIndex ] = useState(1);
	// 40469, 4054
	const [ maxImages ] = useState(0);
	let task="vcr"
	const [ sampleQuestions, setSampleQuestions ] = useState(['','']);
	const [ data, setData ] = useState({
		question: '',
		answers: [ '', '', '', '' ],
		rationales: [ '', '', '', '' ]
	});

	useEffect(
		() => {
			fetchRandomQuestions(imageIndex, task).then(setSampleQuestions);
			//console.log("Aloha"+sampleQuestions[0])
		},
		[ imageIndex ]
	);


	useEffect(
		() => {
			console.log("Aloha"+sampleQuestions[0])
			setData({...data,question:sampleQuestions[0],answers:[sampleQuestions[1],sampleQuestions[2],sampleQuestions[0],sampleQuestions[1]],rationales:[sampleQuestions[2],sampleQuestions[0],sampleQuestions[1],sampleQuestions[2]]});
			//setData({...data,})
		},
		[ sampleQuestions]
	);


	/**@type {string} */
	const vcrMode = 'QA_R';

	return (
		<Box>
			<ImagePanel
				maxImages={maxImages}
				imageIndex={imageIndex}
				setImageIndex={setImageIndex}
				apiUrl={R2C_HOME_URL}
			/>
			<VCRInput data={data} setData={setData} />
			<Box>
				<VCRModelPanel
					modelName={'From Recognition to Cognition'}
					apiUrl={R2C_HOME_URL}
					data={data}
					imageIndex={imageIndex}
					vcrMode={vcrMode}
				/>
			</Box>
		</Box>
	);
}
