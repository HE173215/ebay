import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomeCarousel = () => {
    const carouselItems = [
        {
            id: 1,
            image: 'https://i.ebayimg.com/images/g/MqEAAOSwvv9k~neE/s-l1600.webp',
            title: 'Shop Tech Deals',
            description: 'Find amazing deals on the latest technology'
        },
        {
            id: 2,
            image: 'https://i.ebayimg.com/images/g/jd4AAOSwh2pkWGzc/s-l1600.webp',
            title: 'Fashion Sale',
            description: 'Up to 70% off on trending fashion'
        },
        {
            id: 3,
            image: 'https://i.ebayimg.com/images/g/qW8AAOSwKjpkpn~t/s-l1600.webp',
            title: 'Books & More',
            description: 'Discover your next favorite read'
        }
    ];

    return (
        <Carousel 
            className="home-carousel"
            interval={3000}
            indicators={true}
            controls={true}
            pause="hover"
            wrap={true}
        >
            {carouselItems.map(item => (
                <Carousel.Item key={item.id}>
                    <img
                        className="d-block w-100"
                        src={item.image}
                        alt={item.title}
                        style={{
                            height: '400px',
                            objectFit: 'cover'
                        }}
                    />
                    <Carousel.Caption className="carousel-caption">
                        <div className="caption-content" style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            padding: '20px',
                            borderRadius: '10px'
                        }}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
            <style jsx>{`
                .home-carousel {
                    margin-bottom: 30px;
                }
                .carousel-caption {
                    bottom: 50%;
                    transform: translateY(50%);
                    text-align: left;
                }
                .caption-content {
                    max-width: 500px;
                    margin: 0 auto;
                }
                .carousel-item {
                    position: relative;
                }
                .carousel-item::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
                }
                .carousel-indicators {
                    margin-bottom: 1rem;
                }
                .carousel-indicators button {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    margin: 0 5px;
                }
                .carousel-control-prev,
                .carousel-control-next {
                    width: 5%;
                    opacity: 0.8;
                }
                .carousel-control-prev:hover,
                .carousel-control-next:hover {
                    opacity: 1;
                }
            `}</style>
        </Carousel>
    );
};

export default HomeCarousel; 