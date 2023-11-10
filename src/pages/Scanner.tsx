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
import { useTesseract } from '../hooks/tesseract';
import { useState } from 'react';

const Scanner: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { getImgText, ready } = useTesseract();

  const handlePhotoTaken = async (newPhoto: string) => {
    setLoading(true);

    const data = await getImgText(newPhoto);
    setText(data!.text);
    console.log(data);

    setLoading(false);
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
        <div className="result">{loading ? 'Processing...' : text}</div>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton
            disabled={!ready}
            onClick={() => takePhoto(handlePhotoTaken)}
          >
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
