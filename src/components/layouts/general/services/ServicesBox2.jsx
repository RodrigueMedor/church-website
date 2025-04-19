import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class EventBoxs2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataEvents: [
                {
                    id: 4,
                    classicon: 'icon-rounded magic',
                    title: 'Showcase Outreach Programs',
                    description: 'Youth Ministry: Engaging the next generation with faith-building activities.\n' +
                        'Food Pantry: Supporting local families in need.\n' +
                        'Global Missions: Partnering with organizations to share the gospel worldwide.',
                },
                {
                    id: 5,
                    classicon: 'icon-rounded artboard',
                    title: 'Invite Participation',
                    description: 'Learn More About Us,\n' +
                        'Join a Ministry,\n' +
                        'Attend Our Services',
                },
                {
                    id: 6,
                    classicon: 'icon-rounded global',
                    title: 'Our Values',
                    description: 'Faith: Grounded in scripture.\n' +
                        'Compassion: Embracing all with the love of Christ.\n' +
                        'Service: Making a difference in our community and beyond.',
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

export default EventBoxs2;
