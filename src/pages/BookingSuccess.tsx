import { useLocation, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookingSuccess = () => {
  const location = useLocation();
  const { email, date, time, vendorName, paidAmount } = location.state || {};

  if (paidAmount === 0)
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main>
          <Container>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
              <Card className="shadow-lg border-0" style={{ maxWidth: "600px", width: "100%" }}>
                <Card.Body className="p-5 text-center">
                  <div className="mb-4 d-flex justify-content-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#8bca84",
                      }}
                    >
                      <CheckCircle size={48} color="white" />
                    </div>
                  </div>

                  <h1 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
                    Payment failed
                  </h1>

                  <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                    An error occurred during payment processing.
                  </p>

                  {vendorName && (
                    <div className="mb-4 p-4 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                      <h3 className="fw-semibold mb-3">Booking Details</h3>
                      <p className="mb-2">
                        <strong>Vendor:</strong> {vendorName}
                      </p>
                      {date && (
                        <p className="mb-2">
                          <strong>Date:</strong> {date}
                        </p>
                      )}
                      {time && (
                        <p className="mb-2">
                          <strong>Time:</strong> {time}
                        </p>
                      )}
                      {email && (
                        <p className="mb-0">
                          <strong>Confirmation sent to:</strong> {email}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="d-flex flex-column gap-3 mb-4">
                    <Link to="/" className="text-decoration-none">
                      <Button
                        variant="outline"
                        className="w-100 d-flex align-items-center justify-content-center gap-2"
                        size="lg"
                      >
                        <ArrowLeft size={20} />
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="py-5 flex-grow-1" style={{ backgroundColor: "#F8F9FA" }}>
        <Container>
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <Card className="shadow-lg border-0" style={{ maxWidth: "600px", width: "100%" }}>
              <Card.Body className="p-5 text-center">
                <div className="mb-4 d-flex justify-content-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#8bca84",
                    }}
                  >
                    <CheckCircle size={48} color="white" />
                  </div>
                </div>

                <h1 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
                  Booking Confirmed!
                </h1>

                <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                  Your appointment has been successfully scheduled.
                </p>

                {vendorName && (
                  <div className="mb-4 p-4 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                    <h3 className="fw-semibold mb-3">Booking Details</h3>
                    <p className="mb-2">
                      <strong>Vendor:</strong> {vendorName}
                    </p>
                    {date && (
                      <p className="mb-2">
                        <strong>Date:</strong> {date}
                      </p>
                    )}
                    {time && (
                      <p className="mb-2">
                        <strong>Time:</strong> {time}
                      </p>
                    )}
                    {email && (
                      <p className="mb-0">
                        <strong>Confirmation sent to:</strong> {email}
                      </p>
                    )}
                  </div>
                )}

                <div className="d-flex flex-column gap-3 mb-4">
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <Button
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                      size="lg"
                      style={{ backgroundColor: "#8bca84" }}
                    >
                      <Mail size={20} />
                      Check Email Confirmation
                    </Button>
                  </a>

                  <Link to="/" className="text-decoration-none">
                    <Button
                      variant="outline"
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                      size="lg"
                    >
                      <ArrowLeft size={20} />
                      Back to Home
                    </Button>
                  </Link>
                </div>

                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  A detailed confirmation email with all booking information has been sent to your email address.
                </p>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSuccess;
