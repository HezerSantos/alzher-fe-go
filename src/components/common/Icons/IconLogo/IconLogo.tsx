import logo from "./logo.png";
import logo404NF from "./logo404_NF.png";
import logo404ND from "./logo404_ND.png";
import logo401 from "./logo401.png";

interface IconLogoProps {
  logoKey?: LogoKeys;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
}

type LogoKeys = "401" | "404_NF" | "404_ND" | "BASE";
const LOGOS = new Map<LogoKeys, string>([
  ["BASE", logo],
  ["401", logo401],
  ["404_NF", logo404NF],
  ["404_ND", logo404ND],
]);

const IconLogo = ({
  logoKey = "BASE",
  width = 124,
  height = 124,
  borderRadius,
}: IconLogoProps) => {
  return (
    <img
      src={LOGOS.get(logoKey)}
      alt="Logo"
      style={{ borderRadius, width, height }}
    />
  );
};

export default IconLogo;
