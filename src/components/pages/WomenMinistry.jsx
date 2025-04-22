import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';
import Slider from 'react-slick'; // Importing a carousel library like react-slick

// JSON object for text and image content
const contentData = {
    banner: {
        title: "Women Ministry",
        subtitle: "Empowering women to grow in faith, leadership, and service.",
        backgroundImage: "/images/blog/women.png"
    },
    about: {
        heading: "About Women Ministry",
        description: "Our Women Ministry is dedicated to nurturing women in their spiritual journey, fostering meaningful relationships, and empowering them to make a difference in their families, communities, and beyond.",
        image: "/images/ministries/music-ministry.png"
        // image: "/images/ministries/women-ministry-about.png"
    },
    activities: [
        {
            id: 1,
            title: "Women's Bible Study",
            description: "Join weekly Bible study sessions to deepen your faith and understanding.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/women-bible-study.png"
        },
        {
            id: 2,
            title: "Community Service",
            description: "Participate in impactful community service projects.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/women-service.png"
        },
        {
            id: 3,
            title: "Leadership Training",
            description: "Develop leadership skills to inspire and lead others.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/women-leadership.png"
        },
        {
            id: 4,
            title: "Retreats and Events",
            description: "Attend retreats and events to connect and grow with other women.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/women-retreats.png"
        }
    ]
};

class WomenMinistry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                {
                    id: 1,
                    names: 'Pages'
                }
            ]
        };
    }

    render() {
        // Carousel settings
        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        };

        return (
            <div className="bg-body3">
                <div className="boxed">
                    <Loader />
                    <TopBar />
                    {
                        this.state.headers.map(data => (
                            <Header data={data} key={data.id} />
                        ))
                    }
                    {/* Banner Section */}
                    <section className="flat-row pd-services-post">
                        <div className="banner" style={{ backgroundImage: `url(${contentData.banner.backgroundImage})` }}>
                            <div className="banner-content">
                                <h1
                                    className="banner-title"
                                    style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                    }}
                                >
                                    {contentData.banner.title}
                                </h1>
                                <p
                                    className="banner-subtitle"
                                    style={{
                                        fontSize: '1.2rem',
                                        color: '#ddd',
                                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                    }}
                                >
                                    {contentData.banner.subtitle}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Content Section */}
                    <section className="flat-row pd-services-post">
                        <div className="container" style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
                            {/* About Women Ministry Section */}
                            <div style={{ textAlign: 'center', marginBottom: '50px', padding: '20px', border: '2px solid #f8b4d9', borderRadius: '10px', backgroundColor: '#fff' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#d63384' }}>
                                    {contentData.about.heading}
                                </h2>
                                <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', maxWidth: '800px', margin: '20px auto' }}>
                                    {contentData.about.description}
                                </p>
                                <img src={contentData.about.image} alt="About Women Ministry" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', marginTop: '20px' }} />
                            </div>

                            {/* Activities Section */}
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d63384' }}>Activities</h3>
                            </div>
                            <div>
                                <Slider {...sliderSettings}>
                                    {contentData.activities.map(activity => (
                                        <div
                                            key={activity.id}
                                            style={{
                                                textAlign: 'center',
                                                padding: '20px',
                                                backgroundColor: '#fff',
                                                borderRadius: '10px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            <img src={activity.image} alt={activity.title} style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', marginBottom: '15px' }} />
                                            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d63384', marginBottom: '10px' }}>{activity.title}</h4>
                                            <p style={{ fontSize: '1rem', color: '#555', marginBottom: '10px' }}>{activity.description}</p>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default WomenMinistry;