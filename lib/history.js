const {historyOrders} = require("./data/index")
const { question } = require("./questions/index");


const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  
async function history() {
    if (historyOrders.length === 0) {
        console.log("📝 History transaksi kosong");
        return;
      }
      
      console.log("\n=== 📜 HISTORY TRANSAKSI ===");
      console.log(`Total transaksi: ${historyOrders.length}\n`);
      historyOrders.forEach((order, index) => {
        console.log(` Transaksi #${index + 1}`);
        console.log(`   Produk          : ${order.product}`);
        console.log(`   Jumlah          : ${order.quantity}L`);
        console.log(
          `   Harga per liter : ${formatRupiah(order.pricePerLiter)}`
        );
        console.log(`   Total harga     : ${formatRupiah(order.totalPrice)}`);
        console.log(`   Stock tersisa   : ${order.remainingStock}L`);
        console.log("   " + "─".repeat(40));
      });
      const inputConfirm = await question(
        "Tekan 'Enter' untuk Kembali ke menu utama"
      );
      if (inputConfirm.trim() === "" || inputConfirm) {
        console.log("Kembali ke menu utama")
      }
}


module.exports= {
    history
}
