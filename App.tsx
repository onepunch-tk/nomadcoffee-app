import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import * as Font from "expo-font";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Asset} from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import {useCallback, useEffect, useState} from "react";

(async ()=>{
    await SplashScreen.preventAutoHideAsync();
})();
export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const fontsToLoad = [Ionicons.font];
                const fontsPromises = fontsToLoad.map(font => Font.loadAsync(font));
                const imagesToLoad = [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
                ];
                const imagesPromises = imagesToLoad.map(img => Asset.loadAsync(img));
                await Promise.all([...fontsPromises, ...imagesPromises]);
            } catch (e) {
                console.warn(e);
            } finally {
              setAppIsReady(true);
            }
        })();
    }, []);
    const onLayoutRootView = useCallback(async ()=>{
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    },[appIsReady]);

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text>Nomad-Coffee App!</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
