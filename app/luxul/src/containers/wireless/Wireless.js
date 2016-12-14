/*
    SMART component - it does mapStateToProps
*/

import React from 'react';
import { connect } from 'react-redux';

import AppTop from './../app/components/AppTop';
import AppBottom from './../app/components/AppBottom';

import WirelessRadios from './components/WirelessRadios';
import WirelessProfilesEdit from './components/WirelessProfilesEdit';
import WirelessProfilesDisplay from './components/WirelessProfilesDisplay';

import './css/layout.scss';

class Wireless extends React.PureComponent {
    render() {
        const { profiles, radios, dispatch, profileSettings, profileDeleteConfirming } = this.props;
        let actions = require('./actions');
        const events = actions.events.call({});
        const handlers = actions.handlers.call({ events, dispatch });
        return (
            <div className="container containerWireless">
                <AppTop />
                <div className="section sectionWireless section2">
                    <WirelessRadios
                        radios={radios}
                        events={events}
                        handlers={handlers}
                    />
                    <WirelessProfilesEdit
                        radios={radios}
                        events={events}
                        handlers={handlers}
                        profileSettings={profileSettings}
                    />
                </div>
                <WirelessProfilesDisplay
                    className="section sectionWireless section1"
                    profiles={profiles}
                    events={events}
                    handlers={handlers}
                    profileDeleteConfirming={profileDeleteConfirming}
                />
                <AppBottom />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    if (state.app.debug) {
        console.log('Wireless.js state', state);
    }
    return {
        radios: state.wireless.radios,
        profiles: state.wireless.profiles,
        profileSettings: state.wireless.profileSettings,
        profileDeleteConfirming: state.wireless.profileDeleteConfirming,
    };
};
export default connect(mapStateToProps)(Wireless);
