import { useState } from "react";
import Header from "./components/Header"
import InputForm from "./components/InputForm"
import Table from "./components/Table"

const INPUT_DATA = [
  {id: "initialInvestment", label: "INITIAL INVESTMENT"},
  {id: "annualInvestment", label: "ANNUAL INVESTMENT"},
  {id: "expectedReturn", label: "EXPECTED RETURN"},
  {id: "duration", label: "DURATION"}
];

const getInitialFormValue = () => {
  const result = {};
  for(let data of INPUT_DATA) {
    result[data.id] = 0;
  }
  return result;
}

export default function App() {

  const [ formValue, setFormValue ] = useState(getInitialFormValue());

  const onChange = (event, id) => {
    setFormValue((prev) => {
      return {...prev, [id] : parseInt(event.target.value)};
    })
  }

  return (
    <>
      <Header id="header"></Header>
      <InputForm id="user-input" inputData={INPUT_DATA} onChange={onChange}></InputForm>
      <Table id="result" formData={formValue}></Table>
    </>
  );
}