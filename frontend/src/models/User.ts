export class User {
    id!: string;
    firstName!: string;
    name!: string;
    email!: string;
    phoneNumber!: string;

    constructor(firstName: string, name: string, email: string, phoneNumber: string) {
        // Generate a unique id string
        this.id = User.generateUniqueId().toString();
        this.firstName = firstName;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
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
        return this.phoneNumber;
    }
}