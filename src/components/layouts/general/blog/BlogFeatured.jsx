import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class BlogFeatured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datanewBox: [
                {
                    id: 1,
                    srcimg: 'images/news/01.png',
                    classname:'post style2',
                    title: 'Upcoming and Past Events at FHBCK.',
                    description:'God\'s love and grace guide us to walk together in faith and service. Join us in worship and fellowship.',
                    day: '11',
                    month: 'JAN'
                },
                {
                    id: 2,
                    srcimg: 'images/news/02.png',
                    classname:'post style2',
                    title: 'Why your sales forecast is off',
                    description:'God\'s love and grace guide us to walk together in faith and service. Join us in worship and fellowship., ...',
                    day: '11',
                    month: 'JAN'
                },
            ]
        }
    }
    
    render() {
        return (
            <div>
             {
                this.state.datanewBox.map(data => (
                    <div className="col-md-4" key={data.id}>
                        <article className="post style2" >
                            <div className="featured-post">
                                <Link to="blog-single" onClick={() => {window.location.href="/blog-single"}} title="" className="post-image">
                                    <img src={data.srcimg} alt="financial" />
                                </Link>
                                <ul className="post-date">
                                    <li className="day">{data.day}</li>
                                    <li className="month">{data.month}</li>
                                </ul>
                            </div>
                            {/* <!-- /.featured-post --> */}
                            <div className="content-post">
                                <h4 className="title-post">
                                    <Link to="blog-single" onClick={() => {window.location.href="/blog-single"}} title="">{data.title}</Link>
                                </h4>
                                <div className="entry-post">
                                    <p>{data.description}</p>
                                </div>      
                            </div>
                            {/* <!-- /.content-post --> */}
                        </article>
                {/* <!-- /.post --> */}
            </div>
                ))
                }
            </div>
            
                               
        );
    }
}

export default BlogFeatured;
