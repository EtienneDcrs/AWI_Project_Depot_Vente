export class User {
    private static lastId: number = 0; // Static variable to generate unique ids
    id!: string;
    firstName!: string;
    name!: string;
    email!: string;
    phone!: string;

    constructor(firstName: string, name: string, email: string, phone: string) {
        // Generate a unique id string
        this.id = User.generateUniqueId().toString();
        this.firstName = firstName;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    private static generateUniqueId(): number {
        return Math.floor(Math.random() * 1000000);
    }

    public getUserId(): string {
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