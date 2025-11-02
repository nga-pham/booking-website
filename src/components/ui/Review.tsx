interface ReviewProps {
    "reviewer": string | undefined;
    "date": string | undefined;
    "time": string | undefined;
    "comment": string | undefined;
    "rating": number | 0
}

export const Review: React.FC<ReviewProps> = ({
    reviewer, date, time, comment, rating
}) => {
    return (
                <div style={{ border: '1px solid #ccc', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem', backgroundColor: '#f9f9f9' }}>
            <h5 style={{ marginBottom: '0.5rem' }}>{reviewer ? reviewer : "Anonymous"}</h5>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>{date ? date : ""} {time ? `at ${time}` : ""}</p>
            <p style={{ fontSize: '1rem', color: '#333' }}>{comment ? comment : ""}</p>
            <p style={{ fontSize: '0.875rem', color: '#333', fontWeight: 'bold' }}>Rating: {rating} / 5</p>
        </div>
    )
}
