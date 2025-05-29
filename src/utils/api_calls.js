import { VQA_URL } from "./const";
import { getRandomInt } from "./helpers";
//NOTE: I think we are not using split variable

/**
 * @async
 * @function getMaxNoOfImages Get the total number of images in a data split
 * @param {string} split
 */
export async function getMaxNoOfImages(split) {
    try {
      let response = await fetch(VQA_URL);
      let data = await response.json();
      return data.max_images;
    } catch (err) {
      throw err;
    }
}
/**
 * @async
 * @function getDataPoint it returns image
 * @param {string} split
 * @param {number} imageIndex
 * @returns
 */
export async function getDataPoint(split, imageIndex) {
  return imageIndex;
}

/**
 * @async
 * @function getRandomDataPoint gets a random image index
 * @param {string} split
 * @param {?number} maxImages
 * @returns
 */
export async function getRandomDataPoint(split, maxImages = null) {
    if (!maxImages){
      maxImages = await getMaxNoOfImages(split);
    }
  let imageIndex = getRandomInt(1, maxImages+1);
  return await getDataPoint(split, imageIndex);
}
