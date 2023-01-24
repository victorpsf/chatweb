import { User } from '@/models/user';
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        nickname: {
            type: String,
            required: true
        },
        users: {
            type: Array,
            required: true
        }
    },

    methods: {
        userClick: function (event: MouseEvent, user: User) {
            this.$emit('user-click', user);
        }
    }
})

export default class UserComponents extends Vue { }