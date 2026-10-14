import Button from "../../components/common/Button/Button";
import IconLock from "../../components/common/Icons/IconLock/IconLock";
import IconPencil from "../../components/common/Icons/IconPencil/IconPencil";
import IconTrash from "../../components/common/Icons/IconTrash/IconTrash";
import DashboardContent from "../../components/Dashboard/common/DashboardContent/DashboardContent";
import { useGetSettingsQuery } from "../../services/dashboardService";

import "./Settings.scss";

const Settings = () => {
  const { data } = useGetSettingsQuery();

  return (
    <DashboardContent header="Account settings">
      <div className="settings">
        <div className="settings__intro">
          <p className="settings__eyebrow">YOUR ACCOUNT</p>
          <p className="settings__description">
            Manage your account details and security.
          </p>
        </div>

        <div className="settings__group">
          <section className="settings__item">
            <div className="settings__item-icon">
              <IconPencil width={22} height={22} />
            </div>

            <div className="settings__item-content">
              <h3 className="settings__item-title">Email address</h3>
              <p className="settings__item-description">
                Your email address associated with Alzher.
              </p>
              <p className="settings__item-value">
                {data?.email ?? "Loading email..."}
              </p>
            </div>

            <Button text="Edit" className="settings__button">
              <IconPencil width={16} height={16} />
            </Button>
          </section>

          <section className="settings__item">
            <div className="settings__item-icon">
              <IconLock width={22} height={22} />
            </div>

            <div className="settings__item-content">
              <h3 className="settings__item-title">Password</h3>
              <p className="settings__item-description">
                Use a strong, unique password to protect your account.
              </p>
            </div>

            <Button text="Change" className="settings__button">
              <IconLock width={16} height={16} />
            </Button>
          </section>
        </div>

        <section className="settings__danger">
          <div className="settings__danger-content">
            <h3 className="settings__danger-title">Delete account</h3>
            <p className="settings__danger-description">
              Permanently remove your account and its associated data. This
              action may not be reversible.
            </p>
          </div>

          <Button
            text="Delete account"
            className="settings__button settings__button--danger"
          >
            <IconTrash width={16} height={16} />
          </Button>
        </section>
      </div>
    </DashboardContent>
  );
};

export default Settings;
