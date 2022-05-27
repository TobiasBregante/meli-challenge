import Icon from '@/ui/icons'

const Stars = ({ rating, color }) => {
    return [...Array(5).keys()].map(star => (
        <Icon key={star} id="star" className={`text-${star < rating ? color ?? "warning":"secondary"}`} />
    ))

}

export default Stars