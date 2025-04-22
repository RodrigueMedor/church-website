import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';

// JSON object for text and image content
const contentData = {
    banner: {
        title: "Youth Ministry",
        subtitle: "Empowering the next generation through faith, fellowship, and service.",
        backgroundImage: "/images/banner/banner-young.png"
    },
    about: {
        heading: "About Youth Ministry",
        description: "Our Youth Ministry is dedicated to empowering young people to grow in their faith, build meaningful relationships, and serve their community. Through engaging activities, worship, and mentorship, we aim to inspire the next generation to live out their faith boldly.",
        image: "/images/ministries/youth-ministry-test copy.png"
    },
    activities: {
        heading: "Activities",
        list: [
            "Youth Bible Studies",
            "Community Service Projects",
            "Worship Nights",
            "Retreats and Camps"
        ],
        image: "/images/ministries/youth-ministry-test copy.png"
    }
};

class YouthMinistry extends Component {
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
                        <div className="banner" style={{ backgroundImage: `url(${contentData.banner.backgroundImage})`, height: '800px' }}>
                        {/*<div className="banner" style={{ backgroundImage: `url(${contentData.banner.backgroundImage})` }}>*/}
                            <div className="banner-content">
                                <h1
                                    className="banner-title"
                                    style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
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
                            {/* About Youth Ministry Section */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
                                <div style={{ flex: '1', paddingRight: '20px' }}>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
                                        {contentData.about.heading}
                                    </h2>
                                    <p style={{ fontSize: '1.1rem', color: '#777', lineHeight: '1.8' }}>
                                        {contentData.about.description}
                                    </p>
                                </div>
                                <div style={{ flex: '1' }}>
                                    <img src={contentData.about.image} alt="About Youth Ministry" style={{ width: '100%', borderRadius: '8px' }} />
                                </div>
                            </div>

                            {/* Activities Section */}
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                <div style={{ flex: '1', paddingLeft: '20px' }}>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                                        {contentData.activities.heading}
                                    </h3>
                                    <ul style={{ listStyleType: 'disc', paddingLeft: '40px', fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
                                        {contentData.activities.list.map((activity, index) => (
                                            <li key={index} style={{ marginBottom: '10px' }}>{activity}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div style={{ flex: '1' }}>
                                    <img src={contentData.activities.image} alt="Youth Activities" style={{ width: '100%', borderRadius: '8px' }} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default YouthMinistry;