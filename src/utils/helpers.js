import { MOCK_API, VQA_URL } from './const';

/**
 * @function getRandomInt get random number in between min & max
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
/**
 * @async
 * @function fetchPrediction fetch prediction data from backend
 * @param {string} apiUrl
 * @param {object} predictionData
 * 	@param {number} predictionData.imageIndex
 * 	@param {string} pridictionData.question
 * @returns
 */
export async function fetchPrediction(apiUrl, predictionData) {
	let response = await fetch(`${apiUrl}/predict`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(predictionData)
	});
	let data = await response.json();
	return data;
}

export async function fetchWordAtt(apiUrl){
	let response = await fetch(`${apiUrl}/attention_question`)
	let data = await response.json();
	//console.log(data);
	return data;
}

export async function fetchBoundingBoxAtt(apiUrl){
	let response = await fetch(`${apiUrl}/attention_image`)
	let data = await response.json();
	//console.log("bboxAtt: "+data);
	return data;
}

/**
 * @async
 * @function fetchRandomQuestions We use it to get sample questions from backend
 * only for vqa as VCR doesn't have
 * @param {number} imageIndex
 * @param {string} task
 * @returns
 */
export async function fetchRandomQuestions(imageIndex, task = 'vqa') {
	let apiUrl;
	if (task === 'vqa') {
		apiUrl = VQA_URL;
	} else {
		apiUrl = MOCK_API;
		// let last2Str = String(imageIndex).slice(-2);
		// let last2Num = Math.round(Number(last2Str));
		// imageIndex = last2Num;
	}
  	//console.log("fetchRandomQuestions", apiUrl, VQA);
	let response = await fetch(`${apiUrl}/sample-questions?imageIndex=${imageIndex}`);
	let data = await response.json();
	return data.random_questions;
}


/**
 * @async
 * @function sendUserFeedback we set the current time &
 * then we send feedback input to backend
 * @param {string} apiUrl
 * 
 * @param {object} data
 * 	@param {string} data.cookieUserID
 * 	@param {object} data.feedback
 * 		@param {string} data.feedback.answer
 * 		@param {*} data.feedback.attention
 * 		@param {number} data.feedback.relevance_score
 * 		@param {string} data.feedback.user_answer
 * 		@param {string} data.feedback.explaination
 * 	@param {number} data.imageIndex
 * 	@param {string} data.question
 * 	@param {string} data.answer
 * 	@returns
 */
export async function sendUserFeedback(apiUrl, data) {
	console.log("Sending feedback: ");
	console.log(data);

	let today = new Date().toISOString().slice(0, 10);
	let timestamp = {
		date: today,
		time: new Date().toLocaleTimeString(),
		timestamp: Date.now()
	};

	data["timestamp"] = timestamp;
	let response = await fetch(`${apiUrl}/feedback`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	console.log("feedback response"+response)

	if(response === 1){
		return ;
	}else{
		return ;
	}
	
}

/**
 * @async
 * @function fetchVocabulary we use it to get vocab from backend
 * @param {string} apiUrl
 * @returns
 */
export async function fetchVocabulary(apiUrl) {
	try {
		let response = await fetch(`${apiUrl}/vocab`);
		let vocab = await response.json();

		return vocab;
	} catch (err) {
		return [];
	}
}

export async function fetchMaxImages(apiUrl) {

	let response = await fetch(`${apiUrl}`);
	let vocab = await response.json();
	return vocab;
}

export async function fetchSampleQuestions(apiUrl,imageIndex) {

	let response = await fetch(`${apiUrl}/sample-questions?imageIndex=${imageIndex}`);
	let data = await response.json();
	return data;
}

export async function fetchPredictionNew(apiUrl, predictionData) {
	let response = await fetch(`${apiUrl}/predict`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(predictionData)
	});
	let data = await response.json();
	return data;
}


export async function sendMouseHoverData(apiUrl, data) {
	console.log("Sending feedback: ");
	console.log(data);

	let today = new Date().toISOString().slice(0, 10);
	let timestamp = {
		date: today,
		time: new Date().toLocaleTimeString(),
		timestamp: Date.now()
	};

	data["timestamp"] = timestamp;
	let response = await fetch(`${apiUrl}/hover`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	console.log("feedback response"+response)

	if(response === 1){
		return ;
	}else{
		return ;
	}
	
}

// export function onlyLettersAndNumbers(str) {  
// 	return Boolean(str.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/));  
// }
