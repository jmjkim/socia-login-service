import KakaoLogin from './KakaoLogin';
import NaverLogin from './NaverLogin';

export type SocialLoginProviders = 'kakao' | 'naver' | 'invalid';

interface User {
  id: number | string;
}

export enum LoginErrors {
  // naver, kakao 이외의 다른 provider가 넘어왔을 경우 발생하는 에러
  LoginProviderError,
}

export interface SocialLoginResponse {
  provider: {
    name: string;
    id: string;
  };
  profile: {
    userId?: User;
    username?: string;
    email?: string | null;
    scopes: string[];
  };
}

class SocialLoginService {
  private readonly provider: SocialLoginProviders;

  constructor({ provider }: { provider: SocialLoginProviders }) {
    this.provider = provider;
  }

  async login(): Promise<LoginErrors | SocialLoginResponse | undefined> {
    const provider = this.provider;

    if (provider === 'kakao') {
      const r = await new KakaoLogin().login();
      const userId: User = { id: r.profile.user.id };
      const resp: SocialLoginResponse = {
        provider: {
          name: provider,
          id: r.provider_id,
        },
        profile: {
          userId,
          email: r.profile.user.email,
          scopes: r.profile.scopes,
        },
      };

      console.log(resp);
      return resp;
    } else if (provider === 'naver') {
      const r = await new NaverLogin().login();
      const resp: SocialLoginResponse = {
        provider: {
          name: provider,
          id: r.provider.id,
        },
        profile: {
          username: r.profile.user_name,
          email: r.profile.email,
          scopes: r.profile.scopes,
        },
      };

      console.log(resp);
      return resp;
    } else {
      console.log(LoginErrors.LoginProviderError);
      return LoginErrors.LoginProviderError;
    }
  }
}

export default SocialLoginService;
