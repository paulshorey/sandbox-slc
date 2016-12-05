import React from 'react';
import {reduxForm, Field} from 'redux-form';

import Paper from 'material-ui/Paper';
import {TextField, SelectField, Toggle} from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
//import CSSModules from 'react-css-modules';

class WirelessProfilesEdit extends React.PureComponent {
    render() {
        const {
            radios,
            handleSubmit
        } = this.props;
        return (
            <Paper zDepth={4} className="componentWireless componentWirelessProfilesEdit" disabled={ ! this.props.radios.all.enabled}>
                <form onSubmit={handleSubmit}>
                    <h3 className="form-title">Add WiFi Profile:</h3>
                    <div className="mui-fields">
                        <Field
                            name="radio"
                            component={SelectField}
                            floatingLabelText="Band:"
                            fullWidth
                        >
                            <MenuItem value="2.4GHz" primaryText="2.4GHz" disabled={ ! this.props.radios["2.4GHz"].enabled} />
                            <MenuItem value="5GHz" primaryText="5GHz" disabled={ ! this.props.radios["5GHz"].enabled} />
                        </Field>
                    </div>
                    <div className="mui-fields">
                        <Field
                            name="ssid"
                            component={TextField}
                            floatingLabelText="SSID"
                            fullWidth
                        />
                        <Field
                            name="ssidBroadcast"
                            component={Toggle}
                            label="SSID Broadcast"
                        />
                        <Field
                            name="clientIsolation"
                            component={Toggle}
                            label="Client Isolation"
                        />
                    </div>
                    <div className="mui-fields">
                        <Field
                            name="security"
                            component={SelectField}
                            floatingLabelText="Security:"
                            fullWidth
                        >
                            <MenuItem value="none" primaryText="None" />
                            <MenuItem value="wpa" primaryText="WPA" />
                            <MenuItem value="wpa2" primaryText="WPA2" />
                            <MenuItem value="vpa+wpa2" primaryText="WAP/WPA2 Mixed" />
                        </Field>
                    </div>
                    <div className="mui-buttons">
                        <RaisedButton
                            className="mui-RaisedButton"
                            label="Add"
                            type="submit"
                            primary
                        />
                    </div>
                </form>
            </Paper>

        )
    }
}
//export default CSSModules(WirelessProfilesEdit, styles);

export default reduxForm({
    form: 'profile',
    initialValues: {
        radio: "2.4GHz",
        ssid: "",
        ssidBroadcast: true,
        clientIsolation: false,
        security: "none"
    }
})(WirelessProfilesEdit);