import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FAQ from './FAQ'
import { useState } from 'react';


/** @type {React.FC<props>} */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

/**
 * @function a11yProps 
 * @param {number} index 
 * @returns It returns props for each tab 
 */
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


/** This component renders Tabs for FAQ page along with the questions */
export default function FullWidthTabs() {

  //VQA Questions
  /** 
   * @type {string}
   * @constant
   */
  const q1 = "What is VQA task?";
  const a1 = "Visual question answering(vqa) is a multi modal task involving computer vision and NLP. We show an image to model, ask questions about that image to the model and model answers it.";
  const q2 = "What am I supposed to do?";
  const a2 = "In VQA, after fetching the image, you are supposed to ask a question about the image and hit evaluate, the 2 models answers to your question, upon which you are supposed to fill the feedback form about the model performance. For better understanding, the attention maps of the model will be displayed, as in where the model is focusing.";
  const q3 = "What is relevance score?";
  const a3 = "It is about how relevant is model's answer/approach to the question, even when the model is wrong, there could be very good reason why model answered that wrong even with a correct approach, probably due to the visual similarity between the answer by model and original answer. Example is model thinking dog with hair as lion,Similarly when model gives correct answer, but it is not focusing on correct areas, then the relevance is less.";
  const q4 = "What are answer and explanation fields in the form?";
  const a4 = "Give the correct answer in the answer field (one word) and explanation is what you think about model's answer. Explanation could be you explaining about relevance, model's attention etc.";

  //VCR Questions
  /** 
   * @type {string}
   * @constant
   */
  const vcrq1 = "What is VCR task?";
  const vcra1 = "Visual commonsense reasoning is a new task for congnitive level visual understanding. For more insights about the task and dataset, you may visit visualcommonsense.com";
  const vcrq2 = "What am I supposed to do?";
  const vcra2 = "Unlike VQA, this a multiple choice kind of task, where after asking a question, you need to provide 4 answers of which one is correct and 4 rationales explaining the rationale for the answer. The model responds with {answer} I think, beacuse {rationale}, the {answer} will be from 4 options you give and similarly the {rationale} will be from 4 rationales you give.";
  const vcrq3 = "What are the boxes and indices on the boxes?";
  const vcra3 = "The indices and boxes represents the objects that you can ask questions about, you must be seeing number on the boxes. An example question would be: Why is 1 pointing at 2?";
  const vcrq4 = "What is the Feedback here?";
  const vcra4 = "Similar to the VQA task, here also you report the relevance of answer and rationale chosen, what is the correct answer and rationale.";

  //-------------------------------------------------------
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [tvalue, setTValue] = useState(0);

  function toggleSetTValue(){
    if(tvalue === 0){
      setTValue(1);
    }else{
      setTValue(0);
    }
  }

  const handleChange = (event, newValue) => {
    toggleSetTValue();
    setValue(newValue);
    //toggleSetTValue();
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{bgcolor:'white', color:'black'}}
        >
          <Tab label="Visual Question Answering" {...a11yProps(0)} />
          <Tab label="Visual Commonsense Reasoning" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {FAQ(q1,a1,tvalue)}
          {FAQ(q2,a2,tvalue)}
          {FAQ(q3,a3,tvalue)}
          {FAQ(q4,a4,tvalue)}

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        {FAQ(vcrq1,vcra1,tvalue)}
        {FAQ(vcrq2,vcra2,tvalue)}
        {FAQ(vcrq3,vcra3,tvalue)}
        {FAQ(vcrq4,vcra4,tvalue)}
        
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
    </Box>
  );
}
