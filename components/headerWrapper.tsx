import { COLORS } from "@/constants/colors";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HeaderWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top, backgroundColor: COLORS.background }}
    >
      {children}
    </View>
  );
};
