import { array, number } from "prop-types";
import React from "react";
import { fetchMaxImages,fetchPredictionNew, fetchSampleQuestions, onlyLettersAndNumbers } from "./helpers";

const apiURL = "http://10.5.0.96:4444/vqa"
const imageIndex = "233";
let total_images = -1;

it("Fetch Max Images", async function() {
    console.log("Fetch Max Images");
    const response = fetchMaxImages(apiURL);
    total_images = await response;
    console.log(total_images);
    expect(typeof total_images.max_images).toEqual('number')
    expect(total_images.max_images).toBeGreaterThan(0);
})

// it("Fetch Image", async function(){
//     const apiURL = "http://10.5.0.96:4444"
//     let imageIndex = "233";
    
    
// })

it("Fetch Sample Questions", async function(){
    console.log("Fetch Sample Questions");
    const response =  fetchSampleQuestions(apiURL,imageIndex);
    let questions = await response;
    console.log(questions)
    for (let i=0; i < 3; i++) {
        questions[i] = questions[i].slice(0, -1); 
        expect(questions[i]).toEqual(expect.stringMatching(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/));
    }
})

it("Fetch SAAA Prediction Data", async function(){
    console.log("Fetch SAAA Prediction Data");
    let question = 'what is the man holding?';
    let model_number = "0";
    let predictionData = {imageIndex, question, model_number};
    const response =  fetchPredictionNew(apiURL,predictionData);
    let data = await response;
    console.log(data);
    expect(data.answer).toEqual(expect.stringMatching(/^[A-Za-z0-9 _]*$/));
    /** Check if it is base 64 encoded */
    expect(data.attention_data).toEqual(expect.stringMatching(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/));

})

it("Fetch MCAN Prediction Data", async function(){
    console.log("Fetch MCAN Prediction Data");
    let question = 'what is the man holding?';
    let model_number = "1";
    let predictionData = {imageIndex, question, model_number};
    const response =  fetchPredictionNew(apiURL,predictionData);
    let data = await response;
    console.log(data);
    let totalCoords = Object.keys(data.attention_data.coordinates).length;
    let totalValues = Object.keys(data.attention_data.image_values).length;
    let totalQAValues = Object.keys(data.attention_data.question_values).length;
    expect(data.answer).toEqual(expect.stringMatching(/^[A-Za-z0-9 _]*$/));
    expect(totalCoords).toEqual(totalValues);
    expect(totalQAValues).toEqual(14);
})



