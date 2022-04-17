const { productsPrices } = require("../../models/productsPrices");

async function editPriceAndQuantity(newPrice) {
  console.log("newprice ok" + newPrice);
  productsPrices.update(
    {
      prixUnitaire: newPrice.price,
      quantitySmall: newPrice.small,
      quantityBig: newPrice.big,
    },
    {
      where: { id: 1 },
    }
  );
}
async function findPriceAndQuantity() {
  return await productsPrices.findOne({
    where: {
      id: 1,
    },
  });
}
module.exports = { editPriceAndQuantity, findPriceAndQuantity };
