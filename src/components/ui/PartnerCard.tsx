import { Star } from 'lucide-react';
import { Badge, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import StarRating from "../ui/StarRating"

// properties for each partners from partners.json
interface PartnerCardProps {
    id: number | 0;
    partner: any | undefined
    onClick?: () => void;
}

// id is index of each partner in partners.json
const PartnerCard = ({ partner, id } : PartnerCardProps) => {
    const { photos, name, rating, numberOfRating, address, categories } = partner
    return (
        <div key={id} className="col-md-4">
            <Card
                className="h-100 border-0 shadow-sm cursor-pointer transition-all hover:shadow-lg"
                style={{ cursor: "pointer" }}
            >
                {/* Partner Image */}
                <div style={{ height: "200px", overflow: "hidden" }}>
                    <Card.Img
                        variant="top"
                        src={photos[0]}
                        alt={name}
                        style={{
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    />
                </div>

                <Card.Body className="p-4">
                    {/* Partner Name */}
                    <h5 className="font-bold mb-2" style={{ fontSize: "1.1rem" }}>
                        {name}
                    </h5>

                    {/* Rating */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <span className="font-semibold">{rating.toFixed(1)}</span>
                        <Star size={16} fill="#FFC107" color="#FFC107" />
                        <span className="text-muted">({numberOfRating})</span>
                    </div>

                    {/* Address */}
                    <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                        {address}
                    </p>

                    {/* Categories */}
                    <div className="d-flex gap-2 flex-wrap">
                        {categories.slice(0, 2).map((category, idx) => (
                            <Badge
                                key={idx}
                                bg="light"
                                text="dark"
                                className="px-3 py-1"
                                style={{
                                    fontWeight: "normal",
                                    fontSize: "0.85rem",
                                    border: "1px solid #dee2e6"
                                }}
                            >
                                {category}
                            </Badge>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

/* const PartnerCard = ({
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
} */

export default PartnerCard;