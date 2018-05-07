/**
 * 快递员状态
 */
export enum SenderStatus {
  // 离线
  OFF_LINE,
  // 就绪
  READY,
  // 行程中
  IN_ROUTINE,
  // 休息
  RESTING,
  // 推送中
  PUSHING,
  // 取件中
  FETCHING,
  // 送件中
  SENDING
}
