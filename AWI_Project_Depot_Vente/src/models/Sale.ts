import { Client } from "./Client";
import { Game } from "./Game";
import { Seller } from "./Seller";

export class Sale{
    // A sale is identified by a seller, a client and a game
    seller!: Seller;
    client!: Client;
    game!: Game;
    date!: Date;
    comission!: number;
    invoice!: string;

    constructor(seller: Seller, client: Client, game: Game, date: Date, comission: number, invoice: string){
        this.seller = seller;
        this.client = client;
        this.game = game;
        this.date = date;
        this.comission = comission;
        this.invoice = invoice;
    }
}