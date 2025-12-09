import { Card, Carousel, Container } from "react-bootstrap";
import testimonials from "../data/testimonials.json";
import StarsRating from "./ui/StarsRating";

const Testimonials = () => {
  // Group testimonials into slides of 3
  const lengthOfCarouselItem = 3;

  const slides = [];
  for (let i = 0; i < testimonials.length; i += lengthOfCarouselItem) {
    slides.push(testimonials.slice(i, i + lengthOfCarouselItem));
  }

  return (
    <section className="py-5" style={{ backgroundColor: "#F8F9FA" }}>
      <Container>
        <h2 className="text-4xl font-bold mb-5">Testimonials</h2>
        <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left', }}>
          Testimonials
        </h2>

        <style>{`
          .testimonials-carousel .carousel-control-prev,
          .testimonials-carousel .carousel-control-next {
            width: 48px;
            height: 48px;
            background-color: white;
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
            opacity: 1;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
          .testimonials-carousel .carousel-control-prev {
            left: -24px;
          }
          .testimonials-carousel .carousel-control-next {
            right: -24px;
          }
          .testimonials-carousel .carousel-control-prev-icon,
          .testimonials-carousel .carousel-control-next-icon {
            width: 20px;
            height: 20px;
            filter: invert(1);
          }
          .testimonials-carousel .carousel-control-prev:hover,
          .testimonials-carousel .carousel-control-next:hover {
            background-color: white;
            opacity: 0.9;
          }
        `}</style>

        <Carousel indicators={false} interval={null} className="testimonials-carousel">
          {slides.map((slide, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <div className="row g-4">
                {slide.map((testimonial, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <Card
                      className="h-100 border-0 p-4"
                      style={{
                        backgroundColor: "#F0F0F0",
                        borderRadius: "16px",
                        minHeight: "320px"
                      }}
                    >
                      {/* Stars */}
                      <div><StarsRating rating={testimonial.rating} /></div>


                      {/* Title */}
                      <h4 className="font-bold mb-3" style={{ fontSize: "1.25rem" }}>
                        {testimonial.title}
                      </h4>

                      {/* Description */}
                      <p className="text-muted mb-4 flex-grow-1" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                        {testimonial.description}
                      </p>

                      {/* Author */}
                      <div className="d-flex align-items-center gap-3 mt-auto">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="rounded-circle"
                          style={{ width: "48px", height: "48px", objectFit: "cover" }}
                        />
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Testimonials;
