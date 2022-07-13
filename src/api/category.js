import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/category/list',
    method: 'get',
    params
  })
}

export function categoryList(params) {
  return request({
    url: '/category/list',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/category/create',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/category/del',
    method: 'post',
    data
  })
}
