import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class ServicesBoxs1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataEvents: [
                {
                    id: 1,
                    classicon: 'icon-rounded clipboard',
                    title: 'Mission Statement',
                    description: 'Our mission is to share God\'s love, inspire faith, and serve our community by fostering spiritual growth and compassion.',
                },
                {
                    id: 2,
                    classicon: 'icon-rounded line-chart',
                    title: 'Vision Statement',
                    description: 'We envision a world where everyone feels loved, valued, and supported through the teachings of Jesus Christ.',
                },
                {
                    id: 3,
                    classicon: 'icon-rounded clock',
                    title: 'Highlight Core Beliefs or Values',
                    description: 'Faith: Trusting in God\'s word as a foundation for life.\n' +
                        'Community: Building meaningful connections with one another.\n' +
                        'Service: Reaching out to those in need with compassion.',
                },
            ]
        }
    }
    
    render() {
        return (
            <div className="row">
                {
                    this.state.dataEvents.map(data => (
                        <div className="col-md-4" key={data.id}>
                            <div className="iconbox-item">
                                <div className="iconbox style1">
                                    <div className="box-header">
                                        <div className={data.classicon}>
                                            
                                        </div>
                                        {/* <!-- /.icon-rounded --> */}
                                        <div className="box-title">
                                            <Link to="#" title="">{data.title}</Link>
                                        </div>
                                        {/* <!-- /.box-title --> */}
                                        </div>
                                        {/* <!-- /.box-header --> */}
                                    <div className="box-content">{data.description}</div>
                                    {/* <!-- /.box-content --> */}
                                </div>
                                 {/* <!-- /.iconbox --> */}
						    </div>
                            {/* <!-- /.iconbox-item --> */}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ServicesBoxs1;
