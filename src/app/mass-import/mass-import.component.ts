import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-mass-import',
  templateUrl: './mass-import.component.html',
  styleUrls: ['./mass-import.component.css']
})
export class MassImportComponent implements OnInit {
  // 要导入的订单
  order1 = {
    'starter': {
      'name': '测试万平',
      'phonenumber': '13966716001',
      'longitude': 117.310963,
      'latitude': 31.831457,
      'addressName': '创客云谷',
      'addressDetail': '3楼'
    },
    'receiver': {
      'name': '测试万平收件人',
      'phonenumber': '13966716001',
      'longitude': 117.282285,
      'latitude': 31.865395,
      'addressName': '三孝口',
      'addressDetail': '4栋606'
    },
    'item': {
      'name': '羊毛',
      'type': '衣物',
      'size': 'SMALL',
      'weight': '0.5',
      'remark': '易皱衣物'
    }
  };

  // 大商户信息
  bigCustomers = [
    {id: '3c99830b-536c-11e8-abca-00163f00a4fe', phone: '055165616758', numOrders: 1},
    {id: '1dfb8147-4482-450e-a983-3682bd706fd1', phone: '18408242354', numOrders: 1},
    {id: '21a544a4-ff84-4fda-b3df-bf1168d3de48', phone: '18949203682', numOrders: 1}
  ];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  oneClickImport(bcId, numOrders) {
    for (let i = 0; i < numOrders; i++) {
      this.importOrder(bcId, this.order1);
    }
  }

  private importOrder(bcId, order) {
    const HOST_URL = 'http://192.168.100.101:8080';
    const url =
      `${HOST_URL}/api/public/bigcustomer/${bcId}/importedOrders/mergeOrders?ak=123456`;
    this.http.post(url, order);
  }
}
