
export interface Transaction {
    game: string; // ID du jeu acheté
    buyerId?: string; // ID de l'acheteur (optionnel)
    buyerName?: string; // Nom de l'acheteur (optionnel)
    date: Date; // Date de la transaction
}