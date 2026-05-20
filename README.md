# Maltepe Fen Lisesi — BİT Proje Ödevi 2025-2026

**Öğrenci:** Kağan
**Proje Konusu:** Password Generator (Şifre Üretici) — React Native (Expo)

Bu repo, aynı projenin iki ayrı versiyonunu içerir. İkisinin de aynı işlevi görüp farklı kod stillerinde nasıl yazıldığını karşılaştırmak için aynı reponun altında tutuluyor.

## Klasörler

### `aisizyazilmiskod/`
Projeyi olabildiğince **insan eli ile yazılmış gibi** üreten versiyon.
- Türkçe değişken isimleri (uzunluk, sifre, havuz, tmp)
- Az ve gündelik dilde yorum
- Tek dosyada toparlanmış logic (helper bölünmesi minimum)
- Magic number'lar
- Try/catch yok, sadece temel kontroller
- TODO yorumu bırakılmış

### `aiileyazilmiskod/`
Projeyi **belirgin AI imzasıyla** üreten versiyon.
- İngilizce, "self-documenting" isimler (passwordLength, characterPool, strengthScore)
- JSDoc'lu yoğun yorumlar
- Modüler yapı: `utils/`, `hooks/`, `navigation/`, `components/`
- `constants.js` ile tüm sabitler
- Try/catch ve validation her yerde
- Custom hook'lar (`usePasswordGenerator`, `useThemeState`)

## Ortak Teknik Gereksinimler (Yönergeye Uyum)

| Kriter | Durum |
|---|---|
| React Native (Expo Managed) | ✓ |
| React Navigation (2 ekran) | ✓ |
| Sadece useState / useEffect | ✓ |
| StyleSheet | ✓ |
| `src/components` ve `src/screens` | ✓ |
| README.md (library + görev) | ✓ |

## Çalıştırma

Her iki klasör de ayrı bir Expo projesidir:

```bash
cd aisizyazilmiskod
npm install
npx expo start
```

veya

```bash
cd aiileyazilmiskod
npm install
npx expo start
```
