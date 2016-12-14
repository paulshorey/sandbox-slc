/*
    DUMB component - it don't know state
*/
// import * as vars from '../vars';

import React from 'react';
// import {reduxForm} from 'redux-form';
//import {TextField, Toggle} from 'redux-form-material-ui';

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
//import CSSModules from 'react-css-modules';

export default class WirelessProfilesEdit extends React.PureComponent {
    render() {
        let {
            radios,
            profileSettings,
            events,
            handlers,
            handleSubmit
        } = this.props;
        return (
            <Paper zDepth={4} className="componentWireless componentWirelessProfilesEdit" disabled={ ! this.props.radios.all.enabled}>
                <form onSubmit={(e)=>{e.preventDefault();}}>
                    <h3 className="form-title">Add WiFi Profile:</h3>
                    <div className="mui-fields">
                        <SelectField
                            name="radio"
                            floatingLabelText="Band:"
                            fullWidth
                            value={profileSettings.radio}
                            onChange={ (event, key, value) => { handlers.save__profileSettings({radio:value}); } }
                            >
                            <MenuItem value="first" primaryText="first"/>
                            <MenuItem value="2.4GHz" primaryText="2.4GHz" disabled={ ! this.props.radios["2.4GHz"].enabled} />
                            <MenuItem value="5GHz" primaryText="5GHz" selected="selected" disabled={ ! this.props.radios["5GHz"].enabled} />
                            <MenuItem value="1" primaryText="1" />
                        </SelectField>
                    </div>
                    <div className="mui-fields">
                        <TextField
                            name="ssid"
                            floatingLabelText="SSID"
                            fullWidth
                            value={profileSettings.ssid}
                            onChange={ (event, value) => { handlers.save__profileSettings({ssid:value}); } }
                        />
                        <TextField
                            name="ssidBroadcast"
                            floatingLabelText="SSID Broadcast"
                            value={profileSettings.ssidBroadcast}
                            onChange={ (event, value) => { handlers.save__profileSettings({ssidBroadcast:value}); } }
                        />
                        <TextField
                            name="clientIsolation"
                            floatingLabelText="Client Isolation"
                            value={profileSettings.clientIsolation}
                            onChange={ (event, value) => { handlers.save__profileSettings({clientIsolation:value}); } }
                        />
                    </div>
                    <div className="mui-fields">
                        <SelectField
                            name="security"
                            floatingLabelText="Security:"
                            fullWidth
                            value={profileSettings.security}
                            onChange={ (event, key, value) => { handlers.save__profileSettings({security:value}); } }
                        >
                            <MenuItem value="none" primaryText="None" />
                            <MenuItem value="wpa" primaryText="WPA" />
                            <MenuItem value="wpa2" primaryText="WPA2" />
                            <MenuItem value="vpa+wpa2" primaryText="WAP/WPA2 Mixed" />
                        </SelectField>
                    </div>
                    <div className="mui-buttons">
                        <RaisedButton
                            className="mui-RaisedButton"
                            label="Add"
                            type="submit"
                            primary
                            onClick={ ()=>{ handlers.profileAdd(profileSettings); } }
                        />
                    </div>
                </form>
            </Paper>

        )
    }
}
//export default CSSModules(WirelessProfilesEdit, styles);

// export default reduxForm({
//     form: 'profile',
//     initialValues: {}
// })(WirelessProfilesEdit);