import { Card } from "react-bootstrap";

// properties for each service from "services" props in partners.json
interface ServiceCardProps {
    id: number | 0;
    name: string | "";
    duration: string | "";
    cost: number | 0;
}

const ServiceCard = ({ id, name, duration, cost }: ServiceCardProps) => {
    return (
        <Card style={{ width: "50rem", textAlign: 'left', borderRadius: '1rem' }} className="mt-3 py-0 px-2" key={id}>
            <Card.Body>
                <Card.Title><p style={{ color: '#000', fontSize: '1.1rem' }}>{name}</p></Card.Title>
                <Card.Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>{duration}</Card.Text>
                <Card.Text style={{ fontSize: '1rem' }}>{cost.toString()} VND</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ServiceCard