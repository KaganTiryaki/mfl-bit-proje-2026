import { View, Text, Switch, StyleSheet } from 'react-native';

// switchli secim satiri (büyük harf, sayı vs için)
export default function SecimKutusu({ baslik, deger, degistir }) {
  return (
    <View style={styles.satir}>
      <Text style={styles.yazi}>{baslik}</Text>
      <Switch
        value={deger}
        onValueChange={degistir}
        thumbColor={deger ? '#7c5cff' : '#888'}
        trackColor={{ false: '#444', true: '#b9a8ff' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  satir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  yazi: {
    color: '#fff',
    fontSize: 15,
  },
});
