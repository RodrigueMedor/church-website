import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Team extends Component {
	constructor(props) {
        super(props);
        this.state = {
            menutab: [
                {
                    id: 1,
					title: 'Pastor & Staff',
                },
                {
                    id: 2,
                    title: 'Our Mission',
                    class: 'active'
                },
                {
                    id: 3,
					title: 'Our History',
                },
                {
                    id: 4,
					title: 'Our Beliefs',
                },
                {
                    id: 5,
					title: 'Our Vision',
                },
                {
                    id: 6,
					title: 'Our Values',
				},
				
            ],
            titletab: [
                {
                    id: 1,
                    title: 'Explore Our 2025 Church Financial Prospectus',
                    description: 'Discover our 2025 financial prospectus brochure for a clear and concise guide to all the ministries, programs, and services offered by the church.'
                }
            ]
        }
    }
    render() {
        return (
			<div className="col-md-3">
                <div className="sidebar left">
                    <aside className="widget widget_nav_menu">
                        <div className="menu-services-container">
                            <ul className="menu menu-tab">
                                {
                                    this.state.menutab.map(data =>(
                                        <li className={data.class} key={data.id} ><Link to="#">{data.title}</Link></li>
                                    ))
                                }										
                            </ul>
                        </div>
                    </aside>

                    <aside className="widget widget-brochure services">
                        {
                            this.state.titletab.map(data =>(
                                <div className="brochure-box-title" key={data.id} >
                                    <h5 className="brochure-title">{data.title}</h5>
                                    <p> {data.description}</p>
                                </div>
                            ))
                        }			
                        <p className="btn-download">
                            <Link to="#" title="" className="pdf">Download .PDF</Link>
                        </p>
                        <p className="btn-download doc">
                            <Link to="#" title="" className="doc">Download .DOC</Link>
                        </p>
                    </aside>
                </div>
            </div>
        )
                                
    }
}

export default Team;
