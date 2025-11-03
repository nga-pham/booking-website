import { Container, Row, Carousel, Stack, Card, Tabs, Tab} from "react-bootstrap";
import nannies from "../nannies.json"
import { Star } from 'lucide-react';
import { districts } from "../lib/utils";
import partners from "../data/partners.json"; 
import ServiceCard from "./ui/ServiceCard";

/*interface ServiceCardProps {
    photo: string | undefined;
    name: string | "";
    rating: number | 0;
    numberOfRating: number | 0;
    address: string | "";
    district: string | "";
    categories: string[] | [];
    onClick?: () => void;
}

const ServiceCard = ({
    photo, name, rating, numberOfRating, address, district, categories
}: ServiceCardProps) => {
    return (
    <Card bg="light" style={{ width: "20rem" }}>
                      <Card.Img variant="top" src={photo} />
                      <Card.Body>
                        <Card.Title><p style={{color: '#000', textAlign: 'left'}}>{name}</p></Card.Title>
                        <Card.Text style={{color: '#000', textAlign: 'left', fontSize: '1rem', fontWeight: 'bold' }}>
                        {rating}
                        <Star fill="orange" strokeWidth={0} size={12} style={{ marginBottom: '0.25rem' }} />
                        ({numberOfRating})
                        </Card.Text>
                        <Card.Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{`${address ? address : ""}${district ? `, ${district}` : ""}`}</Card.Text>
                <Card.Text style={{ color: '#000' }}>{categories.map(skill => (
                                <span key={skill} style={{marginRight: '0.5rem', padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', fontSize: '0.875rem'}}>{skill}</span>
                            ))}</Card.Text>
                      </Card.Body>
                    </Card>
    )
}*/

const lengthOfCarouselItem = 3;

// First get recommended partners, then group them into chunks of `lengthOfCarouselItem`
let recommendedBlocks = [];
for (let i = 0; i < partners.length; i += lengthOfCarouselItem) {
    recommendedBlocks.push(
        // add id to each partner for key prop
        partners.map((partner, _idx) => ({ ...partner, id: _idx }))
            // then choose only recommended partners
            .filter(partner => partner.recommended)
            // then group them into chunks
            .slice(i, i + lengthOfCarouselItem)
      );
}

// First get new partners, then group them into chunks of `lengthOfCarouselItem`
// Convert dates to timestamps for comparison
const todayTimestamps = Date.parse(new Date().toISOString());
let newBlocks = [];
// If dayToJoin is within last 365 days, consider as new partner
const gap = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
for (let i = 0; i < partners.length; i += lengthOfCarouselItem) {
    newBlocks.push(
        // add id to each partner for key prop
        partners.map((partner, _idx) => ({ ...partner, id: _idx }))
            // then choose only recommended partners
            .filter(partner => todayTimestamps - Date.parse(partner.dayToJoin) <= gap)
            // then group them into chunks
            .slice(i, i + lengthOfCarouselItem)
    )
}


const ServicesSection = () => {
    return (
        <section className="py-5">
            <Container>
                {/* Recommended Nannies Carousel */} 
                <Row className="mb-4">
                    <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left', }}>
                        Recommended
                    </h2>
                    <Carousel data-bs-theme="dark">
                        {recommendedBlocks.map(block => (
                            <Carousel.Item>
                                <Stack
                                    direction="horizontal"
                                    className="h-100 justify-content-center align-items-center"
                                    gap={3}
            >
                                    {block.map(partner => (
                                        <ServiceCard
                                            id={partner.id}
                                            photo={partner.photos[0]}
                                            name={partner.name}
                                            rating={partner.rating}
                                            numberOfRating={partner.numberOfRating}
                                            address={partner.address}
                                            district={partner.district}
                                            categories={partner.categories}
                                        />
                                    ))}
                                </Stack>
                            </Carousel.Item>
                        )) }
                    </Carousel>
                </Row>
                {/* New Nannies Carousel */}
                <Row className="mb-4">
                    <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left', }}>
                        New Nannies
                    </h2>
                    <Carousel data-bs-theme="dark">
                        {newBlocks.map(block => (
                            <Carousel.Item>
                                <Stack
                                    direction="horizontal"
                                    className="h-100 justify-content-center align-items-center"
                                    gap={3}
                                >
                                    {block.map(partner => (
                                        <ServiceCard
                                            id={partner.id}
                                            photo={partner.photos}
                                            name={partner.name}
                                            rating={partner.rating}
                                            numberOfRating={partner.numberOfRating}
                                            address={partner.address}
                                            district={partner.district}
                                            categories={partner.categories}
                                        />
                                    ))}
                                </Stack>
                                </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>

                {/* Show nannies by Districts Tabs */}   
                <Row className="mb-4">
                    <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left', }}>
                        Browse by Districts
                    </h2>
                    <Tabs defaultActiveKey="home" fill>
                        {districts.map(district => (
                            <Tab eventKey={district} title={district}>
                                <Carousel data-bs-theme="dark">
                                    {partners.map((partner) => {
                                    if (partner.district === district) {
                                        return (
                                            <Carousel.Item><ServiceCard
                                                id={partner.id}
                                                photo={partner.photos[0]}
                                                name={partner.name}
                                                rating={partner.rating}
                                                numberOfRating={partner.numberOfRating}
                                                address={partner.address}
                                                district={partner.district}
                                                categories={partner.categories}
                                            />
                                            </Carousel.Item>
                                        )
                                    }
                                })}
                                </Carousel>
                            </Tab>
                            
                        ) )}
                    </Tabs>
                </Row>
            </Container>
        </section>
    )
};

export default ServicesSection;