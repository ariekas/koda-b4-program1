# Aplikai yang di buat untuk membeli bbm dengan mudah dan pratis dan pilihan bbm yang berfariasi
## fitur fitur yang ada :
1. Menampilkan BBM
2. Memilih BBM dan input berapa liter yang inggin di beli
3. Otomatis mengcalculasi harga yang harus di bayarkan
4. Catatan dari setiap transaksi yang terjadi

```mermaid
flowchart TD

A@{shape: circle, label: "start"}
B@{shape: lean-r, label: "select Menu"}
C@{shape: diam, label: "input"}
D@{shape: lean-r, label: "daftar BBM"}
E@{shape: lean-r, label: "input code bbm dan liter"}
F@{shape: proc, label: "Menampilkan list pesanan"}
G@{shape: lean-r, label: "input uang = totalBayar"}
H@{shape: diam, label: "totalBayar < totalHarga"}
I@{shape: proc, label: "detail pesanan"}
J@{shape: lean-r, label: "history order"}
K@{shape: lean-r, label: "exit"}
L@{shpe: lean-r, label: "const totalHarga = jumlahLiter * selectOil.price"}

Z@{shape: dbl-circ, label: "stop"}

A --> B
B --> C
C --1--> D
C --2 --> J
C --3 --> K
D --> E
E --> F
F --> L
L --> G
G --> H
H -- NO --> G
H -- YES --> I
I --> B
J --> B
K --> Z

```
