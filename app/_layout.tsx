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
import useDrawer from "@/components/useDrawer/Drawer";
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
  const open = useDrawerStore((state) => state.open),
    closeDrawer = useDrawerStore((state) => state.closeDrawer);
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        type="static"
        open={open}
        content={<useDrawer></useDrawer>}
        onClose={() => closeDrawer()}
        openDrawerOffset={70}
        tapToClose={true}
        styles={drawerStyles}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </Drawer>
    </ThemeProvider>
  );
}

const drawerStyles = {
  drawer: {
    backgroudColor: "#fff",
    shadowColor: "red",
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  main: { paddingLeft: 0 },
};
