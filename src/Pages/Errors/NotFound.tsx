import "./Errors.scss";
import defaultContent from "../../content/errors";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../reducers/hooks";
import { clearErrors } from "../../reducers/errorSlice";
import IconLogo from "../../components/common/Icons/IconLogo/IconLogo";
const NotFound = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="error">
      <IconLogo width={"15rem"} height={"15rem"} />
      <p>{defaultContent.notFound}</p>
      <Button
        text={defaultContent.backToHome}
        className="back-to-home"
        onClick={() => {
          navigate("/admin/request-portal");
          dispatch(clearErrors());
        }}
      />
    </div>
  );
};

export default NotFound;
