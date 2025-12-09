import { Col } from "react-bootstrap";

import StarsRating from './StarsRating';

// display letter avatar if no avatar presented
const LetterAvatar = ({ name }) => {
    let firstLetter = ""
    if (name) firstLetter = name.split()[0][0]
    const avatarStyle = {
        backgroundColor: '#F0F0FF',
        color: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        marginRight: '1rem'
    };
    return (
        <div style={avatarStyle}>
            {firstLetter}
        </div>
    );
}
interface ReviewProps {
    avatar?: string | "";    // link to avatar
    reviewer: string | undefined;
    date: string | undefined;
    time: string | undefined;
    comment: string | undefined;
    rating: number | 0
}

const Review: React.FC<ReviewProps> = ({
    avatar, reviewer, date, time, comment, rating
}) => {

    return (
        <Col lg={6} className="mt-3">
            <div className="d-flex flex-row w-100">
                <div>{avatar && avatar.length > 0 ? <img src={avatar} width="80px" height="80px" /> : <LetterAvatar name={reviewer} />}</div>
                <div className="d-flex flex-column h-100">
                    <h5>{reviewer}</h5>
                    <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{date} at {time}</p>
                </div>
            </div>
            <StarsRating rating={rating} />
            <p>{comment}</p>
        </Col>
    )
}

export default Review