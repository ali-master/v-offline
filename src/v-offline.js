module.exports = {
    template: '<div>\
        <div :class="onlineClass" v-if="state.online"><slot name="online"></slot></div>\
        <div :class="offlineClass" v-if="!state.online"><slot name="offline"></slot></div>\
    </div>',
    props: {
        onlineClass: {
            type: String,
            default: 'ui success message',
            required: false
        },
        offlineClass: {
            type: String,
            default: 'ui error message',
            required: false
        }
    },
    data() {
        return {
            state: {
                online: navigator.onLine,
            },
        };
    },
    mounted() {
        const vm = this;
        window.addEventListener('load', () => {
            vm.updateOnlineStatus();
            window.addEventListener('online', vm.updateOnlineStatus);
            window.addEventListener('offline', vm.updateOnlineStatus);
        });
    },
    methods: {
        updateOnlineStatus: function() {
            const vm = this;
            vm.state.online = navigator.onLine || false;
            vm.$emit('detected-condition', vm.state.online);
        }
    }
};