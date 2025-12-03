import { Col, Row } from "react-bootstrap";
import PartnerCard from "./ui/PartnerCard";
import { useNavigate } from "react-router-dom";

const ResultList = ({ filteredData }) => {

    // handle navigation to partner detail page
        const navigate = useNavigate();
        const handlePartnerClick = (index: number) => {
            navigate(`/results/${index}`);
        };

    return <Row md={1} lg={2} className="g-4">
        {filteredData.map((partner, _idx) => {
            return (
                <PartnerCard
                    id={_idx}
                    partner={partner}
                    onClick={() => handlePartnerClick(_idx)}
                />
            )
        })}
    </Row>
}

export default ResultList