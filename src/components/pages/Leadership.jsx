import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';

const contentData = {
    banner: {
        title: "Leadership",
        subtitle: "Meet the leaders guiding our church with faith and vision.",
        backgroundImage: "/images/banner/Church.jpg"
    },
    leadershipTeam: [
        { id: 1, name: 'FRIZTNER BROUARD', role: 'Senior Pastor', photo: '/images/staff/staff.png', bio: 'John has been leading the church for over 15 years with a heart for ministry and community.' },
        { id: 2, name: 'Jane Smith', role: 'Associate Pastor', photo: '/images/staff/staff.png', bio: 'Jane supports the church’s mission through teaching and pastoral care.' },
        { id: 3, name: 'Michael Brown', role: 'Deacon', photo: '/images/staff/staff.png', bio: 'Michael oversees church operations and ensures everything runs smoothly.' },
        { id: 4, name: 'Emily Davis', role: 'Evangelist', photo: '/images/staff/staff.png', bio: 'Emily shares the gospel and leads outreach programs in the community.' }
    ],
    mission: {
        heading: "Our Mission",
        description: "Our leadership team is dedicated to fostering spiritual growth, building a strong community, and spreading the message of hope and love."
    }
};

class Leadership extends Component {
    render() {
        return (
            <div className="bg-body3">
                <div className="boxed">
                    <Loader />
                    <TopBar />
                    <Header data={{ id: 1, names: 'Leadership' }} />

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

                    {/* Leadership Team Section */}
                    <section className="leadership-section" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9' }}>
                        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Meet Our Leadership Team</h2>
                                <p style={{ fontSize: '1.2rem', color: '#666' }}>Dedicated individuals guiding our church with faith and vision.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                {contentData.leadershipTeam.map((leader) => (
                                    <div key={leader.id} style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center', padding: '20px' }}>
                                        <img
                                            src={leader.photo}
                                            alt={leader.name}
                                            style={{
                                                width: '100%',
                                                maxWidth: '200px',
                                                borderRadius: '50%',
                                                marginBottom: '15px'
                                            }}
                                        />
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{leader.name}</h3>
                                        <p style={{ fontSize: '1.1rem', color: '#ff6f61', marginBottom: '10px' }}>{leader.role}</p>
                                        <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>{leader.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section className="mission-section" style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
                        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>{contentData.mission.heading}</h2>
                            <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.8' }}>{contentData.mission.description}</p>
                        </div>
                    </section>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default Leadership;