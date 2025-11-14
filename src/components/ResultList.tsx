import { Col, Row } from "react-bootstrap";
import PartnerCard from "./ui/PartnerCard";
import React from 'react';

const ResultList = ({ filteredData }) => {
    return <Row md={1} lg={2} className="g-4">
        {filteredData.map((partner, _idx) => {
            return <Col key={_idx}>
                <PartnerCard
                    id={_idx}
                    photo={partner.photos[0]}
                    name={partner.name}
                    rating={partner.rating}
                    numberOfRating={partner.numberOfRating}
                    address={partner.address}
                    district={partner.district}
                    categories={partner.categories}
                    canViewDetail={true }
                />
            </Col>
        })}
    </Row>
}

// export default React.memo(ResultList)
export default ResultList