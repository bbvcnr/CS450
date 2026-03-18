import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import skillsData from './skills.json';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Smanjen i zaokružen Avatar  */}
          <Image 
            source={{ uri: 'https://i.pravatar.cc/300?u=christopher' }} 
            style={styles.avatar} 
            resizeMode="cover" // Osigurava da slika popuni krug bez razvlačenja
          />
          
          <View style={styles.infoContainer}>
            <Text style={styles.name}>Christopher Thistlewood</Text>
            
            <Text style={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Duis in urna a mi mattis fermentum at non nisi. [cite: 21]
            </Text>
            
            <View style={styles.skillList}>
              {skillsData.map((item, index) => (
                <View key={index} style={[styles.skillBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.skillText}>
                    {item.skill} {item.level === 'advanced' ? '💪' : item.level === 'intermediate' ? '👍' : '👶'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 10
  },
  avatar: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    alignSelf: 'center', 
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#eee'
  },
  infoContainer: { padding: 20, alignItems: 'center' }, // Centriramo i tekst
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  bio: { fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 22, textAlign: 'center' },
  skillList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  skillBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  skillText: { fontWeight: 'bold', fontSize: 14 }
});