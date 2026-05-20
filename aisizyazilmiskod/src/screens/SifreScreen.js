import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import Buton from '../components/Buton';
import SecimKutusu from '../components/SecimKutusu';

export default function SifreScreen() {
  const [uzunluk, setUzunluk] = useState(12);
  const [buyuk, setBuyuk] = useState(true);
  const [kucuk, setKucuk] = useState(true);
  const [sayi, setSayi] = useState(true);
  const [ozel, setOzel] = useState(false);
  const [sifre, setSifre] = useState('');
  const [guc, setGuc] = useState('');

  // sifre uzunlugu degistikce yeni sifre uretmek istemiyorum
  // ama gucu yine de baska durumda hesaplatmak lazim
  useEffect(() => {
    if (sifre.length > 0) {
      gucHesapla(sifre);
    }
  }, [sifre]);

  function uretSifre() {
    const buyukler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const kucukler = 'abcdefghijklmnopqrstuvwxyz';
    const sayilar = '0123456789';
    const semboller = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let havuz = '';
    if (buyuk) havuz += buyukler;
    if (kucuk) havuz += kucukler;
    if (sayi) havuz += sayilar;
    if (ozel) havuz += semboller;

    if (havuz === '') {
      Alert.alert('Hata', 'En az bir karakter tipi seçmelisin!');
      return;
    }

    let tmp = '';
    for (let i = 0; i < uzunluk; i++) {
      tmp += havuz.charAt(Math.floor(Math.random() * havuz.length));
    }

    setSifre(tmp);
  }

  function gucHesapla(s) {
    // basit guc hesabi, uzunluk + tip cesidi
    let puan = 0;
    if (s.length >= 8) puan++;
    if (s.length >= 12) puan++;
    if (/[A-Z]/.test(s)) puan++;
    if (/[0-9]/.test(s)) puan++;
    if (/[^A-Za-z0-9]/.test(s)) puan++;

    if (puan <= 2) setGuc('Zayıf');
    else if (puan === 3 || puan === 4) setGuc('Orta');
    else setGuc('Güçlü');
  }

  async function kopyala() {
    if (!sifre) {
      Alert.alert('Önce şifre üret');
      return;
    }
    await Clipboard.setStringAsync(sifre);
    Alert.alert('Tamam', 'Şifre kopyalandı');
  }

  // uzunluk degistirme butonlari
  function azalt() {
    if (uzunluk > 4) setUzunluk(uzunluk - 1);
  }
  function arttir() {
    if (uzunluk < 32) setUzunluk(uzunluk + 1);
  }

  let gucRengi = '#888';
  if (guc === 'Zayıf') gucRengi = '#ff5e5e';
  if (guc === 'Orta') gucRengi = '#ffb84d';
  if (guc === 'Güçlü') gucRengi = '#4ade80';

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.sifreKutu}>
        <Text style={styles.sifreYazi} selectable>
          {sifre || 'Şifren burada görünecek'}
        </Text>
        {guc !== '' && (
          <Text style={[styles.guc, { color: gucRengi }]}>{guc}</Text>
        )}
      </View>

      <Text style={styles.bolumBaslik}>Uzunluk: {uzunluk}</Text>
      <View style={styles.uzunlukSatir}>
        <Buton yazi="-" onPress={azalt} renk="#3f3f5e" />
        <TextInput
          style={styles.input}
          value={String(uzunluk)}
          onChangeText={(t) => {
            const n = parseInt(t);
            if (!isNaN(n) && n > 0 && n <= 32) setUzunluk(n);
            else if (t === '') setUzunluk(0);
          }}
          keyboardType="numeric"
        />
        <Buton yazi="+" onPress={arttir} renk="#3f3f5e" />
      </View>

      <Text style={styles.bolumBaslik}>Karakter Tipleri</Text>
      <SecimKutusu baslik="Büyük Harf (A-Z)" deger={buyuk} degistir={setBuyuk} />
      <SecimKutusu baslik="Küçük Harf (a-z)" deger={kucuk} degistir={setKucuk} />
      <SecimKutusu baslik="Sayı (0-9)" deger={sayi} degistir={setSayi} />
      <SecimKutusu baslik="Özel Karakter (!@#)" deger={ozel} degistir={setOzel} />

      <View style={{ marginTop: 20 }}>
        <Buton yazi="Şifre Üret" onPress={uretSifre} />
        <Buton yazi="Kopyala" onPress={kopyala} renk="#4ade80" />
      </View>

      {/* TODO: ileride kayıt ekranı eklenebilir, geçmiş sifreler tutulur */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  sifreKutu: {
    backgroundColor: '#2a2a3e',
    borderRadius: 14,
    padding: 18,
    minHeight: 90,
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#3f3f5e',
  },
  sifreYazi: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  guc: {
    marginTop: 10,
    fontSize: 13,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  bolumBaslik: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  uzunlukSatir: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#2a2a3e',
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 80,
    textAlign: 'center',
  },
});
