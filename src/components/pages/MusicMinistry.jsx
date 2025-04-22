import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';

const contentData = {
    banner: {
        title: "Music Ministry",
        subtitle: "Worship through music and praise",
        backgroundImage: "/images/banner/Church.jpg"
        // backgroundImage: "/images/ministries/music-ministry-banner.jpg"
    },
    about: {
        heading: "About Music Ministry",
        description: "Our Music Ministry is dedicated to leading the congregation in worship through music, fostering a spirit of praise, and glorifying God through song.",
        image: "/images/ministries/music-ministry.png"
        // image: "/images/ministries/music-ministry-about.jpg"
    },
    verse: {
        reference: "Psalm 95:1",
        text: "Come, let us sing for joy to the Lord; let us shout aloud to the Rock of our salvation."
    },
    description: "We aim to inspire and uplift the church through music, encourage participation in worship, and provide opportunities for musicians and singers to use their talents for God's glory.",
    activities: [
        {
            id: 1,
            title: "Choir Practice",
            description: "Weekly sessions to prepare for Sunday worship.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/choir-practice.jpg"
        },
        {
            id: 2,
            title: "Worship Nights",
            description: "Special evenings of praise and worship.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/worship-nights.jpg"
        }
    ]
};

class MusicMinistry extends Component {
    render() {
        return (
            <div className="bg-body3">
                <div className="boxed">
                    <Loader />
                    <TopBar />
                    <Header data={{ id: 1, names: 'Music Ministry' }} />

                    {/* Banner Section */}
                    <section className="flat-row pd-services-post">
                        <div className="banner" style={{ backgroundImage: `url(${contentData.banner.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0' }}>
                            <div className="banner-content" style={{ textAlign: 'center', color: '#fff' }}>
                                <h1 className="banner-title" style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                                    {contentData.banner.title}
                                </h1>
                                <p className="banner-subtitle" style={{ fontSize: '1.5rem', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                                    {contentData.banner.subtitle}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="flat-row pd-services-post">
                        <div className="container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '10px', padding: '15px', border: '2px solid #f5a3a3', borderRadius: '10px', backgroundColor: '#fff' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ff6f61', marginBottom: '10px' }}>
                                    {contentData.about.heading}
                                </h2>
                                <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', maxWidth: '800px', margin: '10px auto' }}>
                                    {contentData.about.description}
                                </p>
                                <img src={contentData.about.image} alt="About Music Ministry" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', marginTop: '10px' }} />
                            </div>
                        </div>
                    </section>

                    {/* Verse and Description Section */}
                    <section className="flat-row pd-services-post" style={{ marginTop: '-100px' }}>
                        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'stretch', gap: '20px', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                            <div style={{ flex: '1 1 45%', padding: '15px', border: '2px solid #f5a3a3', borderRadius: '10px', backgroundColor: '#fff', textAlign: 'center', minHeight: '250px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6f61', marginBottom: '10px' }}>
                                    {contentData.verse.reference}
                                </h3>
                                <br/>
                                <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', fontStyle: 'italic', margin: '0' }}>
                                    {contentData.verse.text}
                                </p>
                            </div>
                            <div style={{ flex: '1 1 45%', padding: '15px', border: '2px solid #f5a3a3', borderRadius: '10px', backgroundColor: '#fff', textAlign: 'center', minHeight: '250px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6f61', marginBottom: '10px' }}>
                                    Ministry Description
                                </h3>
                                <br/>
                                <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', margin: '0' }}>
                                    {contentData.description}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Activities Section */}
                    <section className="flat-row pd-services-post">
                        <div className="container" style={{ padding: '60px', maxWidth: '1200px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6f61', marginTop: '-120px' }}>Activities</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                {contentData.activities.map(activity => (
                                    <div key={activity.id} style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                        <img src={activity.image} alt={activity.title} style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', marginBottom: '15px' }} />
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff6f61', marginBottom: '10px' }}>{activity.title}</h4>
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

export default MusicMinistry;