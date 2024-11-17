import i18next from 'i18next';

i18next.init({
  lng: 'fr',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        token: {
            fetchError: 'Token is requier',
            createError: 'Token is invalide or expired',
          },
          auth: {
            userNotFound: "User not found.",
            incorrectPassword: "Incorrect password.",
            loginSuccess: "Login successful.",
            loginError: "Error during login.",
            accessForbidden: "Access forbidden, token missing.",
            userInactive: "User account is inactive.",
            invalidToken: "Invalid or expired token.",
            noRefreshToken: "Aucun refresh token fourni.",
            invalidRefreshToken: "Refresh token invalide.",
            refreshTokenExpired: "Le refresh token a expiré.",
            accessGranted: "Accès autorisé."
            },
        supplier: {
            fetchAllError: "Error while retrieving suppliers.",
            notFound: "Supplier not found.",
            fetchError: "Error while retrieving the supplier.",
            creationError: "Error while creating supplier.",
            updateError: "Error while updating supplier.",
            deletionSuccess: "Supplier successfully deleted.",
            deletionError: "Error while deleting supplier."
            },
        customer: {
            creationError: "Error while creating the client.",
            fetchAllError: "Error while fetching the clients.",
            notFound: "Client not found.",
            fetchError: "Error while fetching the client.",
            updateError: "Error while updating the client.",
            deletionSuccess: "Client successfully deleted.",
            deletionError: "Error while deleting the client."
        },
    order: {
            customerNotFound: "Customer not found",
            productNotFound: "Product with ID {{productId}} not found",
            creationError: "Error occurred while creating the order",
            fetchAllError: "Error occurred while fetching orders: {{message}}",
            notFound: "Order not found",
            fetchError: "Error occurred while fetching the order: {{message}}",
            updateError: "Error occurred while updating the order: {{message}}",
            deletionSuccess: "Order deleted successfully",
            deletionError: "Error occurred while deleting the order: {{message}}"
        },
        product: {
            creationError: "Error while creating the product.",
            fetchAllError: "Error while retrieving products.",
            notFound: "Product not found.",
            fetchError: "Error while retrieving the product.",
            updateError: "Error while updating the product.",
            deletionSuccess: "Product successfully deleted.",
            deletionError: "Error while deleting the product."
        },
        reception: {
          fetchError: 'Error while fetching receptions',
          createError: 'Error while creating reception',
          updateError: 'Error while updating reception',
          deleteError: 'Error while deleting reception',
          adminAccess: 'Access denied: Only an admin can modify a reception.',
          adminDelete: 'Access denied: Only an admin can delete a reception.',
          successDelete: 'Reception successfully deleted',
        },
        sale: {
            creationError: "Error while creating the sale.",
            fetchAllError: "Error while fetching sales.",
            notFound: "Sale not found.",
            fetchError: "Error while fetching the sale.",
            updateError: "Error while updating the sale.",
            deletionSuccess: "Sale successfully deleted.",
            deletionError: "Error while deleting the sale.",
            insufficientStock: "Insufficient stock for product ID {{productId}}.",
            deletionErrorReference: "Cannot delete sale due to existing references."
        },
        user: {
            creationError: "Error while creating the user.",
            fetchAllError: "Error while fetching users.",
            notFound: "User not found.",
            fetchError: "Error while fetching the user.",
            updateError: "Error while updating the user.",
            deletionSuccess: "User successfully deleted.",
            deletionError: "Error while deleting the user."
        },
        stockMovement: {
            creationError: "An error occurred while creating the stock movement.",
            fetchAllError: "An error occurred while fetching all stock movements.",
            notFound: "Stock movement not found.",
            fetchError: "An error occurred while fetching the stock movement.",
            updateError: "An error occurred while updating the stock movement.",
            deletionSuccess: "Stock movement successfully deleted.",
            deletionError: "An error occurred while deleting the stock movement."
        },
      },
    },
    fr: {
      translation: {
        token: {
            fetchError: 'Token est requis',
            createError: 'Token est invalide ou expiré',
          },
          auth: {
            userNotFound: "Utilisateur non trouvé.",
            incorrectPassword: "Mot de passe incorrect.",
            loginSuccess: "Connexion réussie.",
            loginError: "Erreur lors de la connexion.",
            accessForbidden: "Accès interdit, jeton manquant.",
            userInactive: "Compte utilisateur inactif.",
            invalidToken: "Jeton invalide ou expiré."
            },
        supplier: {
            fetchAllError: "Erreur lors de la récupération des fournisseurs.",
            notFound: "Fournisseur non trouvé.",
            fetchError: "Erreur lors de la récupération du fournisseur.",
            creationError: "Erreur lors de la création du fournisseur.",
            updateError: "Erreur lors de la mise à jour du fournisseur.",
            deletionSuccess: "Fournisseur supprimé avec succès.",
            deletionError: "Erreur lors de la suppression du fournisseur."
            },
        customer: {
            creationError: "Error while creating the client.",
            fetchAllError: "Error while fetching the clients.",
            notFound: "Client not found.",
            fetchError: "Error while fetching the client.",
            updateError: "Error while updating the client.",
            deletionSuccess: "Client successfully deleted.",
            deletionError: "Error while deleting the client."
        },
        order: {
            customerNotFound: "Client non trouvé",
            productNotFound: "Produit avec l'ID {{productId}} non trouvé",
            creationError: "Erreur lors de la création de la commande",
            fetchAllError: "Erreur lors de la récupération des commandes: {{message}}",
            notFound: "Commande non trouvée",
            fetchError: "Erreur lors de la récupération de la commande: {{message}}",
            updateError: "Erreur lors de la mise à jour de la commande: {{message}}",
            deletionSuccess: "Commande supprimée avec succès",
            deletionError: "Erreur lors de la suppression de la commande: {{message}}"
          },
        product: {
            creationError: "Erreur lors de la création du produit.",
            fetchAllError: "Erreur lors de la récupération des produits.",
            notFound: "Produit non trouvé.",
            fetchError: "Erreur lors de la récupération du produit.",
            updateError: "Erreur lors de la mise à jour du produit.",
            deletionSuccess: "Produit supprimé avec succès.",
            deletionError: "Erreur lors de la suppression du produit."
        },
        reception: {
            creationError: "Erreur lors de la création de la réception.",
            fetchAllError: "Erreur lors de la récupération des réceptions.",
            notFound: "Réception non trouvée",
            fetchError: "Erreur lors de la récupération de la réception.",
            updateError: "Erreur lors de la mise à jour de la réception.",
            deletionSuccess: "Réception supprimée avec succès",
            deletionError: "Erreur lors de la suppression de la réception."
        },
        sale: {
            creationError: "Erreur lors de la création de la vente.",
            fetchAllError: "Erreur lors de la récupération des ventes.",
            notFound: "Vente non trouvée.",
            fetchError: "Erreur lors de la récupération de la vente.",
            updateError: "Erreur lors de la mise à jour de la vente.",
            deletionSuccess: "Vente supprimée avec succès.",
            deletionError: "Erreur lors de la suppression de la vente.",
            insufficientStock: "Stock insuffisant pour l'ID du produit {{productId}}.",
            deletionErrorReference: "Impossible de supprimer la vente en raison de références existantes."
        },
        user: {
            creationError: "Erreur lors de la création de l'utilisateur.",
            fetchAllError: "Erreur lors de la récupération des utilisateurs.",
            notFound: "Utilisateur non trouvé.",
            fetchError: "Erreur lors de la récupération de l'utilisateur.",
            updateError: "Erreur lors de la mise à jour de l'utilisateur.",
            deletionSuccess: "Utilisateur supprimé avec succès.",
            deletionError: "Erreur lors de la suppression de l'utilisateur."
        },
        stockMovement: {
            creationError: "Une erreur est survenue lors de la création du mouvement de stock.",
            fetchAllError: "Une erreur est survenue lors de la récupération de tous les mouvements de stock.",
            notFound: "Mouvement de stock non trouvé.",
            fetchError: "Une erreur est survenue lors de la récupération du mouvement de stock.",
            updateError: "Une erreur est survenue lors de la mise à jour du mouvement de stock.",
            deletionSuccess: "Mouvement de stock supprimé avec succès.",
            deletionError: "Une erreur est survenue lors de la suppression du mouvement de stock."
        },
      },
    },
    ar: {
      translation: {
        token: {
            fetchError: 'رمز الاستجابة غير صالح',
createError: 'الرمز غير صالح أو منتهي الصلاحية',

          },
          auth: {
            userNotFound: "لم يتم العثور على المستخدم.",
            incorrectPassword: "كلمة المرور غير صحيحة.",
            loginSuccess: "تم تسجيل الدخول بنجاح.",
            loginError: "حدث خطأ أثناء تسجيل الدخول.",
            accessForbidden: "الوصول ممنوع، الرمز مفقود.",
            userInactive: "حساب المستخدم غير نشط.",
            invalidToken: "الرمز غير صالح أو منتهي الصلاحية."
            },
        supplier: {
            fetchAllError: "حدث خطأ أثناء جلب الموردين.",
            notFound: "لم يتم العثور على المورد.",
            fetchError: "حدث خطأ أثناء جلب المورد.",
            creationError: "حدث خطأ أثناء إنشاء المورد.",
            updateError: "حدث خطأ أثناء تحديث المورد.",
            deletionSuccess: "تم حذف المورد بنجاح.",
            deletionError: "حدث خطأ أثناء حذف المورد."
            },
        customer: {
            creationError: "خطأ أثناء إنشاء العميل.",
            fetchAllError: "خطأ أثناء جلب العملاء.",
            notFound: "لم يتم العثور على العميل.",
            fetchError: "خطأ أثناء جلب العميل.",
            updateError: "خطأ أثناء تحديث العميل.",
            deletionSuccess: "تم حذف العميل بنجاح.",
            deletionError: "خطأ أثناء حذف العميل."
        },
        order: {
            customerNotFound: "العميل غير موجود",
            productNotFound: "المنتج بالمعرف {{productId}} غير موجود",
            creationError: "حدث خطأ أثناء إنشاء الطلب",
            fetchAllError: "حدث خطأ أثناء استرجاع الطلبات: {{message}}",
            notFound: "الطلب غير موجود",
            fetchError: "حدث خطأ أثناء استرجاع الطلب: {{message}}",
            updateError: "حدث خطأ أثناء تحديث الطلب: {{message}}",
            deletionSuccess: "تم حذف الطلب بنجاح",
            deletionError: "حدث خطأ أثناء حذف الطلب: {{message}}"
        },
        product: {
            creationError: "خطأ أثناء إنشاء المنتج.",
            fetchAllError: "خطأ أثناء استرجاع المنتجات.",
            notFound: "المنتج غير موجود.",
            fetchError: "خطأ أثناء استرجاع المنتج.",
            updateError: "خطأ أثناء تحديث المنتج.",
            deletionSuccess: "تم حذف المنتج بنجاح.",
            deletionError: "خطأ أثناء حذف المنتج."
        },
        reception: {
            creationError: "خطأ أثناء إنشاء الاستلام.",
            fetchAllError: "خطأ أثناء استرجاع الاستلامات.",
            notFound: "لم يتم العثور على الاستلام",
            fetchError: "خطأ أثناء استرجاع الاستلام.",
            updateError: "خطأ أثناء تحديث الاستلام.",
            deletionSuccess: "تم حذف الاستلام بنجاح",
            deletionError: "خطأ أثناء حذف الاستلام."
        },
        sale: {
            creationError: "خطأ أثناء إنشاء البيع.",
            fetchAllError: "خطأ أثناء استرجاع المبيعات.",
            notFound: "لم يتم العثور على البيع.",
            fetchError: "خطأ أثناء استرجاع البيع.",
            updateError: "خطأ أثناء تحديث البيع.",
            deletionSuccess: "تم حذف البيع بنجاح.",
            deletionError: "خطأ أثناء حذف البيع.",
            insufficientStock: "لا يوجد مخزون كافٍ لرقم المنتج {{productId}}.",
            deletionErrorReference: "لا يمكن حذف البيع بسبب وجود مراجع."
        },
        user: {
            creationError: "خطأ أثناء إنشاء المستخدم.",
            fetchAllError: "خطأ أثناء جلب المستخدمين.",
            notFound: "لم يتم العثور على المستخدم.",
            fetchError: "خطأ أثناء جلب المستخدم.",
            updateError: "خطأ أثناء تحديث المستخدم.",
            deletionSuccess: "تم حذف المستخدم بنجاح.",
            deletionError: "خطأ أثناء حذف المستخدم."
        },
        stockMovement: {
            creationError: "حدث خطأ أثناء إنشاء حركة المخزون.",
            fetchAllError: "حدث خطأ أثناء جلب جميع حركات المخزون.",
            notFound: "لم يتم العثور على حركة المخزون.",
            fetchError: "حدث خطأ أثناء جلب حركة المخزون.",
            updateError: "حدث خطأ أثناء تحديث حركة المخزون.",
            deletionSuccess: "تم حذف حركة المخزون بنجاح.",
            deletionError: "حدث خطأ أثناء حذف حركة المخزون."
        },
      },
    },
  },
});

export default i18next;
