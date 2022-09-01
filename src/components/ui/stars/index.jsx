import Icon from '@/ui/icons'

const Stars = ({ rating, color }) => {
    return [...Array(5).keys()].map(star => (
        <Icon key={star} id="star" color={star < rating ? color ?? "primary":"$gray500"} />
    ))

}

export default Stars