import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchRandomQuestions } from '../../utils/helpers';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			marign: '5px auto',
			textAlign: 'center',
			padding: '15px',
			fontFamily: 'Cascadia Code',
			fontSize: '13px',
			boxShadow: 'inset 1px 1px 6px gray',
			maxWidth: 600,
			width: 600,

			[theme.breakpoints.down('md')]: {
				width: 480
			},
			[theme.breakpoints.down('sm')]: {
				width: 380
			}
		}
	};
});

/**
 * @component Displays sample questions
 * @returns jsx elements
 */
export default function SampleQuestions({ task, imageIndex }) {
	const classes = useStyles();
	const [ sampleQuestions, setSampleQuestions ] = useState([]);
	useEffect(
		() => {
			fetchRandomQuestions(imageIndex, task).then(setSampleQuestions);	
		},
		[ imageIndex ]
	);


	return (
		<Box className={classes.wrapper}>
			<Typography variant="h6" sx={{ fontFamily: 'Cascadia Code' }}>
				Sample Questions
			</Typography>
			{sampleQuestions.map((item) => {
				// console.log(item+"yoyo")
				return (
					<Accordion key={item} expanded={false}>
						<AccordionSummary sx={{ color: '#118834' }}>{item}</AccordionSummary>
						<AccordionDetails sx={{ color: '#2345b0', fontWeight: 'bold', textAlign: 'left' }}>
							Answer
						</AccordionDetails>
					</Accordion>
				);
			})}
		</Box>
	);
}
