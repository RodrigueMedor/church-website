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
                    description: 'First Haitian Baptist Church of Kissimmee (FHBCK) would typically have a mission statement focused on fostering spiritual growth, serving the local community, and promoting Haitian culture and heritage.',
                },
                {
                    id: 2,
                    classicon: 'icon-rounded line-chart',
                    title: 'Vision Statement',
                    description: 'FHBCK’s mission is to equip members with a deep understanding of God’s Word and a personal relationship with Jesus Christ, empowering them to grow spiritually and serve both the church and the wider community in alignment with Gospel teachings.',
                },
                {
                    id: 3,
                    classicon: 'icon-rounded clock',
                    title: 'Highlight Core Beliefs or Values',
                    description: `FHBCK is grounded in the authority of God’s Word, promoting a personal relationship with Jesus Christ, strong and resilient faith, and a life of service. The church is committed to Gospel-centered teaching, inclusive evangelism, continuous spiritual growth, and building a supportive, faith-driven community.`,
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
