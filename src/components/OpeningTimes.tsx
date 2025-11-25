import { Row, Col } from "react-bootstrap";
import { Circle, Check } from 'lucide-react';


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
                            <Col><Circle size={12} fill="#78D240" color="#78D240" style={{marginRight: '1rem'}} />{date}</Col>
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
                    return (
                        <div key={_idx}>
                            <Check size={12} style={{ marginRight: '1rem' }} />{info}
                        </div>
                    )
                })}
            </Col>

        </Row>
    )
}

export default OpeningTimes