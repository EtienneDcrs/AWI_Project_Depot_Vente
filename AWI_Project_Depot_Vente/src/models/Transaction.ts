
export interface Transaction {
    gameId: string; // ID du jeu acheté
    gameName: string; // Nom du jeu acheté
    buyerId?: string; // ID de l'acheteur (optionnel)
    buyerName?: string; // Nom de l'acheteur (optionnel)
    sellerId: string; // ID du vendeur
    sellerName: string; // Nom du vendeur
    date: Date; // Date de la transaction
    price: number; // Prix du jeu
    depositFee: number; // Frais de dépôt
    commission: number; // Commission
    sessionId: string; // ID de la session
}
