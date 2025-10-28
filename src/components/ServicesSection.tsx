import { Container, Row, Carousel, Stack, Card, Tabs, Tab} from "react-bootstrap";
import nannies from "../nannies.json"
import { Star } from 'lucide-react';

interface ServiceCardProps {
    photos: string | undefined;
    name: string | "";
    rating: number | 0;
    numberOfRating: number | 0;
    address: string | "";
    district: string | "";
    experience: number | 0;
    services: string[] | [];
    onClick?: () => void;
}

const ServiceCard = ({
    photos, name, rating, numberOfRating, address, district, experience, services
}: ServiceCardProps) => {
    return (
    <Card bg="light" style={{ width: "20rem" }}>
                      <Card.Img variant="top" src={photos} />
                      <Card.Body>
                        <Card.Title><p style={{color: '#000', textAlign: 'left'}}>{name}</p></Card.Title>
                        <Card.Text style={{color: '#000', textAlign: 'left', fontSize: '1rem', fontWeight: 'bold' }}>
                        {rating}
                        <Star fill="orange" strokeWidth={0} size={12} style={{ marginBottom: '0.25rem' }} />
                        ({numberOfRating})
                        </Card.Text>
                        <Card.Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{`${address ? address : ""}${district ? `, ${district}` : ""}`}</Card.Text>
                        <Card.Text style={{ color: '#000'}}>{experience} years experience</Card.Text>
                        <Card.Text style={{ color: '#000'}}>{services.map(skill => (
                                <span key={skill} style={{marginRight: '0.5rem', padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', fontSize: '0.875rem'}}>{skill}</span>
                            ))}</Card.Text>
                      </Card.Body>
                    </Card>
    )
}

const lengthOfCarouselItem = 3;

// First get recommended nannies, then group them into chunks of `lengthOfCarouselItem`
  let recommendedBlocks = [];
  for (let i = 0; i < nannies.length; i += lengthOfCarouselItem) {
      recommendedBlocks.push(
          nannies.filter(nanny => nanny.recommended)
              .slice(i, i + lengthOfCarouselItem)
      );
  }

// First get new nannies, then group them into chunks of `lengthOfCarouselItem`
// Convert dates to timestamps for comparison
const todayTimestamps = Date.parse(new Date().toISOString());
let newBlocks = [];
// If dayToJoin is within last 365 days, consider as new nanny
const gap = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
for (let i = 0; i < nannies.length; i += lengthOfCarouselItem) {
    newBlocks.push(
        nannies.filter(nanny => todayTimestamps - Date.parse(nanny.dayToJoin) <= gap)
              .slice(i, i + lengthOfCarouselItem)
    )
}

// Group nannies by district
const districts = Array.from(new Set(nannies.map(nanny => nanny.district)));

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
                                    {block.map((nanny, idx) => (
                                        <ServiceCard
                                            key={idx}
                                            photos={nanny.photos}
                                            name={nanny.name}
                                            rating={nanny.rating}
                                            numberOfRating={nanny.numberOfRating}
                                            address={nanny.address}
                                            district={nanny.district}
                                            experience={nanny.experience}
                                            services={nanny.services}
                                        />
                                    ))}
                </Stack>
              </Carousel.Item>
                        )) }
                    </Carousel>
                </Row>
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
                                    {block.map((nanny, idx) => (
                                        <ServiceCard
                                            key={idx}
                                            photos={nanny.photos}
                                            name={nanny.name}
                                            rating={nanny.rating}
                                            numberOfRating={nanny.numberOfRating}
                                            address={nanny.address}
                                            district={nanny.district}
                                            experience={nanny.experience}
                                            services={nanny.services}
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
                                {nannies.map((nanny) => {
                                    if (nanny.district === district) {
                                        return (
                                            <Carousel.Item><ServiceCard
                                                photos={nanny.photos}
                                                name={nanny.name}
                                                rating={nanny.rating}
                                                numberOfRating={nanny.numberOfRating}
                                                address={nanny.address}
                                                district={nanny.district}
                                                experience={nanny.experience}
                                                services={nanny.services}
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