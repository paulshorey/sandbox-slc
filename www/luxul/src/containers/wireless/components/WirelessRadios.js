import React from 'react';

import Paper from 'material-ui/Paper';

import WirelessRadio from './WirelessRadio';

export default class WirelessRadios extends React.PureComponent {
    render() {
        const {
            radios,
            events,
            handlers
        } = this.props;

        return (
            <div className="componentWireless componentWirelessRadios componentShell">
                
                {(radios.all.keys).map((x, i) => { return <WirelessRadio key={i} ghz={x} radios={radios} events={events} handlers={handlers} />; } )}

            </div>
        )
    }
};