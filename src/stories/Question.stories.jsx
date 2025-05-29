import Question from "../components/Question/Index"

export default {
    title: "Question",
    component: Question
}

const Template = (args) => <Question {...args}/>

export const SampleQuestion = Template.bind({})
SampleQuestion.args = {
    question: "Is this a sample question?",
    // questionChangeHandler: (e) => {}
}