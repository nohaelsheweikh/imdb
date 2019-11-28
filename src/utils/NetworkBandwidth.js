import RNFetchBlob from 'react-native-fetch-blob'

const downloadSizeInBits = 1500411 * 8;
const metric = 'MBps';

export const measureConnectionSpeed = () => {
  return new Promise((resolve, reject) => {
    const imageURI = "http://chandra.harvard.edu/graphics/resources/desktops/2006/1e0657_1680.jpg"
    const startTime = (new Date()).getTime();
    RNFetchBlob
      .config({
        fileCache: false,
      })
      .fetch('GET', imageURI, {})
      .then((res) => {
        const endTime = (new Date()).getTime();
        const duration = (endTime - startTime)/ 1000;
        const speedMBS = (downloadSizeInBits/ (1024 * 1024 * duration));
        const speed = speedMBS * 8
        resolve({metric, speed});
      })
      .catch(reject);
  });
};