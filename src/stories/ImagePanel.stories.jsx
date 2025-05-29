import {ImagePanel} from "../components/ImagePanel/Index";
import React from "react";
import { Box, Paper, Button, TextField, Snackbar, Alert } from '@mui/material';
export default {
    title: "Image Panel",
    component: ImagePanel,
    argTypes: {
        imageIndex:{control: { type: 'number', min:1, max:2, step: 1 } },
        
    },
};

//export const Sample = () => <ImagePanel maxImages={2} imageIndex={1} setImageIndex={(e) => {}} apiUrl= {'http://10.5.0.92:5002'}/>

const Template = args => <ImagePanel {...args}/>;
export const Default =  Template.bind({});
Default.args = {
    maxImages: 2,
    imageIndex: 1,
    setImageIndex:1 , 
    apiUrl: 'http://10.5.0.96:5555/'

}

//export const Sample = () => <ImagePanel maxImages={2} imageIndex={1} setImageIndex={1} apiUrl={'http://10.5.0.92:5002'}/>
