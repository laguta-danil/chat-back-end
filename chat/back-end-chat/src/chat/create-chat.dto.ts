export class CreateChatDto {
    id: string;
    name: string;
    users: Array<string>;
    messages: Array<string>;
}