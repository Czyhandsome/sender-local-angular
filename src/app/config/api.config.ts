const DOMAIN_URL = 'http://localhost:8080';

export class ApiConfig {
  public static AUTH_URL = `${DOMAIN_URL}/api/public/sender/login`;

  // ********** 判断一个url是否需要token认证 ********** //
  static needAuthentication(url: string): boolean {
    const api = url.replace(DOMAIN_URL, '');
    const isPublic = api.startsWith('/public') || api.startsWith('/api/public');
    return !isPublic;
  }

  // ********** Task ********** //
  static currentTaskUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/currentTask`;
  }

  static currentStatusUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status`;
  }

  // ********** Sender Status ********** //
  static beReadyUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status/ready`;
  }

  static beRestingUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status/resting`;
  }

  // ********** Routine ********** //
  static createRoutineUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/routines`;
  }

  static cancelRoutineUrl(senderId: string, routineId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/routines/${routineId}/cancel`;
  }

  static currentRoutineUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/routines/current`;
  }
}
