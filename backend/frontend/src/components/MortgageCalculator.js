import React, { useState } from 'react';

// Component for the morgage calculator
function MortgageCalculator() {
    const [homeValue, setHomeValue] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanDuration, setLoanDuration] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCalculator, setShowCalculator] = useState(false);

    const loanAmount = homeValue && downPayment ? homeValue - downPayment : 0;

    const calculateMortgage = (e) => {
        e.preventDefault();

        if (!homeValue || !downPayment || !interestRate || !loanDuration) {
            setErrorMessage('Please enter valid values for all fields.');
            setMonthlyPayment(null);
            return;
        }

        if (!isNaN(homeValue) && !isNaN(downPayment) && !isNaN(interestRate) && !isNaN(loanDuration)) {
            const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
            const numberOfPayments = loanDuration * 12;

            const calculatedMonthlyPayment = 
                loanAmount *
                (monthlyInterestRate *
                Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

            setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
            setErrorMessage('');
        } else {
            setMonthlyPayment(null);
            setErrorMessage('Invalid input. Please enter numbers only.');
        }
    };

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title mb-1" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setShowCalculator(!showCalculator)}>
                        Mortgage Calculator <span>{showCalculator ? '▼' : '▲'}</span>
                    </h3>
                    {showCalculator && (
                        <div>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={calculateMortgage}>
                                <div className="mb-3 mt-3">
                                    <label className="form-label">Home Value:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={homeValue}
                                        onChange={e => setHomeValue(parseFloat(e.target.value) || '')}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Down Payment:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={downPayment}
                                        onChange={e => setDownPayment(parseFloat(e.target.value) || '')}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Interest Rate (%):</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        value={interestRate}
                                        onChange={e => setInterestRate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Loan Duration (Years):</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={loanDuration}
                                        onChange={e => setLoanDuration(parseInt(e.target.value, 10) || '')}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Calculate</button>
                            </form>

                            {loanAmount > 0 && (
                                <p className="mt-3">Loan Amount: <strong>${loanAmount}</strong></p>
                            )}

                            {monthlyPayment !== null && (
                                <div className="alert alert-info mt-3">
                                    <h4>Monthly Payment: ${monthlyPayment}</h4>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MortgageCalculator;
