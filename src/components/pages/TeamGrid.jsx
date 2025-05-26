import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Header, TopBar, Footer, Loader } from '../layouts/general';
// import { MainGrid } from "../layouts/aboutus";
// import {MainServices} from "../layouts/general/services";
import ChurchHistory from './ChurchHistory';

class TeamGrid extends Component {
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
                    <ChurchHistory />

                    <Footer />
                </div>
            </div>
        );
    }
}

export default TeamGrid;