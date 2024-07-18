import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import useDrawerStore from "@/Store/drawerState";
import UserDrawer from "@/components/UserDrawer/Drawer";
import MyDrawer from "@/components/MyDrawer/MyDrawer";
import  { ImageViewProvider } from "@/Context/ImageViewContext";
import ImageDisplay from "@/components/image/ImageDisplay";
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
  function onDrawerOpen() {
    setOpen(true);
  }
  function onDrawerClose() {
    setOpen(false);
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ImageViewProvider>
        {/* 抽屉 */}
        <MyDrawer
          content={<UserDrawer></UserDrawer>}
          onOpen={onDrawerOpen}
          onClose={onDrawerClose}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false,title:'' }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </MyDrawer>
        {/* 照片查看器 */}
        <ImageDisplay></ImageDisplay>
      </ImageViewProvider>
    
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


