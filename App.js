import React, {useCallback} from 'react';
import {Platform} from 'react-native';
import RNShake from 'react-native-shake';
import DeviceInfo from 'react-native-device-info';
import MainScreen from './src/MainScreen';
import ReportModal from './src/ReportModal';

const App = () => {
  const [showReportModal, setShowReportModal] = React.useState(true);
  const [deviceInfo, setDeviceInfo] = React.useState(null);

  const changeVisibleReportModal = useCallback(() => {
    setShowReportModal(!showReportModal);
  }, [showReportModal]);

  React.useEffect(() => {
    RNShake.addEventListener('ShakeEvent', () => {
      changeVisibleReportModal();
    });

    let brand = DeviceInfo.getBrand();
    let systemName = DeviceInfo.getSystemName();
    let model = DeviceInfo.getModel();
    let buildNumber = DeviceInfo.getBuildNumber();
    if (Platform.OS === 'android') {
      let deviceId = DeviceInfo.getDeviceId();

      const buildIdPromise = DeviceInfo.getBuildId();
      const apiLevelPromise = DeviceInfo.getApiLevel();
      const deviceName = DeviceInfo.getDeviceName();

      Promise.all([buildIdPromise, apiLevelPromise, deviceName]).then(
        values => {
          setDeviceInfo(
            `System Name: ${systemName},
        Api Level: ${values[1]},
        Build Number: ${buildNumber},
        Brand: ${brand},
        Model: ${model},
        Device Name: ${values[2]},
        Device Id: ${deviceId},
        Build Id: ${values[0]}.`,
          );
        },
      );
    } else {
      const buildIdPromise = DeviceInfo.getBuildId();
      const deviceNamePromise = DeviceInfo.getDeviceName();

      Promise.all([buildIdPromise, deviceNamePromise]).then(values => {
        setDeviceInfo(
          `System Name: ${systemName}, brand: ${brand}, model: ${model}, buildId:${values[0]}, deviceName: ${values[1]}.`,
        );
      });
    }
    return RNShake.removeEventListener('ShakeEvent');
  }, [changeVisibleReportModal]);

  console.log(deviceInfo);

  return (
    <>
      <MainScreen />
      <ReportModal
        isVisible={showReportModal}
        onOutPress={changeVisibleReportModal}
        deviceInfo={deviceInfo}
      />
    </>
  );
};

export default App;
