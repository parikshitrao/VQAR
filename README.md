# VQAR Analyzer

`A web based to tool to analyse, understand and test Visuo-Textual Models.`

## Running

If (mock-api)[https://github.com/parikshitrao/vqar-mock-api] is installed then
it can be run with `npm run demo`. Else, `npm start` should do the trick.

`REACT_APP_BLUR_RADIUS` controls the blurring of the image.

E.g., `REACT_APP_BLUR_RADIUS=4px npm run demo` should start the app with `4px` radius
where image is visible and rest blurred.

## Models Used

    - Visual Question Answering (VQA)
        - Show Attend Ask and Answer (SAAA)
        - Deep Modular Co-Attention Networks (MCANs)
    - Visual Commonsense Reasoning (VCR)
        - Recognition to Cognition (R2C)

## Features

    - Custom question testing.
    - Simultaneously test all models of a kind.
    - User feedback on the model predictions.
    - Human in the loop testing
