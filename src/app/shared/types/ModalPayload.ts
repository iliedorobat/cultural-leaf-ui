export class ModalPayload {
    data = {};
    title;

    constructor(title: string | null, data: object) {
        this.data = data;
        this.title = title;
    }
}
