import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text, TouchableOpacity,StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import UserAvatar from "@/components/user/UserAvatar";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "广场",
          headerStyle:{shadowOffset:{width:0,height:0}},
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} /> ,
          headerLeft: () => (
            <TouchableOpacity style={{paddingLeft:10}} >
              {<UserAvatar></UserAvatar>}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "星球",
          tabBarIcon: ({ color }) => <TabBarIcon name="globe" color={color} />,
          headerLeft: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="headphones"
        options={{
          title: "空间",
          tabBarIcon: ({ color }) => <TabBarIcon name="headphones" color={color} />,
          headerLeft: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "信息",
          tabBarIcon: ({ color }) => <TabBarIcon name="comments-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "个人",
          tabBarIcon: ({ color }) => <TabBarIcon name="street-view" color={color} />,
        }}
      />
    </Tabs>
  );
}
