import i18next from 'i18next';

i18next.init({
  lng: 'ar',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        token: {
            fetchError: 'Token is requier',
            createError: 'Token is invalide or expired',
          },
        supply: {
          fetchError: 'Error while fetching supplies',
          createError: 'Error while creating supply',
          updateError: 'Error while updating supply',
          deleteError: 'Error while deleting supply',
          adminAccess: 'Access denied: Only an admin can modify a supply.',
          adminDelete: 'Access denied: Only an admin can delete a supply.',
          successDelete: 'Supply successfully deleted',
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
          fetchError: 'Error while fetching orders',
          createError: 'Error while creating order',
          updateError: 'Error while updating order',
          deleteError: 'Error while deleting order',
          adminAccess: 'Access denied: Only an admin can modify an order.',
          adminDelete: 'Access denied: Only an admin can delete an order.',
          successDelete: 'Order successfully deleted',
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
      },
    },
    fr: {
      translation: {
        token: {
            fetchError: 'Token est requis',
            createError: 'Token est invalide ou expiré',
          },
        supply: {
          fetchError: 'Erreur lors de la récupération des fournitures',
          createError: 'Erreur lors de la création de la fourniture',
          updateError: 'Erreur lors de la mise à jour de la fourniture',
          deleteError: 'Erreur lors de la suppression de la fourniture',
          adminAccess: 'Accès refusé : Seul un administrateur peut modifier une fourniture.',
          adminDelete: 'Accès refusé : Seul un administrateur peut supprimer une fourniture.',
          successDelete: 'Fourniture supprimée avec succès',
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
          fetchError: 'Erreur lors de la récupération des commandes',
          createError: 'Erreur lors de la création de la commande',
          updateError: 'Erreur lors de la mise à jour de la commande',
          deleteError: 'Erreur lors de la suppression de la commande',
          adminAccess: 'Accès refusé : seul un administrateur peut modifier une commande.',
          adminDelete: 'Accès refusé : seul un administrateur peut supprimer une commande.',
          successDelete: 'Commande supprimée avec succès',
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
          fetchError: 'Erreur lors de la récupération des réceptions',
          createError: 'Erreur lors de la création de la réception',
          updateError: 'Erreur lors de la mise à jour de la réception',
          deleteError: 'Erreur lors de la suppression de la réception',
          adminAccess: 'Accès refusé : seul un administrateur peut modifier une réception.',
          adminDelete: 'Accès refusé : seul un administrateur peut supprimer une réception.',
          successDelete: 'Réception supprimée avec succès',
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
      },
    },
    ar: {
      translation: {
        token: {
            fetchError: 'رمز الاستجابة غير صالح',
createError: 'الرمز غير صالح أو منتهي الصلاحية',

          },
        supply: {
          fetchError: 'خطأ أثناء جلب اللوازم',
          createError: 'خطأ أثناء إنشاء اللوازم',
          updateError: 'خطأ أثناء تحديث اللوازم',
          deleteError: 'خطأ أثناء حذف اللوازم',
          adminAccess: 'الوصول مرفوض: يمكن للمسؤول فقط تعديل اللوازم.',
          adminDelete: 'الوصول مرفوض: يمكن للمسؤول فقط حذف اللوازم.',
          successDelete: 'تم حذف اللوازم بنجاح',
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
          fetchError: 'خطأ أثناء جلب الطلبات',
          createError: 'خطأ أثناء إنشاء الطلب',
          updateError: 'خطأ أثناء تحديث الطلب',
          deleteError: 'خطأ أثناء حذف الطلب',
          adminAccess: 'الوصول مرفوض: يمكن للمسؤول فقط تعديل الطلب.',
          adminDelete: 'الوصول مرفوض: يمكن للمسؤول فقط حذف الطلب.',
          successDelete: 'تم حذف الطلب بنجاح',
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
          fetchError: 'خطأ أثناء جلب الاستلامات',
          createError: 'خطأ أثناء إنشاء الاستلام',
          updateError: 'خطأ أثناء تحديث الاستلام',
          deleteError: 'خطأ أثناء حذف الاستلام',
          adminAccess: 'الوصول مرفوض: يمكن للمسؤول فقط تعديل الاستلام.',
          adminDelete: 'الوصول مرفوض: يمكن للمسؤول فقط حذف الاستلام.',
          successDelete: 'تم حذف الاستلام بنجاح',
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
      },
    },
  },
});

export default i18next;
