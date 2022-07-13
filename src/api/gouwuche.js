import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}

export function getinfo(params) {
  return request({
    url: '/order/info',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/gouwuche/create',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/gouwuche/del',
    method: 'post',
    data
  })
}
