import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label } from 'recharts';

import { Card, Row, Col } from "react-bootstrap";

function PredPrices({ predPrices, price }) {
    // Check if predPrices is null and return nothing if true
    if (predPrices === null) {
        return null; // or return <></> for an empty fragment
    }

    const data = Object.entries(predPrices).map(([year, value]) => ({
        year,
        value
    }));

    const predValue = predPrices[Object.keys(predPrices)[0]]; // Get the first predicted value

    // Calculate the percentage difference between price and the predicted value
    const percentageDifference = ((price - predValue) / predValue) * 100;

    // Define labels based on the percentage difference
    let riskLabel = "";
    let textColor = ""; // Text color based on risk label

    if (percentageDifference < -5) {
        riskLabel = "Good Price";
        textColor = "green";
    } else if (percentageDifference > 5) {
        riskLabel = "Bad Price";
        textColor = "red";
    } else {
        riskLabel = "Decent Price";
        textColor = "orange";
    }

    return (
        <Row>
            <Col xs={12} md={6}>
                <LineChart
                    width={600} // Adjust the width as needed
                    height={400}
                    data={data}
                    margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year">
                        <Label value="Year" position="bottom" offset={0} />
                    </XAxis>
                    <YAxis>
                        <Label
                            value="Predicted Price"
                            angle={-90}
                            position="insideLeft"
                            dx={-25}
                            dy={40}
                        />
                    </YAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <ReferenceLine y={price} stroke="red">
                        <Label
                            value={`Listed Price (${riskLabel})`}
                            position="insideTopRight"
                            angle={0}
                            dy={-20}
                            fill="red"
                            fontSize={12}
                        />
                    </ReferenceLine>
                </LineChart>
            </Col>
            <Col xs={12} md={12} lg={12} xl={6}>
                <Row>
                    <Col>
                        <div>
                            <p className="font-weight-bold" style={{ fontSize: '1.6em' }}>Price: <span style={{ color: textColor }}>£{price}</span></p>
                            <p style={{ fontSize: '1.2em' }}>Risk: <span style={{ color: textColor }}>{riskLabel}</span></p>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default PredPrices;
