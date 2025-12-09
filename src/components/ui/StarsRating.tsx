import { Star } from 'lucide-react';
const StarNoFill = () => <Star color="orange" strokeWidth={1} size={12} style={{ marginBottom: '0.25rem' }} />
const StarFilled = () => <Star fill="orange" strokeWidth={0} size={12} style={{ marginLeft: '0.25rem', marginRight: '0.25rem', marginBottom: '0.25rem' }} />

// display filled stars based on rating
const StarsRating = ({ rating }) => {
    const numberOfStars = 5
    let starArray = []
    for (let i = 0; i < rating; i++) {
        starArray.push(<StarFilled />)
    }
    for (let i = rating; i < numberOfStars; i++) {
        starArray.push(<StarNoFill />)
    }
    return starArray
}

export default StarsRating
export { StarNoFill, StarFilled }