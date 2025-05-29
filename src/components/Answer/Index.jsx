import PropTypes from "prop-types"
import { Box, Chip } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from "react";

/**
 * @function Answer returns Answer inside jsx elements 
 * @returns 
 */
export default function Answer({answer, showMeta=true}) {
    /** @type {string}  */
    let metaLabel = showMeta ? "Answer: " : ""

    const [flag, setFlag] = useState(false);
    /** chip is visible only if there is an answer */
    useEffect(() => {
        setFlag(true);
        //console.log(answer)
        if(answer === ''){
            setFlag(false);
        }
      },[answer])
    
  return (
      <Box>
          {metaLabel} {(flag) && <Chip variant="filled" color="warning" label={answer} sx={{fontFamily: "Cascadia Code"}}/>}
      </Box>
  )
}

Answer.propTypes = {
    answer: PropTypes.string.isRequired,
}