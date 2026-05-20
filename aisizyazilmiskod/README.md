# Şifre Üretici (Password Generator)

Maltepe Fen Lisesi 2025-2026 BİT proje ödevi için yapılmış React Native uygulaması.

## Hakkında

Kullanıcının istediği uzunlukta ve karakter çeşitliliğinde güçlü şifreler üreten basit bir mobil uygulama. Üretilen şifre güç göstergesiyle birlikte gösterilir ve tek tıkla panoya kopyalanabilir.

## Görev Dağılımı

Bu proje tek kişilik olarak yapılmıştır. Tüm roller aynı kişide:

- **UI Designer:** Kağan — renk paleti, layout, font seçimi
- **Developer 1:** Kağan — component yapısı, navigation
- **Developer 2:** Kağan — state yönetimi, şifre üretme mantığı

## Kullanılan Library'ler

- `expo` — Expo managed workflow
- `react` , `react-native` — temel kütüphaneler
- `@react-navigation/native` — sayfalar arası geçiş
- `@react-navigation/native-stack` — stack navigator
- `react-native-screens` — navigation için gerekli
- `react-native-safe-area-context` — navigation için gerekli
- `expo-clipboard` — şifreyi panoya kopyalamak için
- `expo-status-bar` — üst bar görünümü

## Klasör Yapısı

```
.
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── src
    ├── components
    │   ├── Buton.js
    │   └── SecimKutusu.js
    └── screens
        ├── GirisScreen.js
        └── SifreScreen.js
```

## Çalıştırma

```bash
npm install
npx expo start
```

Sonra Expo Go uygulamasıyla QR kodu okutarak telefonda çalıştırabilirsin.

## Özellikler

- 4-32 karakter arası şifre uzunluğu
- Büyük harf, küçük harf, sayı ve özel karakter seçimi
- Şifre güç göstergesi (Zayıf / Orta / Güçlü)
- Tek tıkla panoya kopyala
- Karanlık tema
- tüm kodları claude ile yazdım hocam :( ama insan gibi yaz dedim :) %kaç ai bakmak isterseniz: https://aidedektoruhasanhocaspecial.vercel.app 