import { Row, Col } from "react-bootstrap";

const OpeningTimes = ({ currentPartner }) => {
    const { openingTimes, additionalInfo } = currentPartner

    return (
        <Row className="text-start mt-5">
            <Col lg={6}>
                <h3 style={{ fontWeight: 'bold' }}>Opening Times</h3>
                {/*review list here*/}
                {openingTimes.map((review, _idx) => {
                    const { date, startTime, endTime } = review
                    return (
                        <Row key={_idx} className="d-flex justify-content-between">
                            <Col>{ date}</Col>
                            <Col>{startTime} - { endTime}</Col>
                        </Row>
                    )
                })
                }
            </Col>
            
            <Col lg={6}>
                <h3 style={{ fontWeight: 'bold' }}>Additional Info</h3>
                {/*information list here*/}
                {additionalInfo.map((info, _idx) => {
                    return <Row key={_idx}>{ info}</Row>
                })}
            </Col>

        </Row>
    )
}

export default OpeningTimes