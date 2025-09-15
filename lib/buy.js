const { question } = require("./questions/index");
const { dataOil, historyOrders } = require("./data/index");

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

async function buyProduct() {
  try {
    const result = dataOil
      .map(
        (items, index) =>
          `\n No: ${index + 1}
Nama  : ${items.name}
Price : ${formatRupiah(items.price)}
Stock : ${items.stock}L`
      )
      .join("\n");

    console.log("=== DAFTAR BAHAN BAKAR ===");
    console.log(result);
    console.log("\n \n \n 0: Kembali");

    const inputBBM = await question(
      "Pilih BBM dan jumlah liter (contoh: 1/20): "
    );

    if (inputBBM === "0") {
      console.log("Kembali ke menu");
      return;
    }

    const input = inputBBM.split("/");

    if (input.length !== 2) {
      console.log(
        "❌ Format input salah! Gunakan format: nomor/liter (contoh: 1/20)"
      );
      await buyProduct();
      return;
    }

    const selectBBM = input[0];
    const inputLiter = input[1];

    const productIndex = parseInt(selectBBM) - 1;
    const jumlahLiter = parseFloat(inputLiter);

    if (
      isNaN(productIndex) ||
      productIndex < 0 ||
      productIndex >= dataOil.length
    ) {
      console.log(
        "❌ Nomor produk tidak valid! Pilih nomor 1-" + dataOil.length
      );
      await buyProduct();

      return;
    }

    if (isNaN(jumlahLiter) || jumlahLiter <= 0) {
      console.log("❌ Jumlah liter tidak valid! Harus berupa angka positif");
      return;
    }

    const selectOil = dataOil[productIndex];
    console.log(`\n Anda memilih: ${selectOil.name}`);
    console.log(` Jumlah: ${jumlahLiter}L`);
    console.log(` Stock tersedia: ${selectOil.stock}L`);
    console.log(` Harga per liter: ${formatRupiah(selectOil.price)}`);

    if (jumlahLiter > selectOil.stock) {
      console.log(
        `❌ Stock tidak mencukupi! Stock tersedia: ${selectOil.stock}L`
      );
      await buyProduct();

      return;
    }

    const totalHarga = jumlahLiter * selectOil.price;

    selectOil.stock -= jumlahLiter;
    console.clear();
    console.log("\n=== 🧾 RINGKASAN PEMBELIAN ===");
    console.log(` Produk: ${selectOil.name}`);
    console.log(` Jumlah: ${jumlahLiter}L`);
    console.log(` Harga per liter: ${formatRupiah(selectOil.price)}`);
    console.log(` Total harga: ${formatRupiah(totalHarga)}`);
    console.log(` Stock tersisa: ${selectOil.stock}L`);

    let resultData = {
      product: selectOil.name,
      quantity: jumlahLiter,
      pricePerLiter: selectOil.price,
      totalPrice: totalHarga,
      remainingStock: selectOil.stock,
    };

    historyOrders.push(resultData);

    const finits = await question("\n✨ Tekan 'Enter' untuk selesai: ");
    if (finits.trim() === "" || finits) {
      console.log(" Pengisian Bahan bakar sudah selesai");
      console.log(" Terima kasih telah berbelanja!");
    }
  } catch (error) {
    console.log("❌ Terjadi kesalahan:", error.message);
  }
}

module.exports = {
  buyProduct,
};
