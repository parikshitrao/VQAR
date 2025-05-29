import { Box, Paper, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import { getRandomDataPoint } from '../../utils/api_calls';
import { BLUR_RADIUS } from '../../utils/const';
import MySnackbar from '../MySnackbar/Index';
import { sendMouseHoverData } from '../../utils/helpers';

const useStyles = makeStyles((theme) => {
	return {
		imagePanel: {
			display: 'flex',
			flexDirection: 'column',
			margin: '5px auto',
			width: 'fit-content',
			justifyContent: 'flex-end',

			'& button': {
				margin: '4px 3px 12px 3px',
				fontFamily: 'Cascadia Code',

			}
		},

		img: {
			minHeight: 400,
			maxHeight: 650,
			maxWidth: 650,

			[theme.breakpoints.down('md')]: {
				maxHeight: 500,
				maxWidth: 500
			},
			[theme.breakpoints.down('sm')]: {
				maxHeight: 400,
				maxWidth: 400
			}
		},
		textField: {
			display: 'flex',
			flexDirection: 'column'
		}
	};
});

export default function ImagePanel({ maxImages, imageIndex, setImageIndex, apiUrl }) {
	const [ snackbarOpen, setSnackBarOpen ] = useState(false);
	const classes = useStyles();
	const split = 'val';
	const imageUrl = `${apiUrl}/image?imageIndex=${imageIndex}`;

	// This should handle Issue #2. May be the issue is browser specific.

	/**
	 * @function handleImageIndexChange
	 * @param {*} e
	 */
	function handleImageIndexChange(e) {
		let value = parseInt(e.target.value, 10);
		if (!value) {
			setSnackBarOpen(true);
			value = 1;
		}

		if (value > maxImages) {
			setSnackBarOpen(true);
			value = maxImages;
		}
		if (value < 1) {
			setSnackBarOpen(true);
			value = 1;
		}

		setImageIndex(value);
	}

  /**
   * @async
   * @function fetchRandomImage
   */
	async function fetchRandomImage() {
		let randomImageIndex = await getRandomDataPoint(split);
		setImageIndex(randomImageIndex);
	}

  /**
   * @function handleSnackbarClose
   */
	function handleSnackbarClose() {
		setSnackBarOpen(false);
	}

	const handleClick = (event) => {
		const image = event.target;
		const rect = image.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		console.log('Image coordinates:', x, y);
		sendMouseHoverData(apiUrl,{imageIndex,maxImages,x,y});
	};

	// const [imageDimensions, setImageDimensions] = useState({});
	// // const setImageSize = (setImageDimensions, imageUrl) => {
	// 	const pic = new Image();
	// 	pic.src = imageUrl;
	// 	pic.onload = () => {
	// 	  setImageDimensions({
	// 		height: pic.height,
	// 		width: pic.width
	// 	  });
	// 	};
	//  };


	// useEffect(() => {
	// 	const imgs = new Image();
	// 	imgs.src = imageUrl;
	// 		console.log(imgs.height);
	// 		console.log(imgs.width);

	//   }, [imageIndex]);


	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = (x) => {
		setIsHovered(false);
	};

	useEffect(() => {
		const sceneElements = document.querySelectorAll('.scene');
		const viewerElements = document.querySelectorAll('.viewer');

		document.body.classList.add('blur');

		sceneElements.forEach((item, index) => {
		  item.addEventListener('mousemove', (e) => {
			  var halfViewer = viewerElements[index].offsetWidth / 2;
			  var rect = e.target.getBoundingClientRect();
			  var x = e.clientX - rect.left - halfViewer;
			  var y = e.clientY - rect.top - halfViewer;
			  var xs = item.clientWidth;
			  var ys = item.clientHeight;

			  viewerElements[index].style.transform = `translate(${x}px, ${y}px)`;
			  viewerElements[index].style.backgroundPosition = `${-x}px ${-y}px`;
			  viewerElements[index].style.backgroundSize = `${xs}px ${ys}px`;
		  });
		  item.addEventListener('mouseout', (e) => {
			  viewerElements[index].style.backgroundSize = `0px 0px`;
		  });
		});
	}, []);
	return (
		<Box className={classes.imagePanel}>
			<MySnackbar
				open={snackbarOpen}
				handleClose={handleSnackbarClose}
				msg={`Image index must lie between ${1} and ${maxImages}`}
			/>
			<Box>
				<TextField
					id="outlined-number"
					label="Image Index"
					type="number"
					InputLabelProps={{
						shrink: true
					}}
					size="small"
					onChange={handleImageIndexChange}
					value={imageIndex}
					sx={{ mb: 1, mt: 1 }}
					className={classes.textField}
				/>
				{/* <Button color="secondary" variant="contained" size="small">
					 Fetch Image
				   </Button> */}
				<Button color="secondary" variant="contained" size="small" onClick={fetchRandomImage}>
					Fetch random Image
				</Button>
			</Box>
			{/* <Paper component="img" className={classes.img} src={imageUrl} alt={`Image-${imageIndex}`} onClick={handleClick} style={{filter: isHovered ? 'none' : 'blur(0)',transition: 'filter 0.05s ease', }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/> */}
			<div
				className="wrap"
				style={{
					position: 'relative',
					width: '650px',
					height: '650px',
					margin: '20px auto',
					cursor: 'pointer',
					overflow: 'hidden',
					border: '4px solid rgb(44,106,79)',
					boxShadow: '0 0 20px rgba(0,0,0,0.5)',
					// filter: isHovered ? 'none' : '1'
				}}
			>
				<div
					className="scene"
					style={{
					  position: 'absolute',
					  top: 0,
					  right: 0,
					  left: 0,
					  bottom: 0,
					  margin: 'auto',
					  background: '#1d1f20',
					  textAlign: 'center',
					  overflow: 'hidden',
					  backgroundImage: `url(${imageUrl})`,
					  backgroundPosition: '50% 50%',
					  backgroundRepeat: 'no-repeat',
					  backgroundSize: '650px 650px',
            filter: `blur(${BLUR_RADIUS})`
					}}
					onMouseMove={handleClick}
				></div>
				<div
					className="viewer"
					style={{
					  zIndex: 5,
					  position: 'absolute',
					  width: '200px',
					  height: '200px',
					  backgroundImage: `url(${imageUrl})`,
					  backgroundPosition: '50% 50%',
					  backgroundRepeat: 'no-repeat',
					  // backgroundSize: 'auto auto',
					  borderRadius: '50%',
					  pointerEvents: 'none',
					  opacity: isHovered? 0 : 1,
					  // filter: isHovered ? 'none' : '1',
					  transition: 'fade 0.5s ease'
					}}
				></div>
			</div>
		</Box>
	);
}

ImagePanel.propTypes = {
	maxImages: PropTypes.number.isRequired,
	imageIndex: PropTypes.number.isRequired,
	setImageIndex: PropTypes.func.isRequired,
	apiUrl: PropTypes.string.isRequired
};
