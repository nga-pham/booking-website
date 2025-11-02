import { Card } from "react-bootstrap";
import { Star } from 'lucide-react';

interface ServiceCardProps {
    name: string | "";
    categories: string[] | [];
    rating: number | 0;
    numberOfRating: number | 0;
    address: string | "";
    district: string | "";
    photos: string | undefined;
    experience: number | 0;
    services: string[] | [];
    reviews: string[] | [];
    about: string | "";
    openingTimes: string | "";
    additionalInfo: string[] | [];
    recommended: boolean | false;
    dayToJoin: string | "";
    onClick?: () => void;
}

const ServiceCard = ({
    photos, name, rating, numberOfRating, address, district, experience, services
}: ServiceCardProps) => {
    return (
        <Card bg="light" style={{ width: "20rem" }}>
            <Card.Img variant="top" src={photos} />
            <Card.Body>
                <Card.Title><p style={{ color: '#000', textAlign: 'left' }}>{name}</p></Card.Title>
                <Card.Text style={{ color: '#000', textAlign: 'left', fontSize: '1rem', fontWeight: 'bold' }}>
                    {rating}
                    <Star fill="orange" strokeWidth={0} size={12} style={{ marginBottom: '0.25rem' }} />
                    ({numberOfRating})
                </Card.Text>
                <Card.Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{`${address ? address : ""}${district ? `, ${district}` : ""}`}</Card.Text>
                <Card.Text style={{ color: '#000' }}>{experience} years experience</Card.Text>
                <Card.Text style={{ color: '#000' }}>{services.map(skill => (
                    <span key={skill} style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', fontSize: '0.875rem' }}>{skill}</span>
                ))}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ServiceCard;