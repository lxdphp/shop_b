import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params
  })
}

export function getinfo(params) {
  return request({
    url: '/goods/info',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/goods/create',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/goods/del',
    method: 'post',
    data
  })
}
