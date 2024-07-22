import { useEffect, useState } from "react";
import { Create, Complete, Popup } from "./../../components";
import CreateAccountStyles from "./createAccount.module.scss";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../axios/axios";

export const CreateAccount = () => {
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [completeSide, setCompleteSide] = useState(false);
  const [userData, setUserData] = useState({
    fullname: "",
    password: "",
    companyName: "",
    typeOfUse: "",
    projectName: "",
    whereDidYouHear: "",
  })

  const handleUserData = (name: string, value: string) => {
    setUserData({ ...userData, [name]: value })
  }

  const handleSide = () => {
    setCompleteSide(!completeSide);
  };

  useEffect(() => {
    console.log(userData);
  },[userData])

  // ========= calling api ========= \\

  const confirmationToken = localStorage.getItem("kubix_confirmation_token") || undefined;

  const { mutate: setupProfile, isPending: setupProfilePending } = useMutation({
    mutationKey: ["setup-profile"],
    mutationFn: () => Axios("POST", "/auth/setup-profile", undefined, undefined, confirmationToken, userData ),
    onSuccess: (response) => {
      setPopupIsOpen(true)
      localStorage.setItem("kubix_portal_access_token", response.data.access_token);
    },
    onError: () => {
      setErrorMessage("Invalid Credentials")
    }
  })

  useEffect(() => {
    if (popupIsOpen || errorMessage !== "" ) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [popupIsOpen, errorMessage])

  return (
    <div className={`onboard-container ${CreateAccountStyles.container}`}>
      {completeSide && (
        <div className="back-button" onClick={handleSide}>
          <img src="/png/arrow.png" alt="arrow icon" />
          Back
        </div>
      )}
      {
        completeSide ? <Complete apiHandler={setupProfile} apiPending={setupProfilePending} dataHandler={handleUserData} /> : <Create sideHandler={handleSide} dataHandler={handleUserData} />
      }
      <div className="page-gif">
        <img src="/gif/create-account.gif" alt="forget-password gif" />
      </div>
      {
        (popupIsOpen || errorMessage !== "" ) && <div className="blur-div"></div>
      }
      {
        popupIsOpen && 
        <div className="popup">
          <Popup headText="Congrulations!" buttonLabel="Next" openedPopup={popupIsOpen} source="/gif/success.gif" buttonHandler={() => setPopupIsOpen(false)} />
        </div>
      }
      {
        errorMessage !== "" && 
        <div className="popup">
          <Popup headText={errorMessage} buttonLabel="Try again" openedPopup={errorMessage !== ""} source="/gif/error.gif" buttonHandler={() => setErrorMessage("")} />
        </div>
      }
    </div>
  );
};
