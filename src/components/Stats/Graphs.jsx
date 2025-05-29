import React from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Stack, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Title,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

function createData(name, attention_Correct, false_Attention) {
    return { name, attention_Correct,false_Attention };
  }
  

  
  


export default function Graphs(name, JsonData) {
    let total_count = 0;
    let count_matrix_ans_att = [0,0,0,0]//tt,tf,ft,ff
    const re_score = [0,0,0,0,0];
    const answer_count = [0,0];
    const attention_count = [0,0];
    JsonData.map((info)=>{
            //Counting answers from json
            if(info.feedback.answer === "no"){
                answer_count[1] = answer_count[1] + 1;
                total_count += 1;
                if(info.feedback.attention === "no"||null){
                    count_matrix_ans_att[3] += 1;
                }else{
                    count_matrix_ans_att[2] += 1;
                }
            }else{
                answer_count[0] = answer_count[0] + 1;
                total_count += 1;
                if(info.feedback.attention === "no"||null){
                    count_matrix_ans_att[1] += 1;
                }else{
                    count_matrix_ans_att[0] += 1;
                }
            }

            //Counting attention from json
            if(info.feedback.attention === "no"||null){
                attention_count[1] = attention_count[1] + 1;
            }else{
                attention_count[0] = attention_count[0] + 1;
            }

            //Counting relevency score from json
            var score = info.feedback.relevance_score;
            re_score[score] = re_score[score] +1;
            return 0;
        }
    )
    
    console.log("Answer Count: "+answer_count);
    console.log("Attention Count: "+attention_count);
    console.log("Relevancy Score: "+re_score);

    const ansData = [
        { argument: 'Yes', value: answer_count[0] },
        { argument: 'No', value: answer_count[1] },
        // { argument: 'Wednesday', value: 10 },
        // { argument: 'Thursday', value: 50 },
        // { argument: 'Friday', value: 60 },
      ];
    const attData = [
        { argument: 'Yes', value: attention_count[0] },
        { argument: 'No', value: attention_count[1] },
        // { argument: 'Wednesday', value: 10 },
        // { argument: 'Thursday', value: 50 },
        // { argument: 'Friday', value: 60 },
    ];


    const relevanceData = [
        { argument: '0', value: re_score[0] },
        { argument: '1', value: re_score[1] },
        { argument: '2', value: re_score[2] },
        { argument: '3', value: re_score[3] },
        { argument: '4', value: re_score[4] },
    ];

    let tt = (count_matrix_ans_att[0]/total_count)*100;
    let tf = (count_matrix_ans_att[1]/total_count)*100;
    let ft = (count_matrix_ans_att[2]/total_count)*100;
    let ff = (count_matrix_ans_att[3]/total_count)*100;

    const rows = [
        createData('Correct_Answer', tt.toFixed(2)+'%', tf.toFixed(2)+'%'),
        createData('False_Answer', ft.toFixed(2)+'%', ff.toFixed(2)+'%'),
    ];

    return(
        // <h2>Hello</h2>
        <>
        <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 'auto',
          height: 'auto'
        }
      }}
    >
      <Paper elevation={3}  style = {{padding:'20px 50px'}} >
        <h2 style={{textAlign: "center",'padding-bottom': '25px', color:"#2C6A4F"}}>{name}</h2>
      <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Chart
            data={ansData}
            
            
            >
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="value" argumentField="argument" />
            <Title text="Answer" />
            <Animation />
            </Chart>

            <Chart
            data={attData}
            
            >
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="value" argumentField="argument" />
            <Title text="Attention" />
            <Animation />
            </Chart>

            <Chart
            data={relevanceData}
            width={400}
            >
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="value" argumentField="argument" />
            <Title text="Relevency Score" />
            <Animation />
            </Chart>


            <TableContainer component={Paper} sx={{height:'auto', width:'auto'}}>
                <Table sx={{ minWidth: 300 }} >
                    <TableHead sx={{height:166}} >
                    <TableRow >
                        <TableCell sx={{'font-size': '18px'}}>Data Collected</TableCell>
                        <TableCell align="center" sx={{'font-size': '19px'}}>Attention Correct</TableCell>
                        <TableCell align="center" sx={{'font-size': '19px'}}>Attention False</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 },height:166}}
                        >
                        <TableCell component="th" scope="row" sx={{'font-size': '20px'}}>
                            {row.name}
                        </TableCell >
                        <TableCell align="center" sx={{'font-size': '25px'}}>{row.attention_Correct}</TableCell>
                        <TableCell align="center" sx={{'font-size': '25px'}}>{row.false_Attention}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
        </Paper>
    </Box>
        
        </>
    );

    }