import Container from "../Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  );
};

export default Login;
