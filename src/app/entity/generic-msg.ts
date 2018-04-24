export interface GenericMsg<DATA> {
  status: number;
  msg: string;
  data: DATA;
}
