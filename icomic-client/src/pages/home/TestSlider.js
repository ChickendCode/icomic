import React, {useRef,useEffect, useState} from 'react'
import useDispatch from 'react-redux'
import Link from 'react-router-dom'
import getStory from '../../services/stories.services'
import Slider from 'react-slick'

const SimpleSlider = props => {
    const ref = useRef({});

    const next = () => {
        ref.current.slickNext();
    }

    const previous = () => {
        ref.current.slickPrev();
    }

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
    };

    return(
        <div className="test">
            <h2>Test Slider</h2>
            <Slider ref={ref} {...settings}>
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </Slider>
        </div>
    )


}


export default SimpleSlider