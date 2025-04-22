import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';

// JSON object for text and image content
const contentData = {
    banner: {
        title: "Children Ministry",
        subtitle: "Nurturing the next generation with love, faith, and fun.",
        backgroundImage: "/images/banner/Church.jpg"
        // backgroundImage: "/images/banner/children-ministry.jpg"
    },
    about: {
        heading: "About Children Ministry",
        description: "Our Children Ministry is dedicated to providing a safe, fun, and engaging environment where children can learn about God, build friendships, and grow in their faith.",
        image: "/images/ministries/music-ministry.png"
        // image: "/images/ministries/children-ministry-about.png"
    },
    activities: [
        {
            id: 1,
            title: "Sunday School",
            description: "Interactive lessons and activities to teach children about the Bible.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/children-sunday-school.png"
        },
        {
            id: 2,
            title: "Vacation Bible School",
            description: "A week of fun-filled learning, games, and crafts during the summer.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/children-vbs.png"
        },
        {
            id: 3,
            title: "Kids Choir",
            description: "Encouraging children to worship through music and singing.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/children-choir.png"
        },
        {
            id: 4,
            title: "Outdoor Activities",
            description: "Fun outdoor events to build friendships and teamwork.",
            image: "/images/ministries/music-ministry.png"
            // image: "/images/ministries/children-outdoor.png"
        }
    ]
};

class ChildrenMinitry extends Component {
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
                            {/* About Children Ministry Section */}
                            <div style={{ textAlign: 'center', marginBottom: '50px', padding: '20px', border: '2px solid #a3d9f5', borderRadius: '10px', backgroundColor: '#fff' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#007bff' }}>
                                    {contentData.about.heading}
                                </h2>
                                <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', maxWidth: '800px', margin: '20px auto' }}>
                                    {contentData.about.description}
                                </p>
                                <img src={contentData.about.image} alt="About Children Ministry" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', marginTop: '20px' }} />
                            </div>

                            {/* Activities Section */}
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>Activities</h3>
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
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>{activity.title}</h4>
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

export default ChildrenMinitry;