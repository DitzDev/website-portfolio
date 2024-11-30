# Template Website Portfolio

Assalamualaikum teman-teman, Disini gua share template portfolio, Jangan Lupa kasih ⭐ dan kalau ada yang Error buka issues aja ya! 👋😁

# Cara instalasi
- pertama, Kalian harus cloning Repository ini terlebih dahulu, Masuk ke cmd kalian dan pastiin `git` sudah terinstall di perangkat kalian, Ketik ini:
  ```bash
  git clone https://github.com/DitzDev/website-portfolio
  ```
- Kedua, Kalau udah kalian masuk ke Repository nya yang udah di cloning `cd website-portfolio` dan install dependensi yang di perlukan, Pastikan juga kalian udah install Node.js
```bash
npm install
```
- Ketiga, Kalau udah terinstall, Kalian tinggal Jalanin aja Website nya, Ketik:
```bash
npm run dev
```

## Dapetin Apikey dari firebase

Kalian udah pernah denger Firebase? kalau belum Firebase itu adalah layanan cloud API yang menyediakan serverless function yang memudahkan Bagi developer, Berikut tutorial nya:
- kalian masuk ke website [Firebase](https://firebase.google.com/?hl=id)
- Kalau udah kalian buat Project kalian seterah namain apa, Dan ikutin aja setingan rekomendasi dari Firebase nya
- Abis itu kalian klik Navigasi di pojok Kiri Atas, Kalian klik `build` dan pilih `Firestore database` dan Buat Firestore nya
- Ke `Rules` Kalian edit Rules nya jadi gini:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
- Abis itu kalian balik lagi ke halaman utama Firebase dan pergi ke `Project Settings`
- Nah disini kalian tinggal Klik logo `</>` di halaman Project Settings kalian, Dan ikutin aja Rekomendasi setup dari Firebase
- Kalau udah, Nanti kalian bakal di kasih Apikey, AuthDomain, Dan Project ID kalian, Dan tinggal masukin di `src/config/firebase.ts`

## Server Email (Tutorial Coming Soon)

## Donasi
Project ini di buat dengan ❤️, Ayo donasi biar saya makin semangat, Ciakhh
- [Saweria](https://saweria.co/DitzOfc)
