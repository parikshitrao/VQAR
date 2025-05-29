import React from 'react'
import Box from '@mui/material/Box';
import FullWidthTabs from './FullWidthTabs';

/** Complete Faq page */
export default function FAQs() {
  
  return (
    <Box sx={{ alignItems: 'center',display:'flex',flexDirection: 'column',textAlign: 'center', width: "80%",margin:'auto'}}>
      <h1 style={{margin:"15px 0px 10px 0px"}}>FAQs</h1>
      <h3 style={{margin:"5px 0px 10px 0px"}}>Frequently Asked Questions</h3>
      <h4 style={{margin:"5px 0px 20px 0px"}}>Here are some commonly asked questions about our VQA and VCR models</h4>      
      <FullWidthTabs/>

    </Box>
  )
}



