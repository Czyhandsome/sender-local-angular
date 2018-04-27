const DOMAIN_URL = 'http://47.98.99.234:8080';

export class ApiConfig {
  public static AUTH_URL = `${DOMAIN_URL}/api/public/sender/login`;

  static needAuthentication(url: string): boolean {
    const api = url.replace(DOMAIN_URL, '');
    const isPublic = api.startsWith('/public') || api.startsWith('/api/public');
    return !isPublic;
  }

  static currentTaskUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/currentTask`;
  }

  static currentStatusUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status`;
  }

  static beReadyUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status/ready`;
  }

  static beRestingUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status/resting`;
  }
}
