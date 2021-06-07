// /* tslint:disable */
// const fs = require('fs');

// export class Guid {
//     public static isGuid(value: any): boolean {
//         // const validator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');
//         const validator = new RegExp('^[a-z0-9]{32}$', 'i');
//         return value && (value instanceof Guid || validator.test(value.toString()));
//     }

//     private static create(): Guid {
//         return new Guid([Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join(''));
//     }

//     private static gen(count: number) {
//         let out = '';
//         for (let i = 0; i < count; i++) {
//             out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//         }
//         return out;
//     }

//     public value = '';
//     // private empty = '00000000-0000-0000-0000-000000000000';
//     private empty = '00000000000000000000000000000000';

//     constructor(str?: string) {
//         this.value = str || Guid.create().toString();
//     }

//     public isEmpty() {
//         return this.value === this.empty;
//     }

//     public toString(): string {
//         return this.value;
//     }
// }

// export class Utils {
//     public static readFile(path: string): any {
//         const trad = fs.readFile(path, handleJSONFile);

//         var handleJSONFile = function (err: any, data: any) {
//             if (err) {
//                 throw err;
//             }
//             return JSON.parse(data);
//         }
//     }
// }
