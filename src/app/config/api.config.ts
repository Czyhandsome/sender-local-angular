// IP地址

const IP = 'localhost';
// 端口号
const PORT = 8080;

// 主页地址
const DOMAIN_URL = `http://${IP}:${PORT}`;

export class ApiConfig {
  // ********** 权限的URL ********** //
  public static AUTH_URL = `${DOMAIN_URL}/api/public/sender/login`;


  // ********** WebSocket的URL ********** //
  public static WEBSOCKET_URL(senderId: string): string {
    return `ws://${IP}:${PORT}/ws?userId=${senderId}`;
  }

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

  // ********** Sender Location ********** //
  static updateLocationUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/locations`;
  }

  // ********** 任务 ********** //
  static acceptTaskUrl(senderId: string, taskId: string) {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}/receive`;
  }

  static rejectTaskUrl(senderId: string, taskId: string) {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}/reject`;
  }
}
