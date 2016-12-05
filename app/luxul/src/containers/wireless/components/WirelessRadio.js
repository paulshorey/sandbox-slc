import React from 'react';

import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class WirelessRadios extends React.PureComponent {
    render() {
        const {
            ghz,
            radios,
            events,
            handlers
        } = this.props;

        return (
            <Paper zDepth={4} className="componentShellContent">
                <Toggle
                    className="mui-fields mui-Toggle form-title"
                    label={ghz+" Radio "+(this.props.radios[ghz].enabled ? "Enabled" : "Disabled")}
                    toggled={this.props.radios[ghz].enabled}
                    onToggle={ (event, value) => handlers.radioToggle(ghz, {enabled:value}) }
                />
                <SelectField
                    className="mui-fields mui-SelectField"
                    floatingLabelText={ghz+" Channel:"}
                    value={this.props.radios[ghz].channel}
                    onChange={ (event, key, value) => { handlers.radioChannel(ghz, {channel:value}) } }
                    fullWidth
                    disabled={ ! this.props.radios[ghz].enabled}
                >
                    {(this.props.radios[ghz].channels).map((x, i) => { return <MenuItem key={i} value={x} primaryText={x} />; } )}
                </SelectField>
                <SelectField
                    className="mui-fields mui-SelectField"
                    floatingLabelText={ghz+" Width:"}
                    value={this.props.radios[ghz].width}
                    onChange={ (event, key, value) => { handlers.radioWidth(ghz, {width:value}) } }
                    fullWidth
                    disabled={ ! this.props.radios[ghz].enabled}
                >
                    {(this.props.radios[ghz].widthsAvailableFunction()).map((x,i) => { return <MenuItem key={i} value={x} primaryText={x} disabled={this.props.radios[ghz].disabledWidth==x} />; } )}
                </SelectField>
            </Paper>
        )
    }
};