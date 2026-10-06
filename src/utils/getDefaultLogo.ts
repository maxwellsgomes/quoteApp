import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';

export async function getDefaultAppLogoBase64(): Promise<string> {
  try {
    // 1. Carrega o asset local do projeto
    const asset = Asset.fromModule(require('@/utils/default_logo.png'));
    await asset.downloadAsync();
    if (!asset.localUri) return ''

    

   // Lê diretamente em base64 usando a nova classe File
    const file = new File(asset.localUri);
    const base64 = await file.base64();

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error("Erro ao carregar o logo padrão:", error);
    return '';
  }
}