import * as vars from './vars';

export default function wirelessReducer(state = vars.initialState, action = {}) {
    switch (action.type) {

        case vars.container+'/save__radio':
        {
            const { radio, options } = action;
            // filter
            if (options.enabled !== undefined) {
                state.radios[radio].enabled = options.enabled;
                state.radios.all.enabled = false;
                for(let r in state.radios) {
                    if (state.radios[r].enabled) {
                        state.radios.all.enabled = true;
                        break;
                    }
                }
            }
            // save
            var save = {
                ...state,
                radios: {
                    ...state.radios,
                    [radio]: {
                        ...state.radios[radio],
                        ...options
                    }
                }
            }
            return save;
        }

        case vars.container+'/save__profileSettings':
        {
            const { profileSettings } = action;
            var save = {
                ...state,
                profileSettings: {
                    ...state.profileSettings,
                    ...profileSettings
                }
            }
            return save;
        }

        case vars.container+'/profileAdd':
        {
            const { profile } = action;
            return {
                ...state,
                profiles: [
                    ...state.profiles,
                    profile
                ]
            }
        }

        case vars.container+'/PROFILE_DELETE_CONFIRM':
        {
            const { profileIndex } = action;
            return {
                ...state,
                profileDeleteConfirm: profileIndex
            }
        }
        case vars.container+'/PROFILE_DELETE_CANCEL':
        {
            const { profileIndex } = action;
            return {
                ...state,
                profileDeleteConfirm: false
            }
        }
        case vars.container+'/PROFILE_DELETE':
        {
            const { profileIndex } = action;
            return {
                ...state,
                profileDeleteConfirm: false,
                profiles: [
                    ...(state.profiles.filter((x, i) => i !== profileIndex)),
                ]
            }
        }
        default:
            return state;
    }
}

