export interface PayloadObject<DATA> {
  orderId: string;
  object: DATA;
  type: number;
}
