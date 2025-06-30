import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
  color?: string;
  size?: number;
}

const IconeResume = ({ color = "black", size = 24, ...props }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M4.66663 10.6609C5.84019 10.713 8.50132 10.4769 10.015 7.27486M9.02311 6.88802L10.0444 6.66891C10.1689 6.64779 10.3517 6.77878 10.3966 6.93493L10.6666 8.12417M1.56763 8.809C1.33229 7.27747 1.21461 6.51176 1.50415 5.83292C1.79369 5.15408 2.43606 4.68962 3.7208 3.76071L4.6807 3.06667C6.2789 1.91112 7.07803 1.33334 8.00003 1.33334C8.92209 1.33334 9.72116 1.91112 11.3194 3.06667L12.2793 3.76071C13.564 4.68962 14.2064 5.15408 14.496 5.83292C14.7855 6.51176 14.6678 7.27747 14.4324 8.809L14.2318 10.1149C13.8982 12.2859 13.7313 13.3715 12.9527 14.0191C12.1741 14.6667 11.0358 14.6667 8.75923 14.6667H7.24083C4.96427 14.6667 3.82598 14.6667 3.04737 14.0191C2.26877 13.3715 2.10195 12.2859 1.76833 10.1149L1.56763 8.809Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconeResume;
