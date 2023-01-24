import { Options, Vue } from 'vue-class-component';
import { User } from '@/models/user'
import { CallerRegisterInterface } from '@/interfaces/events/event';

@Options({
  components: {},

  mounted: function () {
    // this.nickname = 
    // this.nickname = prompt('informe um nick') || ''

    // while (this.nickname.length < 8) {
    //   alert('nickname muito curto');
    // } 

    // this.$event.emit('changed-nickname', this.nickname);

    this.$event.on('logged-users', (register: CallerRegisterInterface, values: User[]) => {
      this.users = values
    });
    console.log(this.$socket.id)
    setInterval(() => {
      this.nickname = this.$socket.id;
      this.$event.emit('get-looged-users');
    }, 1000);
  },

  data: () => ({
    users: [],
    nickname: ''
  })
})

export default class AppView extends Vue { }