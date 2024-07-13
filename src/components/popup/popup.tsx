import { FC } from "react";
import { Button } from "../../components";
import PopupStyles from "./popup.module.scss";

interface PopupProps {
  onClose?: () => void;
  source: string;
  buttonLabel: string;
  headText: string;
  description?: string;
  buttonHandler: () => void;
  openedPopup: boolean;
}

export const Popup: FC<PopupProps> = ({
  onClose,
  source,
  buttonLabel,
  headText,
  buttonHandler,
  openedPopup,
  description,
}) => {
  const handleRemove = () => {
    if (onClose) {
      onClose();
    } else {
      buttonHandler();
    }
  };

  const continueHandler = () => {
    buttonHandler();
  };

  return (
    <div className={`${PopupStyles.sign_popup} ${openedPopup && PopupStyles.opened_popup}`}>
      <div className={PopupStyles.main}>
        <div className={PopupStyles.remove}>
          <img
            src="/png/remove.png"
            alt="remove icon"
            onClick={handleRemove}
          />
        </div>
        <div className={PopupStyles.content_container} id={PopupStyles.content_container}>
          <img className={PopupStyles.sign_success} src={source} alt="success image" />
          <div className={PopupStyles.content}>
            <h1 id={PopupStyles.head_text}>{headText}</h1>
            <div className={PopupStyles.message_content} id={PopupStyles.description}>
              {description
                ? description
                : "Lorem ipsum dolor sit amet consectetur. Sed risus pretium maurismassa sit nam."}
            </div>
            <Button className="black-button" label={buttonLabel} handler={continueHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};
