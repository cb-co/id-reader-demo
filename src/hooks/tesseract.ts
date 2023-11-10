import { useEffect, useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';

export const useTesseract = () => {
  const [worker, setWorker] = useState<Tesseract.Worker | null>(null);

  useEffect(() => {
    const loadWorker = async () => {
      const w = await createWorker('spa');
      setWorker(w);
    };
    loadWorker();

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, []);

  const getImgText = async (photo: string) => {
    if (worker) {
      try {
        const { data } = await worker.recognize(photo);
        return data;
      } catch (error) {
        console.error('Error during recognition:', error);
      }
    }
  };

  return {
    getImgText,
    ready: !!worker,
  };
};
