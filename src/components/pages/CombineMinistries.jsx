// import React, { Component } from 'react';
// import {Header, TopBar, Footer, Loader, YouthMinistry} from '../layouts/general';
// // import YouthMinistry from "./YouthMinistry";
// // import Header from "../layouts/general/header/Header";
//
// class CombineMinistries extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             headers: [
//                 {
//                     id: 1,
//                     names: 'Pages'
//                 }
//             ],
//             titleheading: [
//                 {
//                     id: '1',
//                     title: 'Team Grid'
//                 }
//             ],
//             breadcrumbs: [
//                 {
//                     id: 1,
//                     title: 'Home',
//                     classicon: 'fa fa-angle-right',
//                     aria: 'true'
//                 },
//                 {
//                     id: 2,
//                     title: 'About',
//                     classicon: 'fa fa-angle-right',
//                     aria: 'true'
//                 },
//                 {
//                     id: 3,
//                     title: 'Team Grid',
//                     classicon: '',
//                     aria: ''
//                 }
//             ]
//         };
//     }
//
//     render() {
//         return (
//             <div className="bg-body3">
//                 <div className="boxed">
//                     <Loader />
//                     <TopBar />
//                     {
//                         this.state.headers.map(data => (
//                             <Header data={data} key={data.id} />
//                         ))
//                     }
//
//                     <YouthMinistry />
//
//                     <Footer />
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default CombineMinistries;