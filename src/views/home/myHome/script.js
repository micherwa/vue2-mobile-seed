import { mapGetters } from 'vuex';
import { MessageBox, Toast } from 'mint-ui';

export default {
    data () {
        return {

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
            const userList = await this.$store.dispatch('getUsers');
            console.log(JSON.stringify(userList));
        },
    }
};
