import React, { Component } from 'react';
// import { Header, TopBar, Footer, Loader } from '../layouts/general';

class ChurchHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    id: 1,
                    title: 'Our Beginnings',
                    content: 'The First Haitian Baptist Church of Kissimmee, FL was founded in [year] with the mission to serve the Haitian community through worship, fellowship, and outreach.'
                },
                {
                    id: 2,
                    title: 'Growth and Expansion',
                    content: 'Over the years, the church has grown significantly, adding new ministries, programs, and services to meet the spiritual and practical needs of its members.'
                },
                {
                    id: 3,
                    title: 'Our Mission Today',
                    content: 'Today, the church continues to be a beacon of hope and faith, fostering spiritual growth and community engagement in Kissimmee and beyond.'
                }
            ]
        };
    }

    render() {
        return (
            <div className="bg-body3">
                <div className="boxed">
                    {/*<Loader />*/}
                    {/*<TopBar />*/}
                    {/*<Header data={{ id: 1, names: 'History' }} />*/}
                    <section className="flat-row pd-services-post">
                        <div className="banner" style={{ backgroundImage: 'url(/images/banner/Church.jpg)' }}>
                            <div className="banner-content">

                            <h1 className="banner-title" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Our Church History</h1>
                            <p className="banner-subtitle" style={{ fontSize: '1.2rem', color: '#555' }}>Discover our journey and mission to serve the community.</p>
                            </div>
                        </div>
                    </section>
                   <div className="page-title">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-title-heading" style={{ textAlign: 'center' }}>
                                        <h1 className="h1-title">Church History</h1>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="flat-row pd-services-post">
                        <div className="container">
                            {this.state.history.map((item) => (
                                <div
                                    key={item.id}
                                    className="history-item"
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
                                    <div className="history-text" style={{ flex: 1, paddingRight: '20px' }}>
                                        <h2 className="history-title">{item.title}</h2>
                                        <p className="history-content">{item.content}</p>
                                    </div>
                                    <div className="history-image" style={{ flex: 1, textAlign: 'right' }}>
                                        <img
                                            src={`/images/history/history-${item.id}.png`}
                                            alt={item.title}
                                            className="gallery-image"
                                            style={{ maxWidth: '100%', borderRadius: '8px' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/*<Footer />*/}
                </div>
            </div>
        );
    }
}

export default ChurchHistory;