import * as boc from '@phoenix/boc';
export const tasks: boc.TaskDefs = [
    {
        id: 'exemple task',
        className: '?',
        isDisabled: true,
        name: 'task description',
        taskParams: {
        },
        storeResult: false,
        trigger: {
            eventType: 'interval',
            eventParams: {
                interval: 120,
            },
        },
    },
    {
        id: 'DesactiverOptionsPerimees',
        className: 'DesactiverOptionsPerimees',
        isDisabled: false,
        name: 'Désactiver les options perimées',
        taskParams: {
        },
        storeResult: false,
        trigger: {
            eventType: 'interval',
            eventParams: {
                interval: 120,
            },
        },
    },
];
