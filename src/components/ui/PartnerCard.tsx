import { Star } from 'lucide-react';
import { Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import StarRating from "../ui/StarRating"

// properties for each partners from partners.json
interface PartnerCardProps {
    id: number | 0;
    photo: string | undefined;
    name: string | "";
    rating: number | 0;
    numberOfRating: number | 0;
    address: string | "";
    categories: string[] | [];
    district: string | "";
    canViewDetail: boolean | false;
    onClick?: () => void;
}

// id is index of each partner in partners.json
const PartnerCard = ({
    id, photo, name, rating, numberOfRating, address, categories, district, canViewDetail
}: PartnerCardProps) => {

    // go to detail page to book
    const navigate = useNavigate();
    const goToDetail = (partnerIdx: number) => {
        navigate(`/results/${partnerIdx}`)
    }

    return (
        <Card bg="light" style={{ width: "25rem", textAlign: 'left' }} key={id }>
            <Card.Img variant="top" src={photo} />
            <Card.Body>
                <Card.Title><p style={{ color: '#000'}}>{name}</p></Card.Title>
                <Card.Text style={{ color: '#000', fontSize: '1rem', fontWeight: 'bold' }}>
                    {rating}
                    <StarRating />
                    ({numberOfRating})
                </Card.Text>
                <Card.Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{`${address ? address : district}`}</Card.Text>
                <Card.Text style={{ color: '#000' }}>{categories.map(category => (
                    <span key={category} style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', fontSize: '0.875rem' }}>{category}</span>
                ))}</Card.Text>
                {canViewDetail ? <Button variant="info" onClick={() => goToDetail(id)}>View detail</Button> : null}
            </Card.Body>
        </Card>
    )
}

export default PartnerCard;