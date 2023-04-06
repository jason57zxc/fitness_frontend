import React from 'react'
import Carousel from './carousel-comp'

const HomeComp = (props) => {

    const { user } = props

    return (
        <div className="h-full">
            <Carousel className="max-w-full w-full" />
            {
                user && (
                    <h3>Hi, {user.username}</h3>
                )
            }
        </div>
    )

}

export default HomeComp
