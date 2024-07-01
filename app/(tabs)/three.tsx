import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import Map from "@/components/MapView";
const Three = () => {
  return (
    <View style={{ height: 400 }}>
      <Map></Map>
      <Link href="/four">
        <Text>GO 4</Text>
      </Link>
      <Text>123</Text>
    </View>
  );
};
export default Three;
