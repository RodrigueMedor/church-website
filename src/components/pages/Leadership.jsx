import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';

const contentData = {
    banner: {
        title: "Leadership & Staff",
        subtitle: "Meet the leaders guiding our church with faith and vision.",
        backgroundImage: "/images/banner/pastor-sermon.png"
    },
    leadershipTeam: [
        { id: 1, name: 'Rev. Fritzner JB Brouard', role: 'Pastor', photo: '/images/staff/staff.png', bio: 'Rev. Fritzner JB Brouard leads with a heart for ministry and a vision for spiritual growth.' }
    ],
    trustees: [
        { id: 1, name: 'Sully Moreau', photo: '/images/staff/staff.png' },
        { id: 2, name: 'Elsie J. Alexandre', photo: '/images/staff/staff.png' }
    ],
    registeredAgent: {
        name: 'Edward Brinson',
        photo: '/images/staff/staff.png'
    },
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
                    <Header data={{ id: 1, names: 'Leadership & Staff' }} />

                    {/* Banner Section */}
                    <section className="flat-row pd-services-post">
                        <div
                            className="banner"
                            style={{
                                backgroundImage: `url(${contentData.banner.backgroundImage})`,
                                height: '650px',
                                backgroundSize: 'cover',
                                color: '#fff',
                                paddingTop: '200px', // Increased padding to move the banner down
                                clipPath: 'inset(0px 0px 50px 0px)', // Cuts the bottom of the banner
                                minHeight: '60vh',
                                backgroundPosition: 'top',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <div className="banner-content">
                                <h1
                                    className="banner-title"
                                    style={{
                                        fontSize: '3rem',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                        marginBottom: '10px'
                                    }}
                                >
                                    {contentData.banner.title}
                                </h1>
                                <p
                                    className="banner-subtitle"
                                    style={{
                                        fontSize: '1.5rem',
                                        color: '#ddd',
                                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                        maxWidth: '800px',
                                        margin: '0 auto'
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

                    {/* Trustees Section */}
                    <section className="trustees-section" style={{ padding: '40px 20px', backgroundColor: '#fff' }}>
                        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Trustees</h2>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                                {contentData.trustees.map((trustee) => (
                                    <div key={trustee.id} style={{ textAlign: 'center', flex: '1' }}>
                                        <img
                                            src={trustee.photo}
                                            alt={trustee.name}
                                            style={{
                                                width: '100%',
                                                maxWidth: '200px',
                                                borderRadius: '50%',
                                                marginBottom: '15px'
                                            }}
                                        />
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{trustee.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Registered Agent Section */}
                    <section className="registered-agent-section" style={{ padding: '40px 20px', backgroundColor: '#f9f9f9' }}>
                        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Registered Agent</h2>
                            <div style={{ textAlign: 'center' }}>
                                <img
                                    src={contentData.registeredAgent.photo}
                                    alt={contentData.registeredAgent.name}
                                    style={{
                                        width: '100%',
                                        maxWidth: '200px',
                                        borderRadius: '50%',
                                        marginBottom: '15px'
                                    }}
                                />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                    {contentData.registeredAgent.name}
                                </h3>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default Leadership;