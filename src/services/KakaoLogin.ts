import { SocialLoginProvider } from '@/types/SocialLoginProvider';

interface KakaoLoginResponse {
  provider_id: string;
  profile: {
    scopes: string[];
    user: { id: string; email: string };
  };
}

class KakaoLogin implements SocialLoginProvider<KakaoLoginResponse> {
  login(): Promise<KakaoLoginResponse> {
    return Promise.resolve({
      provider_id: 'be35f10d-1214-46af-af06-916429eaf77d',
      profile: {
        scopes: ['email', 'name'],
        user: { id: 'be35f10d-1214-46af-af06-916429eaf77d', email: 'test@example.com' },
      },
    });
  }
}

export default KakaoLogin;
