const DOMAIN_URL = 'http://0.0.0.0:8080';

export class ApiConfig {
  public static AUTH_URL = `${DOMAIN_URL}/api/public/sender/login`;

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
