import { Options, Vue } from 'vue-class-component';
import { User } from '@/models/user'
import { CallerRegisterInterface } from '@/interfaces/events/event';
import { Message } from '@/models/message';

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

    this.$event.on('received-message', (register: CallerRegisterInterface, message: Message) => {
      this.messages[message.sended].push({ ...message, type: 2 })
    });

    this.interval = setInterval(() => {
      this.nickname = this.$socket.id;
      this.$event.emit('get-looged-users');
    }, 1000);
  },

  unmounted: function () {
    clearInterval(this.interval)
  },

  data: () => ({
    interval: null,
    users: [],
    chat: null,
    messages: { },
    nickname: ''
  }),

  methods: {
    userClick: function (user: User) {
      this.chat = user;
      this.messages[user.id] = []
    },

    sendMessage: function ({ text, target }: Message) {
      const data: Message = { sended: this.$socket.id, target, text };
      this.messages[target].push({ ...data, type: 1 });
      this.$event.emit('send-message', data);
    }
  }
})

export default class AppView extends Vue { }