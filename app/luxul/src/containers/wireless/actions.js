import * as vars from './vars';

/*
	HANDLERS
*/
export function handlers(){
	return {
		...this,

		save__radio: function(radio, options) { 
			this.dispatch(this.events.save__radio(radio, options))
		},
		save__profileSettings: function(profileSettings) { 
			this.dispatch(this.events.save__profileSettings(profileSettings))
		},

		profileAdd: function(i) { 
			this.dispatch(this.events.profileAdd(i)) 
		},
		profileDelete: function(i) { 
			this.dispatch(this.events.profileDelete(i)) 
		},
		profileDeleteCancel: function() { 
			this.dispatch(this.events.profileDeleteCancel()) 
		},
		profileDeleteConfirm: function(i) { 
			this.dispatch(this.events.profileDeleteConfirm(i)) 
		}
	}
};

/*
	EVENTS
*/
export function events(){
	return {
		...this,

		save__radio: function(radio, options) { 
			return {
				type: vars.container + '/save__radio',
				radio,
				options
			}
		},
		save__profileSettings: function(profileSettings) { 
			return {
				type: vars.container + '/save__profileSettings',
				profileSettings
			}
		},

		profileAdd: function(profile) { 
			return {
				type: vars.container + '/profileAdd',
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