import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// genel buton, her yerde kullanıyorum
export default function Buton({ yazi, onPress, renk }) {
  return (
    <TouchableOpacity
      style={[styles.btn, renk && { backgroundColor: renk }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.btnYazi}>{yazi}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#7c5cff',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 6,
  },
  btnYazi: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
