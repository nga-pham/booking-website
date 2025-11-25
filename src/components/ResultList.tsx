import { Col, Row } from "react-bootstrap";
import PartnerCard from "./ui/PartnerCard";
import React from "react";

const ResultList = ({ filteredData }) => {
    console.log(filteredData)
    return <Row md={1} lg={2} className="g-4">
        {filteredData.map((partner, _idx) => {
            return (
                <PartnerCard
                    id={_idx}
                    partner={partner}
                />
            )
        })}
    </Row>
}

// export default React.memo(ResultList)
export default ResultList