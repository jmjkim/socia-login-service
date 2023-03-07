import '@testing-library/jest-dom/extend-expect';
import SocialLoginService, { LoginErrors } from '../src/services/SocialLoginService';

/**
 * @jest-environment jsdom
 */

// 1. Arrange
// 2.Act
// 3.Assert

describe('SocialLoginService', () => {
  it('should receive a response from kakao after clicking 카카오 로그인', async () => {
    const service = new SocialLoginService({ provider: 'kakao' });
    const resp = await service.login();

    const validResponse = Promise.resolve({
      provider: {
        name: 'kakao',
        id: 'be35f10d-1214-46af-af06-916429eaf77d',
      },
      profile: {
        userId: 'be35f10d-1214-46af-af06-916429eaf77d',
        email: 'test@example.com',
        scopes: ['email', 'name'],
      },
    });

    expect(Promise.resolve(resp)).toStrictEqual(validResponse);
  });

  it('should receive a response from kakao after clicking 네이버 로그인', async () => {
    const service = new SocialLoginService({ provider: 'naver' });
    const resp = await service.login();

    const validResponse = Promise.resolve({
      provider: {
        name: 'naver',
        id: 'be35f10d-1214-46af-af06-916429eaf77d',
      },
      profile: {
        username: 'test',
        email: 'test@example.com',
        scopes: ['email', 'name'],
      },
    });

    expect(Promise.resolve(resp)).toStrictEqual(validResponse);
  });

  it('should not receive any response and return 0 after clicking invalid 로그인 test', async () => {
    const service = new SocialLoginService({ provider: 'invalid' });
    const resp = await service.login();

    expect(resp).toBe(LoginErrors.LoginProviderError);
  });
});
