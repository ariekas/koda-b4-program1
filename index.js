const { question, exiting } = require("./lib/questions/index");
const { buyProduct } = require("./lib/buy");


async function menuUtama() {
  console.log("Selamat datang di Pertamina, Silahkan pilih menu: ");
  console.log("1. Pilih bahan bakar");
  console.log("2. Lihat History");
  console.log("3. EXIT");
  const input = await question("Silahkan pilih menu: (1-3)");

  switch (input) {
    case "1":
        console.clear();
        await buyProduct();
        await menuUtama();
      break;
    case "2":
      console.clear();
      console.log("menu History");
      break;
    case "3":
      console.log("Silahkan datang kembali!");
      console.clear();
      exiting();
      break;
    default:
      console.log(
        await question(
          " ⚠️ Input yang dimasukan salah, Tekan 'Enter' untuk kembali ke manu"
        )
      );
      console.clear();
      await menuUtama();
      break;
  }
}

menuUtama();
