import React from 'react';

import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ProfileTable extends React.PureComponent {
    render() {
        const { profiles, handlers, profileDeleteConfirm } = this.props;
        const DeleteDialogActions = [
            <FlatButton
                label="Cancel"
                default={true}
                onTouchTap={() => { handlers.profileDeleteCancel(profileDeleteConfirm); } }
              />,
              <FlatButton
                label="Delete"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={() => { handlers.profileDelete(profileDeleteConfirm); } }
              />
        ];

        return (
            <Paper zDepth={4} className="componentWireless componentWireless">
                <h3 className="form-title">Your WiFi Profiles:</h3>

                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Band</TableHeaderColumn>
                            <TableHeaderColumn>SSID</TableHeaderColumn>
                            <TableHeaderColumn>SSID Broadcast</TableHeaderColumn>
                            <TableHeaderColumn>Client Isolation</TableHeaderColumn>
                            <TableHeaderColumn>Security Mode</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {profiles.map((profile, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableRowColumn>{profile.radio}</TableRowColumn>
                                    <TableRowColumn>{profile.ssid}</TableRowColumn>
                                    <TableRowColumn>
                                        {profile.ssidBroadcast ? "Enabled" : "Disabled"}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {profile.clientIsolation ? "Enabled" : "Disabled"}
                                    </TableRowColumn>
                                    <TableRowColumn>{profile.security}</TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton
                                            tooltip="Delete"
                                            onTouchTap={() => { handlers.profileDeleteConfirm(i); } }
                                        >
                                            <DeleteForever />
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                
                <Dialog
                    title="Delete Radio"
                    actions={DeleteDialogActions}
                    modal={false}
                    open={ profileDeleteConfirm!==false }
                    onRequestClose={this.s}
                    >
                    Are you sure you want to delete radio "{profileDeleteConfirm!==false ? profiles[profileDeleteConfirm].radio : ''}"?
                </Dialog>

            </Paper>
        )
    }
};