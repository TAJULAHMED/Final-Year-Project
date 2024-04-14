import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label } from 'recharts';
import { FaInfoCircle } from 'react-icons/fa'; 
import { Row, Col, OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';

function PredPrices({ predPrices, price }) {
    if (predPrices === null) {
        return null; 
    }

    const data = Object.entries(predPrices).map(([year, value]) => ({
        year,
        value
    }));

    const predValue = predPrices[Object.keys(predPrices)[0]]; 

    const percentageDifference = ((price - predValue) / predValue) * 100;

    let riskLabel = "";
    let textColor = ""; 
    let riskText = "";

    if (percentageDifference < -5) {
        riskLabel = "Good Price";
        textColor = "green";
        riskText = "The listed price is more than 5% lower than the predicted value, suggesting a potentially great deal. This might be due to various factors like the seller's need to sell quickly. It's a favorable situation for buyers, though due diligence is recommended."
    } else if (percentageDifference > 5) {
        riskLabel = "Bad Price";
        textColor = "red";
        riskText = "The listed price exceeds the predicted value by more than 5%, indicating it may be overpriced. Possible reasons could include a high demand area or unique features of the property. Buyers should proceed with caution and consider negotiating."
    } else {
        riskLabel = "Decent Price";
        textColor = "orange";
        riskText = "The listed price is within 5% of the predicted value, indicating it aligns with market expectations. This suggests a fair deal based on current data, where the price accurately reflects the property's market value."
    }

    const cautionMessage = (
        <BootstrapTooltip id="caution-tooltip">
            Please note that the investment advice and risk assessments provided here are based on predictive models and market data available at the time of analysis. While these insights are crafted with care and aim to assist in informed decision-making, they should not be used as the sole basis for making investment decisions.
        </BootstrapTooltip>
    );

    const infoButtonStyle = {
        background: 'none',
        border: 'none',
        color: 'inherit', 
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7em', 
    };

    return (
        <Row>
            <Col xs={12} md={6}>
                <LineChart
                    width={600} 
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
                            <p className="font-weight-bold" style={{ fontSize: '1.6em' }}>
                                Price: <span style={{ color: textColor }}>£{price}</span>
                                <OverlayTrigger placement="right" overlay={cautionMessage}>
                                    <button style={infoButtonStyle}>
                                        <FaInfoCircle />
                                    </button>
                                </OverlayTrigger>
                            </p>
                            <p style={{ fontSize: '1.2em' }}>Risk: <span style={{ color: textColor }}>{riskLabel}</span></p>
                            <p>{riskText}</p> 
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default PredPrices;
