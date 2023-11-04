import { createWorker } from 'tesseract.js';

export const getImgText = async (photo: string) => {
  const worker = await createWorker('spa');
  const { data } = await worker.recognize(photo);

  await worker.terminate();
  return data;
};
