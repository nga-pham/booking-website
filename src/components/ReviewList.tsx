import { Row } from "react-bootstrap";
import Review from "../components/ui/Review";
import StarRating from "../components/ui/StarRating";

const ReviewList = ({ currentPartner }) => {
    const { rating, numberOfRating, reviews } = currentPartner

    return (
        <div className="text-start mt-5">
            <h3 style={{ fontWeight: 'bold' }}>Reviews</h3>
            <div style={{ fontSize: '1.25rem' }}><strong>{rating}</strong><StarRating />({numberOfRating})</div>

            {/*review list here*/}
            <Row className="mt-3">
                {reviews.map((review, _idx) => {
                    const { reviewer, date, time, comment, rating } = review
                    return (
                        <Review key={_idx}
                            reviewer={reviewer} date={date} time={time} comment={comment} rating={rating} />
                    )
                }) 
                }
            </Row>
        </div>
    )
}

export default ReviewList