import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../redux/actions/auth.actions";

export interface LoginProps {
  logIn: (email: string, password: string) => void;
}

const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          console.log("clicked");
          props.logIn(email, password);
        }}
      >
        התחבר
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  logIn: (email: string, password: string) => dispatch(login(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
