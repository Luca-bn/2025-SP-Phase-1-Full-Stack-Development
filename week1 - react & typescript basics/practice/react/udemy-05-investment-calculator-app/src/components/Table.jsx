const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });  

const calculateInvestmentResults = ({
    initialInvestment,
    annualInvestment,
    expectedReturn,
    duration,
  }) => {
  
    const annualData = [];
    let investmentValue = initialInvestment;
  
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      const investedCapital = initialInvestment + (annualInvestment * year);
  
      investmentValue += interestEarnedInYear + annualInvestment;
      annualData.push({
        year: year,
        investmentValue: investmentValue, 
        interest: interestEarnedInYear, 
        totalInterest: investmentValue - investedCapital,
        investedCapital: investedCapital
      });
    }
  
    return annualData;
  }

export default function Table({ id, formData, ...props }) {

    const tableData = calculateInvestmentResults(formData);

    return (
        <table id={id}>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Investment Capital</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableData.map(data => 
                        <tr key={data.year}>
                            <td>{data.year}</td>
                            <td>{formatter.format(data.investmentValue)}</td>
                            <td>{formatter.format(data.interest)}</td>
                            <td>{formatter.format(data.totalInterest)}</td>
                            <td>{formatter.format(data.investedCapital)}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}