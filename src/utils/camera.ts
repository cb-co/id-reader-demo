import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}

export async function takePhoto(onPhotoTaken: (base64Data: string) => void) {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const base64Data = await base64FromPath(photo.webPath!);
    onPhotoTaken(base64Data);
  } catch (error) {
    console.error('Error taking photo:', error);
  }
}
