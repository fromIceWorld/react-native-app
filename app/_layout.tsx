import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Drawer from "react-native-drawer";
import { Text } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import useDrawerStore from "@/Store/drawerState";
import UserDrawer from "@/components/UserDrawer/Drawer";
import MyDrawer from '@/components/MyDrawer/MyDrawer'
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const setOpen = useDrawerStore((state: any) => state.setOpen);
  const colorScheme = useColorScheme();
  
  function onDrawerOpen(){
    setOpen(true)
    console.log('onDrawerOpen')
  }
  function onDrawerClose(){
    setOpen(false)
    console.log('onDrawerClose')
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <MyDrawer content = {<UserDrawer></UserDrawer>} onOpen={onDrawerOpen} onClose={onDrawerClose}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </MyDrawer>
      {/* <Drawer
        type="static"
        open={open}
        content={<UserDrawer></UserDrawer>}
        onClose={() => closeDrawer()}
        openDrawerOffset={70}
        panOpenMask={70}
        tapToClose={true}
        styles={{ ...drawerStyles, main }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </Drawer> */}
    </ThemeProvider>
  );
}

const drawerStyles = {
  drawer: {
    color: "blue",
    shadowRadius: 3,
    opacity: 0.8,
    paddingTop: 50,
    paddingLeft: 5,
  },
  main: { 
    paddingLeft: 0, 
    padding: 30,   
    backgroudColor: "red",
},
};
