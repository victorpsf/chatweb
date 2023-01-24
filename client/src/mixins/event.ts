import { 
    ListenerInterface,
    CallerFunction,
    RegisterFunction,
    CallerRegisterInterface
} from '@/interfaces/events/event'
import { Guid } from '@/lib/util'
import { App } from 'vue'

class AppEvent {
    listener: ListenerInterface;

    constructor() {
        this.listener = { on: {}, once: {} };
    }

    createGuid(mode: string, listen: string): string {
        let guid = '';
        let guids: string[] = [];

        do {
            guid = Guid()
            guids = Object.keys(this.listener[mode][listen])
        }

        while(guids.indexOf(guid) >= 0);
        return guid;
    }

    on(listen: string, callback: typeof CallerFunction, register?: typeof RegisterFunction): void {
        if (this.listener.on[listen] === undefined) this.listener.on[listen] = {};
        const guid = this.createGuid('on', listen)
        this.listener.on[listen][guid] = callback
        if (typeof register === 'function') register({ guid })
    }

    once(listen: string, callback: typeof CallerFunction, register?: typeof RegisterFunction): void {
        if (this.listener.on[listen] === undefined) this.listener.on[listen] = {};
        const guid = this.createGuid('on', listen)
        this.listener.on[listen][guid] = callback
        if (typeof register === 'function') register({ guid })
    }

    async emit(listen: string, ...args: any[]): Promise<void> {
        const callerIn = new Date();
        const callers: CallerRegisterInterface[] = []

        if (this.listener.on[listen] !== undefined)
            for (const guid in this.listener.on[listen])
                callers.push({ guid, caller: this.listener.on[listen][guid] })

        if (this.listener.once[listen] !== undefined)
            for (const guid in this.listener.once[listen])
                callers.push({ guid, caller: this.listener.once[listen][guid] })
        
        for (const { guid, caller } of callers)
            try {
                // eslint-disable-next-line
                caller.apply(null, [{ guid, timestamp: callerIn.getTime() }].concat(args))
            }

            catch (error) 
            { console.error(error) }
    }
}

export default {
    install: function (vue: App) {
        vue.config.globalProperties.$event = new AppEvent();
    }
}