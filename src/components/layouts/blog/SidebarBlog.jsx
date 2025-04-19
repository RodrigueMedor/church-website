import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class SidebarBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listrecentpost: [
                {
                    id: '1',
                    title: 'Upcoming and Past Events at First Haitian Baptist Church of Kissimmee.',
                    datapost: 'January 13, 2025'
                },
                {
                    id: '2',
                    title: 'Upcoming and Past Events at First Haitian Baptist Church of Kissimmee.',
                    datapost: 'January 18, 2025'
                },
                {
                    id: '3',
                    title: 'Upcoming and Past Events at First Haitian Baptist Church of Kissimmee.',
                    datapost: 'January 11, 2025'
                },
                {
                    id: '4',
                    title: 'Upcoming and Past Events at First Haitian Baptist Church of Kissimmee.',
                    datapost: 'January 11, 2025'
                }
            ],
            category: [
                {
                    id: '1',
                    title: 'Youth'
                },
                {
                    id: '2',
                    title: 'Children'
                },
                {
                    id: '3',
                    title: 'Worship Leader'
                },
                {
                    id: '4',
                    title: 'Special Events Coordinator'
                },
            ],
            tabcloud: [
                {
                    id: '1',
                    tablink: 'Children\'s Ministry and Missions'
                },
                {
                    id: '2',
                    tablink: 'Worship Coordinator'
                },
                {
                    id: '3',
                    tablink: 'Special Events Coordinator'
                },
                {
                    id: '4',
                    tablink: 'Director and Worship Leader'
                },
                {
                    id: '5',
                    tablink: 'Production Director'
                },
                {
                    id: '6',
                    tablink: 'Special Events Coordinator'
                },
                {
                    id: '7',
                    tablink: 'Management'
                },
                {
                    id: '8',
                    tablink: 'Portfolio'
                },
                {
                    id: '9',
                    tablink: 'ThemeForest'
                }
            ]
        }
    }
    render() {
        return (
                <div className="col-md-4">
                    <div className="sidebar right">
                        <aside id="recent-post" className=" widget widget-recent">
                            <h3 className="widget-title">RECENT POSTS</h3>
                            <ul>
                                {
                                    this.state.listrecentpost.map(data => (
                                        <li key={data.id} >
                                            <Link to="blog-single" onClick={() => {window.location.href="/blog-single"}} title="">{data.title}</Link>
                                            <span>{data.datapost}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </aside>
                        <aside className=" widget widget-categories">
                            <h3 className="widget-title">CATEGORIES</h3>
                            <ul>
                                {
                                    this.state.category.map(data => (
                                        <li key={data.id} ><Link to="#" title="">{data.title}</Link></li>
                                    ))
                                }
                            </ul>
                        </aside>
                        {/*<aside className="widget widget-brochure">*/}
                        {/*    <div className="brochure-box-title">*/}
                        {/*        <h5 className="brochure-title">Our Brochure</h5>*/}
                        {/*        <p>View our 2016 financial prospectus brochure*/}
                        {/*            for an easy to read guide on all of the*/}
                        {/*            services offered.*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*    <p className="btn-download">*/}
                        {/*        <Link to="#" title="" className="pdf">Download .PDF</Link>*/}
                        {/*    </p>*/}
                        {/*    <p className="btn-download doc">*/}
                        {/*        <Link to="#" title="" className="doc">Download .DOC</Link>*/}
                        {/*    </p>*/}
                        {/*</aside>*/}
                        <aside className="widget widget-tags">
                            <h3 className="widget-title">TAGS</h3>
                            <div className="tag-cloud">
                                {
                                    this.state.tabcloud.map(data =>(
                                        <Link key={data.id} to="#" title="" className="tag-link">{data.tablink}</Link>
                                    ))
                                }
                            </div>
                        </aside>
                    </div>
                </div>
        );
    }
}

export default SidebarBlog;
