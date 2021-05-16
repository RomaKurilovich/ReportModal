import React from "react";
import { Platform } from "react-native";
import RNShake from "react-native-shake";
import DeviceInfo from "react-native-device-info";
import SplashScreen from "react-native-splash-screen";
import MainScreen from "./src/MainScreen";
import ReportModal from "./src/ReportModal";

const App = () => {
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [deviceInfo, setDeviceInfo] = React.useState(null);

  React.useEffect(() => {
    RNShake.addListener(() => {
      setShowReportModal(true);
    });
    SplashScreen.hide();

    const brand = DeviceInfo.getBrand();
    const systemName = DeviceInfo.getSystemName();
    const model = DeviceInfo.getModel();
    const buildNumber = DeviceInfo.getBuildNumber();
    if (Platform.OS === "android") {
      const deviceId = DeviceInfo.getDeviceId();

      const buildIdPromise = DeviceInfo.getBuildId();
      const apiLevelPromise = DeviceInfo.getApiLevel();
      const deviceName = DeviceInfo.getDeviceName();

      Promise.all([buildIdPromise, apiLevelPromise, deviceName]).then(
        (values) => {
          setDeviceInfo(
            `System Name: ${systemName},
        Api Level: ${values[1]},
        Build Number: ${buildNumber},
        Brand: ${brand},
        Model: ${model},
        Device Name: ${values[2]},
        Device Id: ${deviceId},
        Build Id: ${values[0]}.`
          );
        }
      );
    } else {
      const buildIdPromise = DeviceInfo.getBuildId();
      const deviceNamePromise = DeviceInfo.getDeviceName();

      Promise.all([buildIdPromise, deviceNamePromise]).then((values) => {
        setDeviceInfo(
          `System Name: ${systemName}, brand: ${brand}, model: ${model}, buildId:${values[0]}, deviceName: ${values[1]}.`
        );
      });
    }
    return RNShake.removeListener();
  }, []);

  return (
    <>
      <MainScreen onShowModal={() => setShowReportModal(true)} />
      <ReportModal
        isVisible={showReportModal}
        closeModa={() => setShowReportModal(false)}
        deviceInfo={deviceInfo}
      />
    </>
  );
};

export default App;
