import { LoginForm } from "../../components";
import { RegisterForm } from "../../components";
import { useState } from "react";

const LandingPage = () => {
  const [register, setRegister] = useState(false);

  const handleRegister = () => {
    setRegister(true);
  };

  return (
    <div>
      {register ? (
        <div>
          <RegisterForm />
          <h4 onClick={() => setRegister(false)}>Já tem cadastro?</h4>
        </div>
      ) : (
        <div>
          <LoginForm />
          <h4 onClick={handleRegister}>Não tem cadastro?</h4>
        </div>
      )}
    </div>
  );
};

export { LandingPage };
