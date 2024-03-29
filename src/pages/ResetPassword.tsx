import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import { SignupStyle } from './Signup';

export interface SignupProps {
  email: string;
  pwd: string;
}

function ResetPassword() {  
  const {resetRequested ,userResetRequest,userResetPassword} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    if (resetRequested) {
      // 초기화
      userResetPassword(data);
    } else {
      //요청
      userResetRequest(data);
    }
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              type="email"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                placeholder="비밀번호"
                type="password"
                {...register('pwd', { required: true })}
              />
              {errors.pwd && <p className="error-text">비밀번호를 입력해주세요.</p>}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequested ? '비밀번호 초기화' : '초기화 요청'}
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
};

export default ResetPassword;
