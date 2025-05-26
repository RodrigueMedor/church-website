import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';
import './Leadership.css';

const contentData = {
    banner: {
        title: "Leadership & Staff",
        subtitle: "Meet the leaders guiding our church with faith and vision.",
        backgroundImage: "/images/banner/pastor-sermon_1.JPG"
    },
    leadershipTeam: [
        { id: 1, name: 'Rev. Fritzner JB Brouard', role: 'Pastor', photo: '/images/banner/pastor22.png', bio: 'Rev. Fritzner JB Brouard leads with a heart for ministry and a vision for spiritual growth.' }
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
                                backgroundImage: `url(${contentData.banner.backgroundImage})`
                            }}
                        >
                            <div className="banner-content">
                                <h1 className="banner-title">
                                    {contentData.banner.title}
                                </h1>
                                <p className="banner-subtitle">
                                    {contentData.banner.subtitle}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Leadership Team Section */}
                    <section className="leadership-section">
                        <div className="leadership-container">
                            <div className="leadership-title">
                                Meet Our Leadership Team
                            </div>
                            <div className="leadership-grid">
                                {contentData.leadershipTeam.map((leader) => (
                                    <div key={leader.id} className="leader-card">
                                        <img
                                            src={leader.photo}
                                            alt={leader.name}
                                            className="leader-photo"
                                        />
                                        <h3 className="leader-name">{leader.name}</h3>
                                        <p className="leader-role">{leader.role}</p>
                                        <p className="leader-bio">{leader.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Trustees Section */}
                    <section className="trustees-section">
                        <div className="trustees-container">
                            <h2 className="trustees-title">Trustees</h2>
                            <div className="trustees-list">
                                {contentData.trustees.map((trustee) => (
                                    <div key={trustee.id} className="trustee-card">
                                        <img
                                            src={trustee.photo}
                                            alt={trustee.name}
                                            className="trustee-photo"
                                        />
                                        <h3 className="trustee-name">{trustee.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Registered Agent Section */}
                    <section className="registered-agent-section">
                        <div className="registered-agent-container">
                            <h2 className="registered-agent-title">Registered Agent</h2>
                            <div>
                                <img
                                    src={contentData.registeredAgent.photo}
                                    alt={contentData.registeredAgent.name}
                                    className="registered-agent-photo"
                                />
                                <h3 className="registered-agent-name">
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