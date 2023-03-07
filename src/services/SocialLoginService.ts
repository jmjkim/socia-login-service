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
  providerId: string;
  provider: string;
  user?: User;
  scopes?: string[];
  email?: string | null;
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
      const resp: SocialLoginResponse = {
        providerId: r.provider_id,
        provider,
        user: { id: r.profile.user.id },
        scopes: r.profile.scopes,
        email: r.profile.user.email,
      };

      return resp;
    } else if (provider === 'naver') {
      const r = await new NaverLogin().login();
      const resp: SocialLoginResponse = {
        providerId: r.provider.id,
        provider,
        user: { id: r.profile.user_name },
        scopes: r.profile.scopes,
        email: r.profile.email,
      };

      return resp;
    } else {
      return LoginErrors.LoginProviderError;
    }
  }
}

export default SocialLoginService;
