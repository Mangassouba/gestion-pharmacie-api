import { checkExpiringBatches } from '../controllers/batchesController.js';
import { sendExpirationAlert } from './emailService.js';

export const processBatchExpirationAlerts = async () => {
  try {
    const expiringBatches = await checkExpiringBatches();

    if (expiringBatches.length > 0) {
      const adminEmails = ['admin1@example.com', 'admin2@example.com']; // À rendre dynamique si nécessaire

      for (const batch of expiringBatches) {
        await sendExpirationAlert(
          adminEmails,
          batch.product.name,
          batch.number,
          batch.expiration_date
        );
      }

      return { success: true, message: "Alertes de péremption envoyées." };
    } else {
      return { success: true, message: "Aucun lot proche de la péremption." };
    }
  } catch (error) {
    console.error("Erreur lors du traitement des alertes", error);
    throw new Error("Erreur interne lors de l'envoi des alertes");
  }
};
