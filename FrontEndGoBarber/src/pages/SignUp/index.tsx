import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is Required'),
          email: Yup.string()
            .required('E-mail is Required')
            .email('Enter a valid email address'),
          password: Yup.string().min(6, 'Minimum six digits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'sucess',
          title: 'cadstrorealizaod',
          description: 'vc ja pode fazer o login',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'erro no cadastro',
          description: 'occoreu um errro ao fazer cadastro',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <Input
              name="name"
              icon={FiUser}
              type="text"
              placeholder="Your Name"
            />
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Register</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Go Back to LogIn
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
