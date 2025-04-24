import React, { Component } from 'react';

class OurBelief extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beliefs: [
                {
                    id: 1,
                    title: 'The Bible',
                    content: 'We believe the Bible is the inspired Word of God, serving as the ultimate authority for faith and practice.',
                    image: '/images/beliefs/history-1.png',
                },
                {
                    id: 2,
                    title: 'Salvation',
                    content: 'Salvation is a gift from God, received through faith in Jesus Christ as Lord and Savior.',
                    image: '/images/beliefs/history-2.png',
                },
                {
                    id: 3,
                    title: 'The Church',
                    content: 'The Church is the body of Christ, called to worship, serve, and share the Gospel with the world.',
                    image: '/images/beliefs/history-2.png',
                },
                {
                    id: 4,
                    title: 'Baptism',
                    content: 'Baptism is an outward expression of an inward faith, symbolizing the believer’s identification with Christ.',
                    image: '/images/beliefs/history-1.png',
                },
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
                                }}>OUR BELIEF</h1>
                                <p className="banner-subtitle" style={{
                                    fontSize: '1.5rem',
                                    color: '#ddd',
                                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                    maxWidth: '800px',
                                    margin: '0 auto'
                                }}>
                                    Learn about the core principles that guide our faith and mission.
                                </p>
                            </div>
                        </div>
                    </section>
                    <div className="page-title">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-title-heading" style={{ textAlign: 'center' }}>
                                        <h1 className="h1-title">Our Beliefs</h1>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="flat-row pd-services-post">
                        <div className="container">
                            {this.state.beliefs.map((belief) => (
                                <div
                                    key={belief.id}
                                    className="belief-item"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '50px',
                                        padding: '50px',
                                        borderRadius: '10px',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <div className="belief-text" style={{ flex: 1, paddingRight: '20px' }}>
                                        <h2 className="belief-title">{belief.title}</h2>
                                        <p className="belief-content">{belief.content}</p>
                                    </div>
                                    <div className="belief-image" style={{ flex: 1, textAlign: 'right' }}>
                                        <img
                                            src={belief.image}
                                            alt={belief.title}
                                            className="gallery-image"
                                            style={{ maxWidth: '100%', borderRadius: '8px' }}
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

export default OurBelief;