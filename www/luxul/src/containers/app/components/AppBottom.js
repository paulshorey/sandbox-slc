import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {BottomNavigation,BottomNavigationItem} from 'material-ui/BottomNavigation';

class AppBottom extends React.PureComponent {
	render() {

		// dependencies
		const { dispatch } = this.props;
		const actions = require('./../actions');
		const events = actions.events.call({});
		const handlers = actions.handlers.call({ events, dispatch });

		// elements
		var BottomNavigationItems = [];
		(new Map([...(this.props.app.pages).entries()].sort( (a,b) => { return a[1].mainNavPosition > b[1].mainNavPosition } ))).forEach(function(page, url) { // sort by main-nav position
			if (isNaN(page.mainNavPosition)) { // ignore all pages not in main-nav
				return;
			}
			BottomNavigationItems.push(
				<BottomNavigationItem
					key={url}
					label={page.title}
					icon={page.icon}
					onTouchTap={ ()=>{ handlers.pageUrl(url);  } }
				/>
			);
		});

		// container
		return (
			<Paper zDepth={3} id="AppBottom">
				<BottomNavigation selectedIndex={this.props.app.page.mainNavPosition}>
					{BottomNavigationItems}
				</BottomNavigation>
			</Paper>
		)
	}
};
AppBottom.contextTypes = {
	store: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		app: state.app
	};
};
export default connect(mapStateToProps)(AppBottom);