import Icon from '@/ui/icons'
import { useState } from 'react'

const SetStars = ({rating, onChange }) => {

    return [...Array(5).keys()].map(star => (
        <Icon key={star} id="star" color={star < rating ? "primary":"$gray500"} css={{cursor: "pointer"}} onClick={()=>onChange(star)} />
    ))

}

export default SetStars