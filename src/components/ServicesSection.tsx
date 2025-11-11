import { Carousel, Container, Row, Stack, Tab, Tabs } from "react-bootstrap";
import partners from "../data/partners.json";
import { districts } from "../lib/utils";
import PartnerCard from "./ui/PartnerCard";

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
                        {recommendedBlocks.map((block, _idx) => (
                            <Carousel.Item key={_idx }>
                                <Stack
                                    key={_idx}
                                    direction="horizontal"
                                    className="h-100 justify-content-center align-items-center"
                                    gap={3}
            >
                                    {block.map((partner, _idx) => (
                                        <PartnerCard
                                            key={_idx}
                                            id={partner.id}
                                            photo={partner.photos[0]}
                                            name={partner.name}
                                            rating={partner.rating}
                                            numberOfRating={partner.numberOfRating}
                                            address={partner.address}
                                            district={partner.district}
                                            categories={partner.categories}
                                            canViewDetail={false }
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
                        {newBlocks.map((block, _idx) => (
                            <Carousel.Item key={_idx}>
                                <Stack
                                    key={_idx}
                                    direction="horizontal"
                                    className="h-100 justify-content-center align-items-center"
                                    gap={3}
                                >
                                    {block.map((partner, _idx) => (
                                        <PartnerCard
                                            key={_idx }
                                            id={partner.id}
                                            photo={partner.photos}
                                            name={partner.name}
                                            rating={partner.rating}
                                            numberOfRating={partner.numberOfRating}
                                            address={partner.address}
                                            district={partner.district}
                                            categories={partner.categories}
                                            canViewDetail={false }
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
                        {districts.map((district, _idx) => (
                            <Tab key={_idx} eventKey={district} title={district}>
                                <Carousel key={_idx} data-bs-theme="dark">
                                    {partners.map((partner, _idx) => {
                                    if (partner.district === district) {
                                        return (
                                            <Carousel.Item key={_idx}><PartnerCard 
                                                key={_idx}
                                                id={partner.id}
                                                photo={partner.photos[0]}
                                                name={partner.name}
                                                rating={partner.rating}
                                                numberOfRating={partner.numberOfRating}
                                                address={partner.address}
                                                district={partner.district}
                                                categories={partner.categories}
                                                canViewDetail={false }
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