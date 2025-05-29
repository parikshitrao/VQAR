/**@type {string} MockAPI URL*/
export const MOCK_API = process.env.REACT_APP_MOCK_API_URL;

/**@type {string} VCR URL */
export const R2C_HOME_URL = (process.env.REACT_APP_DEMO) ? MOCK_API : 'http://10.5.0.96:5000';

/**@type {string} Mockapi Url else SAAA Url*/
export const PLAIN_VQA = process.env.VQA_URL;

export const VQA_URL = (process.env.REACT_APP_DEMO) ? MOCK_API : "http://10.5.0.96:4444/vqa";

export const BLUR_RADIUS = process.env.REACT_APP_BLUR_RADIUS;
