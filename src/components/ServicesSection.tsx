import { Badge, Card, Carousel, Container, Row, Stack, Tab, Tabs } from "react-bootstrap";
import partners from "../data/partners.json";
import PartnerCard from "./ui/PartnerCard";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const lengthOfCarouselItem = 3;

// First get recommended partners, then group them into chunks of `lengthOfCarouselItem`
let recommendedPartners =
    // add id to each partner for key prop
    partners.map((partner, _idx) => ({ ...partner, id: _idx }))
        // then choose only recommended partners
        .filter(partner => partner.recommended)

// [[partner1, partner2, partner3], [partner4, partner5]]
let recommendedSlides = [];
for (let i = 0; i < recommendedPartners.length; i += lengthOfCarouselItem) {
    recommendedSlides.push(recommendedPartners.slice(i, i + lengthOfCarouselItem));
}

// First get new partners, then group them into chunks of `lengthOfCarouselItem`
// Convert dates to timestamps for comparison
const todayTimestamps = Date.parse(new Date().toISOString());
// If dayToJoin is within last 365 days, consider as new partner
const gap = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
let newPartners = partners.map((partner, _idx) => ({ ...partner, id: _idx }))
    // then choose only new partners
    .filter(partner => todayTimestamps - Date.parse(partner.dayToJoin) <= gap)

let newSlides = []
for (let i = 0; i < newPartners.length; i += lengthOfCarouselItem) {
    newSlides.push(newPartners.slice(i, i + lengthOfCarouselItem));
}


// NOTE: `useNavigate` must be called inside a component (hooks cannot be used at module scope).
// `handlePartnerClick` will be defined inside the component below where `navigate` is available.

const ServicesSection = () => {
    // handle navigation to partner detail page
    const navigate = useNavigate();
    const handlePartnerClick = (index: number) => {
        navigate(`/results/${index}`);
    };

    return (
        <section className="py-5 partner-card-container">
            <Container>
                {/* Recommended Nannies Carousel */}
                <Row className="mb-4">
                    <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left', }}>
                        Recommended
                    </h2>

                    <Carousel indicators={false} interval={null} className="custom-carousel">
                        {recommendedSlides.map((slide, slideIndex) => (
                            <Carousel.Item key={slideIndex}>
                                <div className="row g-4">
                                    {slide.map((partner, partnerIndex) => {
                                        const actualIndex = slideIndex * 3 + partnerIndex;
                                        return <PartnerCard key={actualIndex} partner={partner} id={actualIndex} onClick={() => handlePartnerClick(actualIndex)} />
                                    })}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>
                {/* New Nannies Carousel */}
                <Row className="mb-4">
                    <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left', }}>
                        New Nannies
                    </h2>
                    <Carousel indicators={false} interval={null} className="custom-carousel">
                        {newSlides.map((slide, slideIndex) => (
                            <Carousel.Item key={slideIndex}>
                                <div className="row g-4">
                                    {slide.map((partner, partnerIndex) => {
                                        const actualIndex = slideIndex * 3 + partnerIndex;
                                        return <PartnerCard key={actualIndex} partner={partner} id={actualIndex} onClick={() => handlePartnerClick(actualIndex)} />
                                    })}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>
            </Container>
        </section>
    )
};

export default ServicesSection;