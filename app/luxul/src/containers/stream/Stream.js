import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AppTop from './../app/components/AppTop';
import AppBottom from './../app/components/AppBottom';

//import { setRadioEnabled, setRadioChannel, setRadioWidth, profileAdd, profileDelete } from '../../redux/stream';
import './css/layout.scss';

// layout
class Stream extends React.PureComponent {
    preventLocationChange = (e) => { e.preventDefault(); }

    render() {
       //console.log('Stream.js props',this.props);

        return (
            <div className="container containerStream">
                <AppTop handlers={this.props.route.handlers} />
                <div className="section sectionStream">
                    <p>Some AJAX and Websocket content will go here</p>
                    <ul>
                        <li><b>location.pathname:</b> {this.props.location.pathname}</li>
                        <li><b>page:</b> {this.props.app.page.title}</li>
                        <li className={this.props.params.category ? '' : 'hidden'}><b>category:</b> {this.props.params.category}</li>
                    </ul>
                </div>
                <AppBottom handlers={this.props.route.handlers} />
            </div>
        )
    }
}

// data
const mapStateToProps = (state) => {
    if (state.app.debug) {
        console.log('Stream.js state', state);
    }
    return {
    	app: state.app
    };
};
export default connect(mapStateToProps)(Stream);