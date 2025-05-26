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
        description: "Our Youth Ministry is committed to helping young people grow in their relationship with Christ through a supportive, Christ-centered community. Led by Brother Vlad and Brother Wisly, we offer a welcoming space where teenagers can ask questions, deepen their faith, form authentic friendships, and enjoy engaging activities.\n\nWe gather regularly for Bible study, worship, fellowship, and special events—whether diving into Scripture, serving the community, or simply having fun. Our goal is to equip youth to live boldly for Christ, love others well, and make a difference in the world. We believe they are not just the future of the Church, but an essential part of it today.\n\nAll are welcome to join us every Saturday for Bible Study and Connections (our youth fellowship), and for a dedicated youth service on the 3rd and 4th Sunday of each month.",
        image: "/images/ministries/young.png"
    },
    activities: {
        heading: "Activities",
        list: [
            "Youth Bible Studies",
            "Community Service Projects",
            "Worship Nights",
            "Retreats and Camps"
        ],
        image: "/images/ministries/young3.jpg"
    }
};

// Decorative underline component
const Underline = ({ width = 80, color = "#28a745", height = 5, margin = "16px 0" }) => (
    <div
        style={{
            width: width,
            height: height,
            background: `linear-gradient(90deg, ${color} 60%, #b2f7cc 100%)`,
            borderRadius: height / 2,
            margin: margin
        }}
    />
);

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
                    {this.state.headers.map(data => (
                        <Header data={data} key={data.id} />
                    ))}
                    {/* Banner Section */}
                    <section className="flat-row pd-services-post">
                        <div className="banner" style={{
                            backgroundImage: `url(${contentData.banner.backgroundImage})`,
                            height: '600px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div className="banner-content" style={{
                                background: 'rgba(0,0,0,0.5)',
                                padding: '40px 60px',
                                borderRadius: '16px',
                                textAlign: 'center'
                            }}>
                                <h1
                                    className="banner-title"
                                    style={{
                                        fontSize: '2.8rem',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
                                    }}
                                >
                                    {contentData.banner.title}
                                </h1>
                                <Underline width={100} color="#fff" height={4} margin="18px auto" />
                                <p
                                    className="banner-subtitle"
                                    style={{
                                        fontSize: '1.3rem',
                                        color: '#f1f1f1',
                                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                        maxWidth: '600px',
                                        margin: '0 auto'
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
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '60px',
                                gap: '40px',
                                flexWrap: 'wrap'
                            }}>
                                <div style={{ flex: '1 1 350px', paddingRight: '20px', minWidth: '350px' }}>
                                    <h2 style={{
                                        fontSize: '2.2rem',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginBottom: 0
                                    }}>
                                        {contentData.about.heading}
                                    </h2>
                                    <Underline width={70} color="#28a745" height={5} margin="14px 0 24px 0" />
                                    <p style={{
                                        fontSize: '1.13rem',
                                        color: '#555',
                                        lineHeight: '1.8',
                                        whiteSpace: 'pre-line'
                                    }}>
                                        {contentData.about.description}
                                    </p>
                                </div>
                                <div style={{ flex: '1 1 350px', minWidth: '350px', display: 'flex', justifyContent: 'center' }}>
                                    <img
                                        src={contentData.about.image}
                                        alt="About Youth Ministry"
                                        style={{
                                            width: '100%',
                                            maxWidth: '1020px',
                                            height: '580px',
                                            // objectFit: 'contain',
                                            background: '#f8f8f8',
                                            // borderRadius: '14px',
                                            // boxShadow: '0 6px 24px rgba(40,167,69,0.12)'

                                            aspectRatio: '4/3',
                                            objectFit: 'cover',
                                            borderRadius: '14px',
                                            boxShadow: '0 6px 24px rgba(40,167,69,0.12)'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Activities Section */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row-reverse',
                                gap: '40px',
                                flexWrap: 'wrap'
                            }}>
                                <div style={{ flex: '1 1 350px', paddingLeft: '20px', minWidth: '350px' }}>
                                    <h3 style={{
                                        fontSize: '1.7rem',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginBottom: 0
                                    }}>
                                        {contentData.activities.heading}
                                    </h3>
                                    <Underline width={60} color="#28a745" height={4} margin="12px 0 20px 0" />
                                    <ul style={{
                                        listStyleType: 'disc',
                                        paddingLeft: '32px',
                                        fontSize: '1.08rem',
                                        color: '#555',
                                        lineHeight: '1.8'
                                    }}>
                                        {contentData.activities.list.map((activity, index) => (
                                            <li key={index} style={{ marginBottom: '10px' }}>{activity}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div style={{ flex: '1 1 350px', minWidth: '350px', display: 'flex', justifyContent: 'center' }}>
                                    <img
                                        src={contentData.activities.image}
                                        alt="Youth Activities"
                                        style={{
                                            width: '100%',
                                            maxWidth: '520px',
                                            aspectRatio: '4/3',
                                            objectFit: 'cover',
                                            borderRadius: '14px',
                                            boxShadow: '0 6px 24px rgba(40,167,69,0.12)'
                                        }}
                                    />
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