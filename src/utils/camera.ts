import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const takePhoto = async (onPhotoTaken: (base64Data: string) => void) => {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });

    onPhotoTaken(photo.dataUrl!);
  } catch (error) {
    console.error('Error taking photo:', error);
  }
};
