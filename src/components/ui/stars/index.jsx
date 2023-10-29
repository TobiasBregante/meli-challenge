import Icon from '@/ui/icons'

const Stars = ({ rating, color }) => {
    return [...Array(5).keys()].map((star, o) => (
        // <Icon key={star} id="star" color={o < rating ? color ?? "primary":"$gray500"} />
        <Icon key={star} id="star" color={"primary"} />
    ))

}

export default Stars