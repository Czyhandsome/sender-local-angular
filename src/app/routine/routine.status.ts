/**
 * 行程状态
 */
export enum RoutineStatus {
  CREATED,
  WAIT_FOR_RESPONSE,
  CANCELLED,
  TIMEOUT,
  REJECTED,
  ACCEPTED
}
