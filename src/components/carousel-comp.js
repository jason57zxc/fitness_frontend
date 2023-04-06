import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
    height: '12rem',
    color: '#fff',
    lineHeight: '12rem',
    textAlign: 'center',
    background: '#364d79',
};

// const images = [
//     'https://instagram.ftpe7-1.fna.fbcdn.net/v/t51.2885-15/315812258_1508008646690886_7688977357653246280_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.ftpe7-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=5mupepE90BEAX9khZX5&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk3MjY5NDkwMzM3NDI3NDg3MA%3D%3D.2-ccb7-5&oh=00_AfBDILUrWI1N8bsd_cdyRjqrPyROO9yN5-0Ln4Rse7XfXA&oe=6399E987&_nc_sid=30a2ef',
// ]

const CarouselComp = () => (
    <Carousel autoplay>
        <div>
            <h3 style={contentStyle}>1</h3>
        </div>
        <div>
            <h3 style={contentStyle}>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div>
    </Carousel>
);

export default CarouselComp;