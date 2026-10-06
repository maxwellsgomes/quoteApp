import MaterialIcons from '@react-native-vector-icons/material-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { profileStorage } from '@/storage/profile-storage';
import { styles } from '@/styles/profile.styles';
import { UserProfile } from '@/types/UserProfile';

const DEFAULT_APP_LOGO = require('@/utils/default_logo.png');

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logoUri, setLogoUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadData() {
      const data = await profileStorage.get();
      if (data) {
        setName(data.name || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setLogoUri(data.logoUri);
      }
    }
    loadData();
  }, []);

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert(
        'Permissão necessária',
        'Permita o acesso às suas fotos para selecionar uma logomarca.'
      );
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const imageUri = asset.base64
        ? `data:image/png;base64,${asset.base64}`
        : asset.uri;
      setLogoUri(imageUri);
    }
  }

  function handleRemoveLogo() {
    setLogoUri(undefined);
  }

  async function handleSave() {
    try {
      const profile: UserProfile = {
        name,
        email,
        phone,
        logoUri,
      };

      await profileStorage.save(profile);
      Alert.alert('Sucesso', 'Dados do emissor atualizados com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#3d0399fd', '#0a015cef']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Meus Dados</Text>
            <Text style={styles.subtitle}>Informações exibidas nas propostas</Text>
          </View>
          <Button
            iconName="arrow-back"
            variant="icon"
            onPress={() => router.back()}
          />
        </View>

        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.avatarWrapper}>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={pickImage}
                activeOpacity={0.8}
              >
                <Image
                  source={logoUri ? { uri: logoUri } : DEFAULT_APP_LOGO}
                  style={styles.avatarImage}
                />
              </TouchableOpacity>

              {logoUri && (
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={handleRemoveLogo}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="close" size={16} color="#FFF" />
                </TouchableOpacity>
              )}

              <Text style={styles.avatarLabel}>
                {logoUri ? 'Toque na imagem para trocar' : 'Toque para personalizar logo'}
              </Text>
            </View>

            <View style={styles.form}>
              <Input
                placeholder="Nome da Empresa ou Prestador"
                value={name}
                onChangeText={setName}
                iconName="business"
              />

              <Input
                placeholder="E-mail de Contato"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                iconName="email"
              />

              <Input
                placeholder="Telefone / WhatsApp"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                iconName="phone"
              />
            </View>

            <View style={styles.footer}>
              <Button
                iconName="check"
                title="Salvar"
                onPress={handleSave}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}