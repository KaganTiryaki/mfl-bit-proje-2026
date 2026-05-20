import { View, Text, StyleSheet, Image } from 'react-native';
import Buton from '../components/Buton';

export default function GirisScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.ust}>
        <Text style={styles.logo}>🔐</Text>
        <Text style={styles.baslik}>Şifre Üretici</Text>
        <Text style={styles.altYazi}>
          Güçlü ve güvenli şifreler oluştur.{"\n"}Hesaplarını koru.
        </Text>
      </View>

      <View style={styles.alt}>
        <Buton
          yazi="Şifre Oluşturmaya Başla"
          onPress={() => navigation.navigate('Sifre')}
        />
        <Text style={styles.minik}>v1.0 — okul projesi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  ust: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    fontSize: 90,
    marginBottom: 20,
  },
  baslik: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  altYazi: {
    color: '#bbb',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  alt: {
    marginBottom: 20,
  },
  minik: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
