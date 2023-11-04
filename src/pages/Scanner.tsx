import { camera } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';

import './Scanner.css';
import { takePhoto } from '../utils/camera';
import { getImgText } from '../utils/tesseract';
import { useState } from 'react';

const Scanner: React.FC = () => {
  const [text, setText] = useState('');
  const handlePhotoTaken = async (newPhoto: string) => {
    const data = await getImgText(newPhoto);
    setText(data.text);
    console.log(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ID Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ID Scanner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="result">{text}</div>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto(handlePhotoTaken)}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
