import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label } from 'recharts';
import { FaInfoCircle } from 'react-icons/fa'; 
import { Row, Col, OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';

// Component which shows the user the predicted prices of the property they have chosen in a graph format
function PredPrices({ predPrices, price }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        fontSize: '1em',
    };

    return (
        <Row>
            <Col xs={12}>
                <div style={{ width: '100%', minHeight: '400px' }}>
                    <LineChart
                        width={windowWidth > 768 ? 600 : windowWidth - 30} 
                        height={400}
                        data={data}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
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
                </div>
            </Col>
            <Col xs={12}>
                <div>
                    <p className="font-weight-bold" style={{ fontSize: '1.6em', marginTop: '20px' }}>
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
    );
}

export default PredPrices;
