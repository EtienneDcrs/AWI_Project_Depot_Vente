export class User {
    private static lastId: number = 0;
    id!: number;
    name!: string;
    email!: string;
    phone!: string;

    constructor(name: string, email: string, phone: string) {
        this.id = User.generateUniqueId();
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    private static generateUniqueId(): number {
        return ++User.lastId;
    }

    public getUserId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhone(): string {
        return this.phone;
    }
    
}