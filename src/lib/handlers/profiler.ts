import * as bocServer from '@phoenix/boc-server';
import { m } from '@phoenix/service-route';

export class ProfilerHandler extends bocServer.ProfilerHandler {
    constructor() {
        super();
    }
    public get containerless(): boolean {
        return true;
    }
    @m({
        tags: ['Profiler'],
        summary: 'Profile result',
        description: 'Profile result',
        parameters: [
            {
                name: 'action',
                description: 'Action : trace / instances',
                in: 'path',
                type: 'string',
                required: true,
            },
        ],
    })
    public get(action: string) {
        return super.get(action);
    }

    @m({
        tags: ['Profiler'],
        summary: 'Profiler methods',
        description: 'format : {action: string , value: any}',
        parameters: [
            {
                name: 'action',
                description: 'Action : trace / instances',
                in: 'path',
                type: 'string',
                required: true,
            },
            {
                name: 'body',
                description: 'Data',
            },
        ],
    })
    public patch(action: string, body: any) {
        return super.patch(action, body);
    }
}
