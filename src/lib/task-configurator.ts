import * as boc from '@phoenix/boc';
import { tasks } from './config/tasks';
import { Utils } from './tools/utils';

export class TaskConfigurator implements boc.ITaskConfigurator {
    private volatileTasks: boc.ITaskDef[] = [];
    public addTask(taskDef: boc.ITaskDef): string {
        taskDef.id = Utils.uuid22();
        this.volatileTasks.push(taskDef);
        return taskDef.id;
    }
    public getTaskDefinitions(): boc.TaskDefs {
        const result = [];
        result.push(...this.volatileTasks);
        result.push(...tasks);
        return result;
    }
    public removeTask(id: string) {
        for (let i = this.volatileTasks.length - 1; i >= 0; i--) {
            const td = this.volatileTasks[i];
            if (td.id === id) {
                this.volatileTasks.splice(i, 1);
            }
        }
    }
}