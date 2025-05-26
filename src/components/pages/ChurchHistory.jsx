import React, { Component } from 'react';

class ChurchHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    id: 1,
                    title: 'A Divine Calling to Kissimmee',
                    content: `In January 1987, Reverend Louis W. Lubin and his wife Andrée felt led by the Holy Spirit to explore Kissimmee, Florida, as a potential location for a new church. Upon arriving, they prayed for a sign and soon encountered Florentin Agenor, a former member of Reverend Lubin’s church in North Carolina. This meeting confirmed their calling, and Mr. Agenor offered his home for the first church service, which commenced the following Sunday with six attendees.`,
                    image: 'https://www.fhbck.com/wp-content/uploads/2012/02/Reverend-Louis-W.-Lubin-and-his-wife-Andre%C3%A9-Lubin1.jpg'
                },
                {
                    id: 2,
                    title: 'Establishment as a Mission',
                    content: `Six months later, Reverend Lubin approached the Greater Orlando Baptist Association (GOBA) to establish a new congregation. GOBA connected him with the First Baptist Church of Kissimmee, which agreed to sponsor the Haitian congregation. In June 1987, the mission was officially recognized as The First Haitian Mission of Kissimmee, FL.`,
                    image: 'https://www.fhbck.com/wp-content/uploads/2012/03/church.jpg'
                },
                {
                    id: 3,
                    title: 'Growth and Incorporation',
                    content: `Over the next twelve years, the mission experienced significant growth, expanding from six members to over 200 in worship attendance. On September 27, 1999, the mission was incorporated as an independent church under the name First Haitian Baptist Church of Kissimmee, Florida, Inc.`,
                    image: '/images/banner/Church.jpg'
                }
            ]
        };
    }

    render() {
        return (
            <div className="bg-body3">
                <div className="boxed">
                    <section className="flat-row pd-services-post">
                        <div className="banner" style={{ backgroundImage: 'url(/images/banner/Church.jpg)' }}>
                            <div className="banner-content">
                                <h1 className="banner-title" style={{
                                    fontSize: '3rem',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                    marginBottom: '10px'
                                }}>Our Church History</h1>
                                <p className="banner-subtitle"
                                   style={{
                                       fontSize: '1.5rem',
                                       color: '#FFF',
                                       textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                       maxWidth: '800px',
                                       margin: '0 auto'
                                   }}
                                >Discover the journey of the First Haitian Baptist Church of Kissimmee, from a divine calling to a thriving congregation.</p>
                            </div>
                        </div>
                    </section>
                    <div className="page-title">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1
                                        className="h1-title"
                                        style={{
                                            color: '#6a82fb', // Unique color for "Church History"
                                            fontSize: '2.8rem',
                                            fontWeight: 'bold',
                                            margin: '0 auto',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Church History
                                    </h1>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="flat-row pd-services-post">
                        <div className="container" style={{ position: 'relative', paddingLeft: '30px' }}>
                            <div style={{
                                position: 'absolute',
                                left: '20px',
                                top: '0',
                                bottom: '0',
                                width: '4px',
                                background: 'linear-gradient(to bottom, #6a82fb, #fc5c7d)',
                                borderRadius: '2px'
                            }}></div>
                            {this.state.history.map((item, idx) => (
                                <div
                                    key={item.id}
                                    className="history-item"
                                    style={{
                                        display: 'flex',
                                        flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                                        alignItems: 'center',
                                        marginBottom: '50px',
                                        padding: '40px 30px',
                                        borderRadius: '12px',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 6px 24px rgba(106,130,251,0.08)',
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        left: '-38px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '20px',
                                        height: '20px',
                                        background: '#fc5c7d',
                                        borderRadius: '50%',
                                        border: '4px solid #fff',
                                        boxShadow: '0 2px 8px rgba(252,92,125,0.2)'
                                    }}></div>
                                    <div className="history-text" style={{ flex: 1, padding: '0 30px' }}>
                                        <h2 className="history-title" style={{
                                            fontSize: '2rem',
                                            fontWeight: 700,
                                            color: '#6a82fb',
                                            marginBottom: '15px'
                                        }}>{item.title}</h2>
                                        <p className="history-content" style={{
                                            fontSize: '1.1rem',
                                            color: '#333',
                                            lineHeight: 1.7
                                        }}>{item.content}</p>
                                    </div>
                                    <div className="history-image" style={{ flex: 1, textAlign: 'center' }}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="gallery-image"
                                            style={{
                                                maxWidth: '90%',
                                                borderRadius: '10px',
                                                boxShadow: '0 4px 16px rgba(106,130,251,0.12)'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default ChurchHistory;