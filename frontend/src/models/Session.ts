
export class Session {
    // this class is a subclass of User

    startDate!: Date;
    endDate!: Date;
    endDepositGame!: Date;
    commissionType!: string;
    commission!: number;
    depositFeeType!: string;
    depositFee!: number;
    

    constructor(startDate: Date, endDate: Date, endDepositGame: Date, commissionType: string, commission: number, depositFeeType: string, depositFee: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.endDepositGame = endDepositGame;
        this.commissionType = commissionType;
        this.commission = commission;
        this.depositFeeType = depositFeeType;
        this.depositFee = depositFee;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public getEndDepositGame(): Date {
        return this.endDepositGame;
    }

    public getCommissionType(): string {
        return this.commissionType;
    }

    public getCommission(): number {
        return this.commission;
    }

    public getDepositFeeType(): string {
        return this.depositFeeType;
    }

    public getDepositFee(): number {
        return this.depositFee;
    }

    
}