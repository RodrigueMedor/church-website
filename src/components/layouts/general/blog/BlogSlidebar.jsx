import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class newBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datanewBox: [
                {
                    id: 1,
                    srcimg: 'images/news/large-01.jpg',
                    title: 'Upcoming and Past Events at FHBCK.',
                    description:'God\'s love and grace guide us to walk together in faith and service. Join us in worship and fellowship, ...',
                    day: 'January 11, 2025',
                },
                {
                    id: 2,
                    srcimg: 'images/news/image-small-02.png',
                    title: 'Upcoming and Past Events at FHBCK.',
                    description:'God\'s love and grace guide us to walk together in faith and service. Join us in worship and fellowship, ...',
                    day: 'January 11, 2025',
                },
                {
                    id: 3,
                    srcimg: 'images/news/image-small-03.png',
                    title: 'Upcoming and Past Events at FHBCK.',
                    description:'God\'s love and grace guide us to walk together in faith and service. Join us in worship and fellowship, ...',
                    day: 'January 11, 2025',
                },
                {
                    id: 4,
                    srcimg: 'images/news/image-small-04.png',
                    title: 'Upcoming and Past Events at FHBCK.',
                    description:'God\'s love and grace guide us to walk together in faith and service. Join us in worship and fellowship, ...',
                    day: '1January 11, 2025',
                }
            ]
        }
    }
    
    render() {
        return (
            <div className="col-md-4">
                <div className="slidebar-news">
                    <aside className="widget widget-recent-news">
                        <ul className="recent-news">
                                {
                                    this.state.datanewBox.map(data => (
                                        <li key={data.id} >                                    
                                            <div className="thumb">
                                                <span className="overlay-pop"></span>
                                                <Link to="blog-single" onClick={() => {window.location.href="/blog-single"}}>
                                                    <img src={data.srcimg} alt="" />
                                                </Link>
                                                {/* <!-- /.thumb -->  */}
                                            </div>
                                            {/* <!-- /.row --> */}
                                            <div className="text">
                                                <h4>
                                                    <Link to="blog-single" onClick={() => {window.location.href="/blog-single"}} title="">{data.title}</Link>
                                                </h4>
                                                <div className="entry-post">
                                                    <p>{data.day}</p>
                                                </div>
                                            </div>
                                            {/* <!-- /.content-post -->*/}
                                        </li>
                                    ))
                                    
                                }
                        </ul>
                    </aside>
                    {/* <!-- /.widget-recent-news --> */}
                </div>
                {/* <!-- /.slidebar-news --> */}
            </div>
        );
    }
}

export default newBox;
