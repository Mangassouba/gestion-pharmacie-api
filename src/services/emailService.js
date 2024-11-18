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
