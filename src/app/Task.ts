export class Task {
    public id: string;
    public title: string;
    public done: boolean;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
        this.done = false;
    }
}