import transporter from '../config/transporter.js';

const sendStockAlert = async (adminEmails, productName, stock, seuil) => {
  console.log(
    `Envoi d'une alerte de stock pour le produit: ${productName}, stock actuel: ${stock}, seuil: ${seuil}`
  );
  console.log(`Emails des administrateurs: ${adminEmails}`);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmails,
    subject: '🚨 Alerte de stock faible : ' + productName,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #d9534f;">⚠️ Alerte de stock faible</h2>
        <p>Le stock du produit <strong>${productName}</strong> est actuellement bas.</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Stock actuel :</strong> ${stock}</li>
          <li><strong>Seuil critique :</strong> ${seuil}</li>
        </ul>
        <p>
          Nous vous recommandons de réapprovisionner ce produit dès que possible pour éviter des ruptures de stock.
        </p>
        <p style="color: #d9534f; font-weight: bold;">
          Merci de prendre les mesures nécessaires rapidement.
        </p>
        <hr style="border: 1px solid #eee;" />
        <p style="font-size: 0.9em; color: #999;">
          Cet e-mail a été généré automatiquement par votre système de gestion des stocks.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Alerte de stock envoyée avec succès');
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'alerte de stock", error);
  }
};


export default sendStockAlert;


export const sendExpirationAlert = async (adminEmails, productName, batchNumber, expirationDate) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmails,
    subject: `🚨 Alerte de péremption : ${productName}`,
    html: `
      <div style="font-family: 'Helvetica', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <header style="background-color: #d9534f; color: white; padding: 15px; text-align: center;">
          <h2 style="margin: 0; font-size: 1.5em;">⚠️ Alerte de péremption</h2>
        </header>
        <main style="padding: 20px;">
          <p style="font-size: 1.1em; margin-bottom: 15px;">
            <strong>Le lot n°${batchNumber}</strong> du produit <strong>${productName}</strong> approche de sa date d'expiration.
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 40%;">Produit :</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Lot :</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${batchNumber}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Date d'expiration :</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${new Date(expirationDate).toLocaleDateString()}</td>
            </tr>
          </table>
          <p style="font-size: 1em; color: #555;">
            Veuillez prendre les mesures nécessaires pour éviter les pertes ou problèmes associés. 
            Consultez votre système de gestion pour plus de détails.
          </p>
        </main>
        <footer style="background-color: #f5f5f5; text-align: center; padding: 15px; font-size: 0.9em; color: #777;">
          <p style="margin: 0;">Cet e-mail a été généré automatiquement par votre système de gestion des stocks.</p>
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Alerte envoyée pour le lot ${batchNumber} du produit ${productName}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'alerte de péremption", error);
  }
};
