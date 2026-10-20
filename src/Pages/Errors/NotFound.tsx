import "./Errors.scss";
import defaultContent from "../../content/errors";
import Button from "../../components/common/Button/Button";
import { useAppDispatch } from "../../reducers/hooks";
import { clearErrors } from "../../reducers/errorSlice";
import IconLogo from "../../components/common/Icons/IconLogo/IconLogo";
const NotFound = () => {
  const dispatch = useAppDispatch();
  const targetUrl: string = "/";
  return (
    <div className="error">
      <IconLogo width={"15rem"} height={"15rem"} logoKey="404_NF" />
      <p>{defaultContent.notFound}</p>
      <Button
        text={defaultContent.backToHome}
        className="back-to-home"
        onClick={() => {
          window.location.href = targetUrl;
          dispatch(clearErrors());
        }}
      />
    </div>
  );
};

export default NotFound;
