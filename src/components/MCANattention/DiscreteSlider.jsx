import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Boundingbox from "./Boundingbox";
// import PropTypes, { number } from 'prop-types';
//import { fetchBoundingBoxAtt } from '../../utils/helpers';



/**
 * 
 * @param {string} constApiUrl contains the MCAN URL
 * @param {number} imageIndex contains the index of the image
 * 
 * @returns Local(), Slider, Displays attention values
 */
export default function DiscreteSlider({constApiUrl,imageIndex,coords,imgValues}) {
  const imageUrl = `${constApiUrl}/image?imageIndex=${imageIndex}`;
  const [loadDynamicComp, setLoadDynamicComp] = React.useState(1);
  const [jsonCoords, setJsonCoords] = useState({});
  const [jsonValues, setJsonValues] = useState({});
  const [indicesArray, setIndicesArray] = useState([]);
  const [sortedCoords, setSortedCoords] = useState([]);
  const [len, setLen] = useState(0);
  const [value, setValue] = useState(1);
  //const [value, setValue] = useState(1);
  
  // if( Object.keys(coords).length > 0){
  //   console.log( Object.keys(coords).length);
    
  //   //console.log ("jsonValues: " + jsonValues);
  // }
  
  
  function displayImage(imageUrl,sortedCoords,number){
    /** @type {Array.<Array.<number>>} We are slicing the sorted Decending array of Bounding boxes coordinated */
    let str = sortedCoords.slice(0,number);
    //console.log(str)
    /** 
     * @typedef {object} params
     *  @property {string} params.image
     *  @property {Array.<Array.<number>>} params.box
     *  @property {object} params.options
     *      @property {object} params.options.colors
     *          @property {string} params.options.colors.normal
     *          @property {string} params.options.colors.selected
     *          @property {string} params.options.colors.unselected
     *      @property {object} params.options.style
     *          @property {string} params.options.style.maxWidth
     *          @property {string} params.options.style.maxHeight
     */
    const params = {
      image:imageUrl,
      boxes: str,
      //boxes[1].label = jsonValues[i]
      //boxes: [{coord:[jsonCoords[0][0],jsonCoords[0][1],jsonCoords[0][2],jsonCoords[0][3]], label: jsonValues[0] }],
      options: {
        colors: {
          normal: "rgba(255,0,0,1)"
          //selected: "rgba(0,225,204,1)",
          //unselected: "rgba(100,100,100,0)"
        },
        style: {
          maxWidth: "100%",
          maxHeight: "100%"
        }
        // showLabels: false
      }
    };
    return <Boundingbox image={params.image} boxes={params.boxes} options={params.options} />;
  }
    
      useEffect(() => {
        //setValue(1);
        if( Object.keys(imgValues).length > 0){
          //console.log( Object.keys(imgValues).length);
          setJsonCoords(coords);
          setJsonValues(imgValues);
          //console.log ("jsonValues: " + jsonValues);
        }
      },[imgValues])

      useEffect(() => {
        if(Object.keys(jsonValues).length > 0){
          let tempLen = jsonValues.length;
          let indices = new Array(tempLen);
          //console.log("number of bounding boxes: "+tempLen);
          for (let i = 0; i < tempLen; ++i) indices[i] = i;
          indices.sort(function (a, b) { return jsonValues[a] < jsonValues[b] ? -1 : jsonValues[a] > jsonValues[b] ? 1 : 0; });
          setIndicesArray(indices);
          setLen(tempLen);
        }
      },[jsonValues])

      useEffect(() => {
        if(indicesArray.length>0 ){
          //console.log("indicesArray: "+imgValues)
          let jsonInput = jsonCoords;
          for(let i=0; i<len; i++){
              jsonInput[i][2] = Math.abs(jsonInput[i][2]-jsonInput[i][0]);
              jsonInput[i][3] = Math.abs(jsonInput[i][3]-jsonInput[i][1]);
          }

          let  arraySorted = new Array(len);
          for (let i = 0; i < arraySorted.length; i++) {
              arraySorted[i] = new Array(4);
          }
          /** sorting coordinates according to values of attention in acending order*/
          for(let i=0;i<len;i++){
              let j = indicesArray[i];
              for(let k=0;k<4;k++)
                  arraySorted[i][k] = jsonInput[j][k];
          }
          arraySorted.push([0,0,0,0])
          /** An array to store reverse of arraySorted (decending order) */
          let tempSorted = new Array(len+1);
          for(let i=0;i < len+1;i++){
              tempSorted[i] = arraySorted[len-i];
          }
          
          //console.log("tempSorted" + tempSorted);
          setSortedCoords(tempSorted);
        }
      },[indicesArray])
    
  /**
   * @function displayAttValues
   * This Function displays the number of attention values based on the value given in input
   * @param {number} i The number of attention values that need to be displayed
   * @returns an Array of jsx elements containing Attention values of the bounding boxes
   */
  function displayAttValues(i){
    if(jsonCoords !== undefined){
      let attValue = [];
      let j=0
      for( j=2; j<=i; j++){
        attValue[(j-1)] = jsonValues[indicesArray[len-j+1]]
        if (attValue[j-1] != null){
          //console.log(attValue[j-1])
          attValue[j-1] = ((attValue[j-1])*1).toFixed(3)
        }
      }
      return attValue.map((attValue,index) => <div key={index}>&nbsp;{attValue},&nbsp;</div>);
      // return attValue.map((attValue) => <div style={{color: colorArray[i-2]}}>&nbsp;{attValue},&nbsp;</div>);
    }
  };
  
  
  return (
    <>
    {loadDynamicComp ? (
    <div fallback={<div>displayImage(imageUrl,sortedCoords,0)</div>}>
    {
      displayImage(imageUrl,sortedCoords,loadDynamicComp)
    }
    </div> 
    ) : null
    }

    <Box style={{ display: "flex", "alignItems": "center", "justifyContent": "center", margin: "0px" }} sx={{ width: "95%" }}>
          <span style={{ flex: "1", padding: "1px 15px 1px 2px" }}>Boundingbox</span>
          {(len>0)&&
            <Slider
              aria-label="Temperature"
              value={typeof value === 'number' ? value : 1}
              valueLabelDisplay= "auto"
              valueLabelFormat={value => <div>{value-1}</div>}
              // value={value}
              step={1}
              marks={true}
              min={1}
              max={Math.floor(7)}
              //max={Math.floor((len+1)/4)}
              onChange={(e,val) => {
                // setValue(val);
                setValue(val);
                setLoadDynamicComp(val);
              }} 
              />}
      </Box>
      {loadDynamicComp ? (
                <div>
                <div style={{ display: "flex","flexWrap": "wrap"}}>Attention:&nbsp; {displayAttValues(loadDynamicComp)}</div>
                </div>
            ) : null
    }
      </>
  );
}
