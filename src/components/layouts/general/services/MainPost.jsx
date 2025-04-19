import React, { Component } from 'react';
class MainPost extends Component {
	constructor(props) {
        super(props);
        this.state = {
            tabpost: [
                {
                    id: '1',
                    classcategory: 'wrap-one-half services',
                },
                {
                    id: '2',
                    classcategory: 'wrap-one-half services',
                },
                {
                    id: '3',
                    classcategory: 'wrap-one-half services',
                },
                {
                    id: '4',
                    classcategory: 'wrap-one-half services',
                },
                {
                    id: '5',
                    classcategory: 'wrap-one-half services',
                },
                {
                    id: '6',
                    classcategory: 'wrap-one-half services',
                },
            ],
            boxcontent: [
                {
                    id: '1',
                    title: 'Title',
                    description: 'Description and background.',
                },
                {
                    id: '2',
                    title: 'Title',
                    description: 'Description and background.',
                },
                {
                    id: '3',
                    title: 'Title',
                    description: 'Description and background.',
                },
            ],
            flatlist: [
                {
                    id: '1',
                    text: 'Design and build advanced applications for the Web'
                },
                {
                    id: '2',
                    text: 'Design and build advanced applications for the Web'
                },
                {
                    id: '3',
                    text: 'Design and build advanced applications for the Web'
                },
                {
                    id: '4',
                    text: 'Design and build advanced applications for the Web.'
                },
                {
                    id: '5',
                    text: 'Design and build advanced applications for the Web.'
                },
                {
                    id: '6',
                    text: 'Design and build advanced applications for the Web'
                },
            ],
            flattoggle: [
                {
                    id: '1',
                    title: 'Activity Planning - 1',
                    content: 'Content or description.',
                    classtoggle: 'toggle-title active'
                },
                {
                    id: '2',
                    title: 'Activity Planning - 2',
                    content: 'Content or description.',
                    classtoggle: 'toggle-title'
                },
                {
                    id: '3',
                    title: 'Activity Planning - 3',
                    content: 'Content or description.',
                    classtoggle: 'toggle-title'
                },
            ],
            titleplan: [
                {
                    id: '1',
                    title: 'Research beyond the business plan'
                }
            ],
            textplan: [
                {
                    id: '1',
                    text: 'At our church, we focus on understanding and addressing the deeper needs of our ministry, going beyond just plans to ensure long-term spiritual growth and impact.'
                },
                {
                    id: '2',
                    text: 'Our children\'s ministry is dedicated to fostering a strong foundation of faith in young hearts. Through engaging lessons, activities, and hands-on experiences, we aim to nurture their relationship with God and teach them Biblical principles in a fun and meaningful way.'
                },
                {
                    id: '3',
                    text: 'Our youth ministry is designed to empower and guide teenagers through the challenges of adolescence. We provide a supportive environment where they can grow in their faith, build lasting friendships, and develop leadership skills that will help them become strong, confident individuals who are committed to living out God\'s purpose for their lives.'
                },
                {
                    id: '4',
                    text: 'At our church, we believe in going beyond just the operational framework. We engage in research that looks deeper into understanding the long-term spiritual needs and mission of our congregation. This research helps shape our ministry and guide our vision, ensuring that every step we take aligns with our commitment to spiritual growth and community service. We are dedicated to developing a plan that goes beyond short-term goals, focusing on lasting, meaningful impact.'
                }
            ]
            
        }
    }
    render() {
        return (
            <div className="col-md-9 content-tab">
                {
                    this.state.tabpost.map(data =>(
                        <div className="content-inner" key={data.id} >
                            <div className={data.classcategory}>
                                <div className="one-half v1">
                                    <div className="box-content">
                                        {
                                            this.state.boxcontent.map(data =>(
                                                <div key={data.id} >
                                                   <div className="title">{data.title}</div>
                                                    <p>{data.description}</p>
                                                    <div className="dividers dividers-bc-v1"></div> 
                                                </div>
                                            ))
                                        }
                                        <ul className="flat-list">
                                            {
                                                this.state.flatlist.map(data=> (
                                                    <li key={data.id} >{data.text} </li>
                                                ))
                                            }
                                        </ul>
                                    </div>									
                                </div>
                                <div className="one-half v2">
                                    <div className="flexslider s1">
                                        <div className="flat-slides">                            
                                            <ul className="slides">
                                                <li>   
                                                    <img src="images/slides/sv1.jpg" alt="img" />
                                                </li>
                                                
                                                <li>
                                                    <img src="images/slides/sv1.jpg" alt="img" />
                                                </li>
                                            </ul> 
                                        </div>
                                    </div>

                                    <div className="flat-accordion style">
                                        {
                                            this.state.flattoggle.map(data =>(
                                                <div className="flat-toggle" key={data.id} >
                                                    <h6 className={data.classtoggle}>{data.title}</h6>
                                                    <div className="toggle-content">
                                                        <p>{data.content}</p>                               
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="dividers dividers-bc-v2"></div>
                                <div className="box-content">
                                    {
                                        this.state.titleplan.map(data =>(
                                            <div key={data.id} className="title">{data.title}</div>
                                        ))
                                    }
                                    {
                                        this.state.textplan.map(data =>(
                                            <div key={data.id} >
                                                <p>{data.text}</p>
                                                <div className="dividers dividers-bc-v3"></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
						</div>

                    ))
                }
                
            </div>
        )
                                
    }
}

export default MainPost;
