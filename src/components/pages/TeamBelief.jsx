import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Header, TopBar, Footer, Loader } from '../layouts/general';
// import { MainGrid } from "../layouts/aboutus";
// import {MainServices} from "../layouts/general/services";
import OurBelief from "./OurBelief";

class TeamBelief extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                {
                    id: 1,
                    names: 'Pages'
                }
            ],
            titleheading: [
                {
                    id: '1',
                    title: 'Team Grid'
                }
            ],
            breadcrumbs: [
                {
                    id: 1,
                    title: 'Home',
                    classicon: 'fa fa-angle-right',
                    aria: 'true'
                },
                {
                    id: 2,
                    title: 'About',
                    classicon: 'fa fa-angle-right',
                    aria: 'true'
                },
                {
                    id: 3,
                    title: 'Team Grid',
                    classicon: '',
                    aria: ''
                }
            ]
        };
    }

    render() {
        return (
            <div className="bg-body3">
                <div className="boxed">
                    <Loader />
                    <TopBar />
                    {
                        this.state.headers.map(data => (
                            <Header data={data} key={data.id} />
                        ))
                    }

                    <OurBelief />

                    <Footer />
                </div>
            </div>
        );
    }
}

export default TeamBelief;