import * as vars from './vars';

/*
	HANDLERS
*/
export function handlers(){
	return {
		...this,
		radioToggle: function(radio, options) { 
			this.dispatch(this.events.setRadioEnabled(radio, options))
		},
		radioChannel: function(radio, options) { 
			this.dispatch(this.events.setRadioChannel(radio, options))
		},
		radioWidth: function(radio, options) { 
			this.dispatch(this.events.setRadioWidth(radio, options)) 
		},
		profileDelete: function(i) { 
			this.dispatch(this.events.profileDelete(i)) 
		},
		profileDeleteCancel: function() { 
			this.dispatch(this.events.profileDeleteCancel()) 
		},
		profileDeleteConfirm: function(i) { 
			this.dispatch(this.events.profileDeleteConfirm(i)) 
		},
		// addProfile: function(profile) { 
		// 	this.dispatch(this.events.addProfile(profile)) 
		// }
	}
};

/*
	EVENTS
*/
export function events(){
	return {
		...this,
		setRadioEnabled: function(radio, options) { 
			return {
				type: vars.container + '/RADIO_SET_ENABLED',
				radio,
				enabled: options.enabled
			}
		},
		setRadioChannel: function(radio, options) { 
			return {
				type: vars.container + '/RADIO_SET_CHANNEL',
				radio,
				channel: options.channel
			}
		},
		setRadioWidth: function(radio, options) { 
			return {
				type: vars.container + '/RADIO_SET_WIDTH',
				radio,
				width: options.width
			}
		},
		addProfile: function(profile) { 
			return {
				type: vars.container + '/PROFILE_ADD',
				profile
			}
		},
		profileDelete: function(profileIndex) { 
			return {
				type: vars.container + '/PROFILE_DELETE',
				profileIndex
			}
		},
		profileDeleteCancel: function() { 
			return {
				type: vars.container + '/PROFILE_DELETE_CANCEL'
			}
		},
		profileDeleteConfirm: function(profileIndex) { 
			return {
				type: vars.container + '/PROFILE_DELETE_CONFIRM',
				profileIndex
			}
		}
	}
}