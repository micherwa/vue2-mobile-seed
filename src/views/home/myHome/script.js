import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    data () {
        return {
            showMyModal: false,
            mobilePhone: null
        };
    },
    computed: {
        ...mapGetters([
            'users'
        ])
    },
    created () {
        this.load();
    },
    methods: {
        async load () {
            await this.$store.dispatch('getUsers');
            console.log(_.find(this.users, {'id': 1}));
        },
        handleConfirm () {
            this.showMyModal = false;
            console.log(`mobile:${this.mobilePhone}`);
        },
        handleChange (checked, value) {
            console.log(`checked=${checked}`, `value=${value}`);
        }
    }
};
