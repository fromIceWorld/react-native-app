import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
const Three = () => {
  return (
    <View>
      <Link href="/four">
        <Text>GO 4</Text>
      </Link>
      <Text>123</Text>
    </View>
  );
};
export default Three;
