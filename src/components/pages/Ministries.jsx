import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Ministries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ministries: [
                {
                    id: 1,
                    title: 'Youth Ministry',
                    content: 'Empowering the next generation through faith, fellowship, and service.',
                    image: '/images/ministries/music-ministry.png',
                    link: '/youth-ministry',
                },
                {
                    id: 2,
                    title: 'Music Ministry',
                    content: 'Leading worship and praise through music and song.',
                    image: '/images/ministries/music-ministry.png',
                    link: '/music',
                },
                {
                    id: 3,
                    title: 'Men\'s Ministries',
                    content: 'Serving the community and spreading the message of hope.',
                    image: '/images/ministries/outreach-ministry.png',
                    link: '/men-ministry',
                },
                {
                    id: 4,
                    title: 'Women\'s Ministries',
                    content: 'Serving the community and spreading the message of hope.',
                    image: '/images/ministries/outreach-ministry.png',
                    link: '/women-ministry',
                },
                {
                    id: 5,
                    title: 'Children\'s Ministry',
                    content: 'Teaching children about God\'s love in a fun and engaging way.',
                    image: '/images/ministries/childrens-ministry.png',
                    link: '/children',
                },
                {
                    id: 6,
                    title: 'Young Couples Ministry(YCM)',
                    content: 'Strengthening relationships and fostering spiritual growth for young couples.',
                    image: '/images/ministries/young-couples-ministry.png',
                    link: '/young-couples',
                },
            ]
        };
    }

    render() {
        return (
            <div className="bg-body3">
                <div className="boxed">
                    {/* Header Section */}
                    <section className="flat-row pd-services-post">
                        <div className="banner" style={{ backgroundImage: 'url(/images/banner/banner-01.png)', height: '690px' }}>
                            <div className="banner-content">
                                <h1 className="banner-title"
                                    style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                    }}>Our Ministries</h1>
                                <p className="banner-subtitle"
                                   style={{
                                       fontSize: '1.2rem',
                                       color: '#ddd',
                                       textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                   }}>
                                    Discover the various ministries that serve our community and beyond.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Ministries Section */}
                    <section className="flat-row pd-services-post">
                        <div
                            className="box-container"
                            style={{
                                padding: '30px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                margin: '20px auto',
                                maxWidth: '1200px',
                            }}
                        >
                            <div
                                className="container"
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    marginLeft: '-15px', // compensate for padding
                                    marginRight: '-15px',
                                }}
                            >
                                {this.state.ministries.map((ministry) => (
                                    <div
                                        key={ministry.id}
                                        className="ministry-item"
                                        style={{
                                            width: 'calc(33.333% - 30px)', // 3 per row with spacing
                                            margin: '15px',
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: '20px',
                                            borderRadius: '10px',
                                            backgroundColor: '#fff',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                                        }}
                                    >
                                        <img
                                            src={ministry.image}
                                            alt={ministry.title}
                                            style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }}
                                        />
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                                            {ministry.title}
                                        </h2>
                                        <p style={{ fontSize: '1rem', color: '#555', textAlign: 'center', marginBottom: '20px' }}>
                                            {ministry.content}
                                        </p>
                                        <a
                                            href={ministry.link}
                                            style={{
                                                padding: '10px 20px',
                                                backgroundColor: '#28a745', // Bootstrap success green
                                                color: '#fff',
                                                textDecoration: 'none',
                                                borderRadius: '5px',
                                                fontWeight: 'bold',
                                                transition: 'background-color 0.3s',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')} // Darker green on hover
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        );
    }
}

export default Ministries;