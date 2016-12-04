import React from 'react';
import FontIcon from 'material-ui/FontIcon';

/*
	vars
	-
	these exports are imported to a component file as an object called	vars -  are common and reusable variables for the current container 
*/
/*
	vars.container
	-
	the dirname of the current container
	helps to copy/paste code from one file to another, without having to change the name of the component in each spot
*/
export const container = 'app';
/*
	vars.initialState
	-
	this is used ONLY initially by the reducer, to generate the state
	consequently, the generated state is used to generate a new state
	so, functions inside this object cannot reference the state object, but utilizing a closure, can reference the initial state of this initialState object, which is ok for static data
*/
export const initialState = (function(){
	// state
	let state = {
		debug: false,
		drawerOpen: false
	};
	// state.pages
	state.pages = new Map([
		["/secondary_nav_page", {
			secondaryNavPosition: 0,
			title: "First Page On Secondary NavBar",
			icon: <FontIcon className="material-icons">more</FontIcon>
		}], 
		["/stream", {
			mainNavPosition: 1,
			title: "Stream Something",
			icon: <FontIcon className="material-icons">wifi</FontIcon>,
			options: new Map([
				["/stream/option1", {
					navPosition: 0,
					title: "Watch Stuff",
					icon: <FontIcon className="material-icons">videocam</FontIcon>
				}], 
				["/stream/option2", {
					navPosition: 1,
					title: "Some Audio",
					icon: <FontIcon className="material-icons">wifi</FontIcon>
				}], 
				["/stream/option3", {
					navPosition: 2,
					title: "Link Three",
					icon: <FontIcon className="material-icons">speaker_notes</FontIcon>
				}]
			])
		}], 
		["/", {
			mainNavPosition: 0,
			title: "Dashboard",
			icon: <FontIcon className="material-icons">dashboard</FontIcon>
		}],
		["/test/something", {
			mainNavPosition: 2,
			title: "Test",
			icon: <FontIcon className="material-icons">help</FontIcon>,
			options: new Map([
				["/test/option1", {
					navPosition: 0,
					title: "Link 1",
					icon: <FontIcon className="material-icons">videocam</FontIcon>
				}], 
				["/test/option2", {
					navPosition: 1,
					title: "Link 2",
					icon: <FontIcon className="material-icons">wifi</FontIcon>
				}], 
				["/test/option3", {
					navPosition: 2,
					title: "Link 3",
					icon: <FontIcon className="material-icons">speaker_notes</FontIcon>
				}]
			])
		}],
		["/404", {
			title: "Page Not Found",
			icon: <FontIcon className="material-icons">note</FontIcon>
		}]
	]);
	// state.pageSelect
	state.pageSelect = (function(statePages){
		var pageURL = '';
		const getFirstPath = function(path) {
			return path.substr(0, path.substr(1).indexOf('/') + 1) || path;
		}
		return function(newURL){
			pageURL = '';
			let locationFirstPath = getFirstPath(newURL || window.location.pathname);
			statePages.forEach(function(page, url) {
				let urlFirstPath = getFirstPath(url);
				if (urlFirstPath == locationFirstPath) {
					pageURL = statePages.get(url);
					return;
				}
			});
			if (!pageURL) {
				pageURL = statePages.get('/404');
			}
			return pageURL;
		};
	}(state.pages));
	// state.page
	state.page = state.pageSelect(window.location.pathname);
	// =>
	return state;
}());