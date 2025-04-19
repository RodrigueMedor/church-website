import React, { Component } from 'react';
import { Link } from "react-router-dom";

class TabPortfolio extends Component {
	constructor(props) {
        super(props);
        this.state = {
            tabportfolio: [
                {
					id: 1,
					classname: 'active',
					datafilter: '*',
					title: 'All',
				},
				{
					id: 2,
					classname: '',
					datafilter: '.business',
					title: 'Upcoming Events',
				},
				{
					id: 3,
					classname: '',
					datafilter: '.finance',
					title: 'Church Activities',
				},
				{
					id: 4,
					classname: '',
					datafilter: '.invoicing',
					title: 'Event Calendar',
				},
				{
					id: 5,
					classname: '',
					datafilter: '.management',
					title: 'Get Involved',
				},
				{
					id: 6,
					classname: '',
					datafilter: '.savings',
					title: 'Photo Gallery',
				},
				{
					id: 7,
					classname: '',
					datafilter: '.services',
					title: 'Prayer Requests',
				},
				{
					id: 8,
					classname: '',
					datafilter: '.trading',
					title: 'Newsletters',
				},
			],
        }
    }
    render() {
        return (
				/* <!--Tab Portfolio --> */
					<div className="bg-portfolio-filter">  
						<div className="container">
							<div className="row">
								<div className="col-md-12">                           
									<ul className="portfolio-filter">
										{
											this.state.tabportfolio.map(data =>(
												<li key={data.id} className={data.classname}><Link data-filter={data.datafilter} to="#">{data.title}</Link></li>
											))
										}
									</ul>
									{/* <!-- /.project-filter --> */}
								</div>
							</div>
						</div>
					</div>
        );
    }
}

export default TabPortfolio;
