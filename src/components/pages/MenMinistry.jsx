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
    },
    activities: [
        {
            id: 1,
            title: "Men's Bible Study",
            description: "Deepen your understanding of the Word through weekly Bible study sessions.",
            image: "/images/ministries/music-ministry.png"
        },
        {
            id: 2,
            title: "Community Outreach",
            description: "Serve the community through organized outreach programs and events.",
            image: "/images/ministries/music-ministry.png"
        },
        {
            id: 3,
            title: "Leadership Workshops",
            description: "Develop leadership skills to make a positive impact in all areas of life.",
            image: "/images/ministries/music-ministry.png"
        },
        {
            id: 4,
            title: "Retreats and Conferences",
            description: "Join retreats and conferences to connect and grow with other men of faith.",
            image: "/images/ministries/music-ministry.png"
        }
    ]
};

const styles = {
    banner: {
        backgroundImage: `url(${contentData.banner.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '250px 0 180px 0',
        color: '#fff',
        textAlign: 'center',
        position: 'relative'
    },
    bannerOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1
    },
    bannerContent: {
        position: 'relative',
        zIndex: 2
    },
    aboutSection: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        margin: '60px 0'
    },
    aboutText: {
        flex: '1 1 350px',
        minWidth: '300px',
        maxWidth: '600px',
        textAlign: 'left'
    },
    aboutImage: {
        flex: '1 1 300px',
        maxWidth: '400px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    },
    activitiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '30px',
        margin: '40px 0'
    },
    activityCard: {
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        padding: '24px',
        textAlign: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
    },
    activityImage: {
        width: '100%',
        maxWidth: '200px',
        margin: '0 auto 18px auto',
        borderRadius: '8px'
    },
    ctaSection: {
        background: '#f5f7fa',
        borderRadius: '10px',
        padding: '36px 24px',
        textAlign: 'center',
        margin: '60px 0 0 0'
    },
    ctaButton: {
        marginTop: '18px',
        padding: '12px 32px',
        background: '#2d6cdf',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.2s'
    }
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
                    {this.state.headers.map(data => (
                        <Header data={data} key={data.id} />
                    ))}

                    {/* Banner Section */}
                    <section style={styles.banner}>
                        <div style={styles.bannerOverlay}></div>
                        <div style={styles.bannerContent}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '1px' }}>
                                {contentData.banner.title}
                            </h1>
                            <p style={{ fontSize: '1.3rem', color: '#e0e0e0', maxWidth: '600px', margin: '0 auto' }}>
                                {contentData.banner.subtitle}
                            </p>
                        </div>
                    </section>

                    {/* About Section */}
                    <section>
                        <div className="container" style={styles.aboutSection}>
                            <div style={styles.aboutText}>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#2d6cdf', marginBottom: '18px' }}>
                                    {contentData.about.heading}
                                </h2>
                                <p style={{ fontSize: '1.15rem', color: '#444', lineHeight: '1.7' }}>
                                    {contentData.about.description}
                                </p>
                            </div>
                            <img
                                src={contentData.about.image}
                                alt="Men Ministry group"
                                style={styles.aboutImage}
                            />
                        </div>
                    </section>

                    {/* Activities Section */}
                    <section>
                        <div className="container">
                            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#222', textAlign: 'center', marginBottom: '30px' }}>
                                Activities
                            </h3>
                            <div style={styles.activitiesGrid}>
                                {contentData.activities.map(activity => (
                                    <div
                                        key={activity.id}
                                        style={styles.activityCard}
                                        tabIndex={0}
                                        aria-label={activity.title}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'scale(1.04)';
                                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.13)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.boxShadow = styles.activityCard.boxShadow;
                                        }}
                                    >
                                        <img
                                            src={activity.image}
                                            alt={activity.title}
                                            style={styles.activityImage}
                                        />
                                        <h4 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '10px', color: '#2d6cdf' }}>
                                            {activity.title}
                                        </h4>
                                        <p style={{ fontSize: '1rem', color: '#555' }}>
                                            {activity.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section style={styles.ctaSection}>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d6cdf', marginBottom: '10px' }}>
                            Ready to get involved?
                        </h4>
                        <p style={{ fontSize: '1.1rem', color: '#444' }}>
                            Join our Men Ministry and be part of a community that grows together in faith and leadership.
                        </p>
                        <button
                            style={styles.ctaButton}
                            onClick={() => window.location.href = '/contact-v1'}
                        >
                            Contact Us
                        </button>
                    </section>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default MenMinistry;