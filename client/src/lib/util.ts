export const RandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const IsNullOrUndefined = (value: any) => ((value === null) || (value === undefined));

export const IntToHex = (a: number) => (`000${a.toString(16)}`).slice(-2).toUpperCase();

export const Guid = function (): string {
    return [
        [0,0,0,0].map(a => RandomNumber(a, 255)).map(a => IntToHex(a)),
        [0,0].map(a => RandomNumber(a, 255)).map(a => IntToHex(a)),
        [0,0].map(a => RandomNumber(a, 255)).map(a => IntToHex(a)),
        [0,0].map(a => RandomNumber(a, 255)).map(a => IntToHex(a)),
        [0,0,0,0,0,0].map(a => RandomNumber(a, 255)).map(a => IntToHex(a))
    ]
    .map(a => a.join(''))
    .join('-');
}