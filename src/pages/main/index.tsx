import SocialLoginService, { SocialLoginProviders } from '@/services/SocialLoginService';

const Main = () => {
  const onClick = async (provider: SocialLoginProviders) => {
    const service = new SocialLoginService({ provider });
    const resp = await service.login();

    alert(JSON.stringify(resp));
  };

  return (
    <>
      <button onClick={() => onClick('kakao')}>카카오 로그인</button>
      <button onClick={() => onClick('naver')}>네이버 로그인</button>
      <button onClick={() => onClick('invalid')}>invalid 로그인 test</button>
    </>
  );
};

export default Main;
