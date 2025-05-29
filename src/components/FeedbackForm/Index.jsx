import * as React from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Slider, TextField } from '@mui/material';

// import { useFeedbackFormOpenStatus } from '../../contexts/FeedbackFormOpenStatusProvider';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	contents: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '14px',

		'& > div': {
			// border: "1px solid red",
			display: 'flex',
      		flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},

		'& button': {
			margin: '5px auto 0 auto',
		}
	}
});
/**
 * @function FeedbackForm
 * @type {React.FC<Props>}
 * @returns 
 */
export default function FeedbackForm({ handleRadioChange, sendFeedback, feedback }) {
	//   const [open, _setOpen] = useFeedbackFormOpenStatus()
	const classes = useStyles();

	// const handleClose = () => {
	//   setOpen(false);
	// };

	const handleChange = (e, field) => {
		let value = e.target.value;
		handleRadioChange(field, value);
	};

	const handleClose = (e) => {
		sendFeedback(e);
	};

	return (
		// <Box style={{ display: `${open ? "flex" : "none"}` }}>
		<Box style={{ display: `${true ? 'flex' : 'none'}` }}>
			<Paper elevation={5} sx={{ padding: 3, fontFamily: 'Cascadia Code', width: "100%" }}>
				<Box className={classes.contents}>
					<Box>
						Is the answer correct?:
						<RadioGroup
							row
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-answer-group"
							value={feedback['answer']}
							onChange={(e) => handleChange(e, 'answer')}
						>
							<FormControlLabel value="yes" control={<Radio />} label="Yes" />
							<FormControlLabel value="no" control={<Radio />} label="No" />
						</RadioGroup>
						{/* <Checkbox {...label} color="success" onChange={(e) => handleCheckboxChange("answer")} /> */}
					</Box>
					<Box>
						<span>Is the Attention Map Correct?:</span>
						<RadioGroup
							row
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-answer-group"
							value={feedback['attention']}
							onChange={(e) => handleChange(e, 'attention')}
						>
							<FormControlLabel value="yes" control={<Radio />} label="Yes" />
							<FormControlLabel value="no" control={<Radio />} label="No" />
						</RadioGroup>
						{/* <Checkbox {...label} color="success" onChange={(e) => handleCheckboxChange("answer")} /> */}
					</Box>
					{/* <Box>
            Is the attention corect?: 
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-attention-group"
              onChange={(e) => handleChange(e, "attention")}
              value={feedback["attention"]}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </Box> */}
					<Box>
						How relevant is the answer to the image?:
						<Slider
							aria-label="relevance_score"
							defaultValue={30}
							// getAriaValueText={valuetext}
							value={feedback['relevance_score']}
							onChange={(e) => handleChange(e, 'relevance_score')}
							valueLabelDisplay="auto"
							color="secondary"
							step={1}
							marks
							min={-1}
							max={4}
						/>
					</Box>

					<Box>
						<TextField
							id="filled-basic"
							label="Actual Answer(s)"
							color="secondary"
							variant="standard"
							value={feedback['user_answer']}
							onChange={(e) => handleChange(e, 'user_answer')}
              sx={{width: '100%'}}
						/>
					</Box>

					<Box>
						<TextField
							id="filled-basic"
							label="Explanation (Optional)"
							color="secondary"
							variant="standard"
							value={feedback['explanation']}
							onChange={(e) => handleChange(e, 'explanation')}
              sx={{width: '100%'}}
						/>
					</Box>

					<Box className="buttons">
						<Button onClick={handleClose} size="small" variant="contained">
							Done
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}
