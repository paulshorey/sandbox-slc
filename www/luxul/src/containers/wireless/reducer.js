import * as vars from './vars';

export default function wirelessReducer(state = vars.initialState, action = {}) {
    switch (action.type) {
        case vars.container+'/RADIO_SET_ENABLED':
        {
            const { radio, enabled } = action;
            // edit
            state.radios[radio].enabled = enabled;
            state.radios.all.enabled = false;
            for(let r in state.radios) {
                if (state.radios[r].enabled) {
                    state.radios.all.enabled = true;
                    break;
                }
            }
            // save
            return {
                ...state,
                radios: {
                    ...state.radios
                }
            }
        }
        case vars.container+'/RADIO_SET_CHANNEL':
        {
            const { radio, channel } = action;
            return {
                ...state,
                radios: {
                    ...state.radios,
                    [radio]: {
                        ...state.radios[radio],
                        channel: channel
                    }
                }
            }
        }
        case vars.container+'/RADIO_SET_WIDTH':
        {
            const { radio, width } = action;
            return {
                ...state,
                radios: {
                    ...state.radios,
                    [radio]: {
                        ...state.radios[radio],
                        width: width
                    }
                }
            }
        }
        case vars.container+'/PROFILE_ADD':
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

