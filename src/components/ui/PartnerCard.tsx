import { Star } from 'lucide-react';
import { Badge, Button, Card } from "react-bootstrap";


// properties for each partners from partners.json
interface PartnerCardProps {
    id: number | 0;
    partner: any | undefined
    onClick?: () => void;
}

// id is index of each partner in partners.json
const PartnerCard = ({ partner, id, onClick } : PartnerCardProps) => {
    const { photos, name, rating, numberOfRating, address, categories } = partner || {}
    const imageSrc = (photos && photos.length > 0) ? photos[0] : "https://www.pikpng.com/pngl/m/154-1540525_male-user-filled-icon-my-profile-icon-png.png"
    const displayRating = typeof rating === 'number' ? rating.toFixed(1) : (rating ? String(rating) : '0.0')
    const displayCategories = Array.isArray(categories) ? categories : []
    return (
        <div key={id} className="col-md-4">
            <Card
                className="h-100 border-0 shadow-sm transition-all hover:shadow-lg"
                style={{ cursor: "pointer" }}
                onClick={onClick}
            >
                {/* Partner Image */}
                <div style={{ height: "200px", overflow: "hidden" }}>
                    <Card.Img
                        variant="top"
                        src={imageSrc}
                        alt={name || 'partner image'}
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
                        {name || 'No name'}
                    </h5>

                    {/* Rating */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <span className="font-semibold">{displayRating}</span>
                        <Star size={16} fill="#FFC107" color="#FFC107" />
                        <span className="text-muted">({numberOfRating})</span>
                    </div>

                    {/* Address */}
                    <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                        {address || ''}
                    </p>

                    {/* Categories */}
                    <div className="d-flex gap-2 flex-wrap">
                        {displayCategories.slice(0, 2).map((category, idx) => (
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

export default PartnerCard;