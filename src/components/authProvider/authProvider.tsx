import { FC, ReactElement } from "react";
import AuthStyles from "./authProvider.module.scss";

interface AuthProviderProps {
    element: ReactElement;
}

export const AuthProvider: FC<AuthProviderProps> = ({ element }) => {
  return (
    <div className={AuthStyles.container}>
      <img className={AuthStyles.logo} src="/png/kubix.png" alt="kubix logo" />
      {element}
    </div>
  )
}
