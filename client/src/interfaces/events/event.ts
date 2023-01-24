export interface RegisterInterface {
    guid: string;
}

export interface EmitCallerRegisterInterface extends RegisterInterface {
    timestamp: number;
}

export interface CallerRegisterInterface extends RegisterInterface {
    caller: typeof EmiterFunction;
}

export declare function EmiterFunction (...data: any[]): void;
export declare function CallerFunction (...args: any[]): void;
export declare function RegisterFunction (arg: RegisterInterface): void;

export interface ListenerInterface {
    [key: string]: { [key: string]: { [key: string]: typeof CallerFunction } };
}

export interface AppEventInterface {
    on(listen: string, callback: typeof CallerFunction, register?: typeof RegisterFunction): void;
    once(listen: string, callback: typeof CallerFunction, register?: typeof RegisterFunction): void;
    emit(listen: string, ...args: any): Promise<void>;
}
