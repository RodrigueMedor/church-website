import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';

// JSON object for text and image content
const contentData = {
    banner: {
        title: "Young Couples' Ministry",
        subtitle: "Building strong relationships through faith, love, and community.",
        backgroundImage: "/images/ministries/ycm2.png"
    },
    about: {
        heading: "About Young Couples' Ministry",
        description: "Our Young Couples' Ministry is dedicated to nurturing relationships, fostering spiritual growth, and creating a supportive community for couples to thrive together.",
        image: "/images/ministries/couple.png"
    },
    verse: {
        reference: "Ephesians 4:2-3",
        text: "2 Be completely humble and gentle; be patient, bearing with one another in love. 3 Make every effort to keep the unity of the Spirit through the bond of peace."
    },
    description: "We exist to equip young married couples to develop a deeper relationship with Christ, proclaim his gospel, maintain the worship of God, encourage uplifting relationship with other Christians, and empower life changing relationship with non-believers.",
    activities: [
        {
            id: 1,
            title: "Couples' Retreat",
            description: "A weekend getaway to strengthen your bond and grow spiritually.",
            image: "/images/ministries/ycm1.png"
        },
        {
            id: 2,
            title: "Marriage Workshops",
            description: "Interactive sessions to build communication and understanding.",
            image: "/images/ministries/couples2.png"
        }
    ]
};

class YCM extends Component {
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
                        <div
                            className="banner"
                            style={{
                                backgroundImage: `url(${contentData.banner.backgroundImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center -550px', // Moves the image 50px up
                                padding: '100px 0'
                            }}
                        >
                            <div className="banner-content" style={{ textAlign: 'center', color: '#fff' }}>
                                <h1
                                    className="banner-title"
                                    style={{
                                        fontSize: '3rem',
                                        fontWeight: 'bold',
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                    }}
                                >
                                    {contentData.banner.title}
                                </h1>
                                <p
                                    className="banner-subtitle"
                                    style={{
                                        fontSize: '1.5rem',
                                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                    }}
                                >
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
                                <img src={contentData.about.image} alt="About Young Couples' Ministry" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', marginTop: '10px' }} />
                            </div>
                        </div>
                    </section>

                    {/* Verse and Description Section */}
                    <section className="flat-row pd-services-post" style={{ marginTop: '-100px' }}>
                        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'stretch', gap: '20px', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                            {/* Verse Section */}
                            <div style={{ flex: '1 1 45%', padding: '15px', border: '2px solid #f5a3a3', borderRadius: '10px', backgroundColor: '#fff', textAlign: 'center', minHeight: '250px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6f61', marginBottom: '10px' }}>
                                    {contentData.verse.reference}
                                </h3>
                                <br />
                                <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', fontStyle: 'italic', margin: '0' }}>
                                    {contentData.verse.text}
                                </p>
                            </div>

                            {/* Description Section */}
                            <div style={{ flex: '1 1 45%', padding: '15px',  border: '2px solid #f5a3a3', borderRadius: '10px', backgroundColor: '#fff', textAlign: 'center', minHeight: '250px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6f61', marginBottom: '10px' }}>
                                    Ministry Description
                                </h3>
                                <br />
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

export default YCM;