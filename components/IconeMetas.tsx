import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
  color?: string;
  size?: number;
}

const IconeMetas = ({ color = "black", size = 24, ...props }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M11.3333 8C11.3333 9.84093 9.84089 11.3333 7.99996 11.3333C6.15901 11.3333 4.66663 9.84093 4.66663 8C4.66663 6.15905 6.15901 4.66667 7.99996 4.66667"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M9.33337 1.46669C8.90257 1.37924 8.45664 1.33333 8.00004 1.33333C4.31814 1.33333 1.33337 4.3181 1.33337 8C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 7.5434 14.6208 7.09747 14.5334 6.66667"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M8.02014 7.97493L11.0554 4.93965M13.1602 2.89633L12.7914 1.57157C12.7235 1.35333 12.4609 1.26635 12.2839 1.411C11.3265 2.19337 10.2835 3.24719 11.1353 4.90938C12.8513 5.70961 13.831 4.63048 14.5821 3.72345C14.7316 3.54299 14.6415 3.2717 14.4164 3.20662L13.1602 2.89633Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconeMetas;
