import { mapGetters } from 'vuex';

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
            const userList = await this.$store.dispatch('getUsers', [1, 10]);
            console.log(userList);
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
