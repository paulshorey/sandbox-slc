// vars.container
export const container = 'wireless';
// vars.initialState
export const initialState = {
    radios: {
        "all": {
            enabled: true,
            keys: ["2.4GHz","5GHz"]
        },
        "2.4GHz": {
            enabled: true,
            channel: 6,
            channels: [0,1,2,3,4,5,6,7,8,9,10,11],
            width: "Below",
            widthsAvailableFunction: function(){
                switch(this.channel) {
                    case 1:
                        return ["Above"];
                        break;
                    case 2:
                        return ["Above"];
                        break;
                    case 3:
                        return ["Above"];
                        break;
                    case 4:
                        return ["Above"];
                        break;
                    case 5:
                        return ["Above","Below"];
                        break;
                    case 6:
                        return ["Above","Below"];
                        break;
                    case 7:
                        return ["Above","Below"];
                        break;
                    case 8:
                        return ["Below"];
                        break;
                    case 9:
                        return ["Below"];
                        break;
                    case 9:
                        return ["Below"];
                        break;
                    case 10:
                        return ["Below"];
                        break;
                    case 11:
                        return ["Below"];
                        break;
                    default:
                        return ["Above","Below"];
                }
            }
        },
        "5GHz": {
            enabled: true,
            channel: 153,
            channels: [36,40,44,48,149,153,157,161,165],
            width: "20 MHz",
            widthsAvailableFunction: function(){
                switch(this.channel) {
                    case 36:
                        return ["20 MHz","20/40 MHz Auto"];
                        break;
                    case 40:
                        return ["20 MHz","20/40 MHz Auto","20/40/80 MHz Auto"];
                        break;
                    case 44:
                        return ["20 MHz","20/40 MHz Auto"];
                        break;
                    case 48:
                        return ["20 MHz","20/40 MHz Auto"];
                        break;
                    case 149:
                        return ["20 MHz","20/40 MHz Auto"];
                        break;
                    case 153:
                        return ["20 MHz","20/40 MHz Auto","20/40/80 MHz Auto"];
                        break;
                    case 157:
                        return ["20 MHz","20/40 MHz Auto"];
                        break;
                    case 161:
                        return ["20 MHz","20/40 MHz Auto"];
                        break;
                    case 165:
                        return ["20 MHz"];
                        break;
                    default:
                        return ["20 MHz","20/40 MHz Auto","20/40/80 MHz Auto"];
                }
            }
        }
    },
    profiles: [
        {
            radio: "2.4GHz",
            ssid: "Luxul1750",
            ssidBroadcast: true,
            clientIsolation: true,
            security: "wpa2"
        }
    ],
    profileDeleteConfirm: false,
}; 