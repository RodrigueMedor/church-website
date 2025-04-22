import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';

// JSON object for text and image content
const contentData = {
    banner: {
        title: "Men Ministry",
        subtitle: "Building strong men of faith, character, and leadership.",
        backgroundImage: "/images/banner/Church.jpg"
    },
    about: {
        heading: "About Men Ministry",
        description: "Our Men Ministry is focused on equipping men to lead in their families, workplaces, and communities. Through fellowship, mentorship, and service, we aim to inspire men to live with integrity and purpose.",
        image: "/images/ministries/music-ministry.png"
        // image: "/images/ministries/men-ministry-about.png"
    },
    activities: [
        {
            id: 1,
            title: "Men's Bible Study",
            description: "Deepen your understanding of the Word through weekly Bible study sessions.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/men-bible-study.png"
        },
        {
            id: 2,
            title: "Community Outreach",
            description: "Serve the community through organized outreach programs and events.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/men-outreach.png"
        },
        {
            id: 3,
            title: "Leadership Workshops",
            description: "Develop leadership skills to make a positive impact in all areas of life.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/men-leadership.png"
        },
        {
            id: 4,
            title: "Retreats and Conferences",
            description: "Join retreats and conferences to connect and grow with other men of faith.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/men-retreats.png"
        }
    ]
};

class MenMinistry extends Component {
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
                            {/* About Men Ministry Section */}
                            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
                                    {contentData.about.heading}
                                </h2>
                                <p style={{ fontSize: '1.1rem', color: '#777', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
                                    {contentData.about.description}
                                </p>
                                <img src={contentData.about.image} alt="About Men Ministry" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', marginTop: '20px' }} />
                            </div>

                            {/* Activities Section */}
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>Activities</h3>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                                {contentData.activities.map(activity => (
                                    <div
                                        key={activity.id}
                                        style={{
                                            width: 'calc(25% - 20px)',
                                            backgroundColor: '#fff',
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            overflow: 'hidden',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            textAlign: 'center',
                                            padding: '20px',
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
                                        <img src={activity.image} alt={activity.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }} />
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{activity.title}</h4>
                                        <p style={{ fontSize: '1rem', color: '#555', marginBottom: '10px' }}>{activity.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default MenMinistry;