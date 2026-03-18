import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
// Uvozimo podatke iz vašeg JSON fajla [cite: 26]
import skillsData from './skills.json';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* 1. Avatar image [cite: 11] */}
          <Image 
            source={{ uri: 'https://i.pravatar.cc/300?u=christopher' }} 
            style={styles.avatar} 
          />
          
          <View style={styles.infoContainer}>
            {/* 2. Name and Surname [cite: 12, 19] */}
            <Text style={styles.name}>Christopher Thistlewood</Text>
            
            {/* 3. Short biography [cite: 13, 21-23] */}
            <Text style={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Duis in urna a mi mattis fermentum at non nisi. 
              Class aptent taciti sociosqu ad litora torquent per conubia nostra.
            </Text>
            
            {/* 4. List of skills [cite: 25] */}
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
  container: { padding: 20, alignItems: 'center' },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    elevation: 5, // Sjenka za Android
    shadowColor: '#000', // Sjenka za iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: { width: '100%', height: 250 },
  infoContainer: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  bio: { fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 22 },
  skillList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBadge: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20,
    marginBottom: 5
  },
  skillText: { fontWeight: 'bold', fontSize: 14 }
});