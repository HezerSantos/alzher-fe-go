import logo from "./logo.png";

interface IconLogoProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
}

const IconLogo = ({
  width = 124,
  height = 124,
  borderRadius,
}: IconLogoProps) => {
  return <img src={logo} alt="Logo" style={{ borderRadius, width, height }} />;
};

export default IconLogo;
