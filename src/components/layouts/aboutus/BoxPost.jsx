import React, { Component } from 'react';
import { Link } from "react-router-dom";
class BoxPost extends Component {
	constructor(props) {
        super(props);
        this.state = {
            infobox: [
                {
                    id: '1',
                    srcimg: 'images/about/01.jpg',
                    subtitle:'Pator & Author',
                    title: 'FRIZTNER BROUARD',
                    description: 'Our Pastor devoted servant of God with a deep passion for guiding others in faith, wisdom, and love. With years of dedicated ministry, he has been a beacon of hope and inspiration within the First Haitian Baptist Church of Kissimmee and beyond.\n' +
                        'As a visionary leader, he is committed to fostering spiritual growth, community outreach, and discipleship.',
                    classdivider: 'dividers dividers-about-post'
                },
                {
                    id: '2',
                    srcimg: 'images/about/02.jpg',
                    subtitle:'Deacon & Elder',
                    title: 'XXXXX ZZZZZ',
                    description: 'The Deacons of the First Haitian Baptist Church of Kissimmee are dedicated servants of God who play a vital role in supporting the church’s ministry. They are committed to assisting in the spiritual, administrative, and practical needs of the congregation.',
                    classdivider: 'dividers dividers-about-post'
                },
                {
                    id: '3',
                    srcimg: 'images/about/03.jpg',
                    subtitle:'Evangelist',
                    title: 'YYYYY TTTT',
                    description: 'An Evangelist focuses on spreading the Gospel and sharing the message of salvation with others. Their role often involves outreach activities, revivals, and community missions to bring people to Christ.',
                    classdivider: 'dividers dividers-about-post'
                },
                {
                    id: '4',
                    srcimg: 'images/about/04.jpg',
                    subtitle:'Missionary',
                    title: 'TTT testsss',
                    description: 'Children\'s Ministry and Missions Coordinator.',
                    classdivider: ''
                }
            ]
            
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.infobox.map(data =>(
                        <div key={data.id} >
                        <article className="entry">
                            <div className="feature-post">                                    
                                <Link to="#">
                                    <img src={data.srcimg} alt="img" />
                                </Link>                                    
                            </div>
                            <div className="content-post">
                                <div className="position">{data.subtitle}</div>	
                                <h3 className="title-post"><Link to="#">{data.title}</Link></h3>
                                <div className="entry-post">
                                    <p>{data.description}</p>
                                </div>
                                <div className="wrap-button s2">
                                    <Link className="flat-button" to="#">View Profile</Link>
                                </div>                                  
                            </div>
                        </article>
                         <div className={data.classdivider}></div>
                        </div>
                    ))
                }
                
            </div>
        )
                                
    }
}

export default BoxPost;
