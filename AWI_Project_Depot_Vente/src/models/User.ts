export class User {
    private static lastId: number = 0; // Static variable to generate unique ids
    id!: number;
    name!: string;
    email!: string;
    phone!: string;

    constructor(name: string, email: string, phone: string) {
        this.id = User.generateUniqueId(); // Generate a unique id
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    private static generateUniqueId(): number {
        return ++User.lastId; // Increment the static variable and return it
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