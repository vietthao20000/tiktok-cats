const request = require('request-promise')
const fs = require('fs')

r = request.defaults({
  json: true, 
  headers: {
    'Cookie': 'odin_tt=d4b29b237a800d9ee4bc61c38df65b7800d9b61c2c8e52e489b40bd2256e4d7beb67b4861ed0812683086768c5558e067d17ccd51bdfb01103e3f690ea926a6c; sid_guard=e0d511c02c433ded966f51b4e6862419%7C1532842062%7C5184000%7CThu%2C+27-Sep-2018+05%3A27%3A42+GMT; uid_tt=ed51a6445bbec44ecc9ba7a78414d6776ba5c9e7677e068e646a52624be959c3; sid_tt=e0d511c02c433ded966f51b4e6862419; sessionid=e0d511c02c433ded966f51b4e6862419'
  }
})

query = {
  carrier_region: 'A',
  carrier_region_v2: '1',
  aid: '1180',
  as: 'a1iosdfgh',
  cp: 'androide1',
  device_id: '1'
}

get_user_info_by_uid = ({ user_id }) => {
  return r('https://api-t2.tiktokv.com/aweme/v1/user/', {qs: {...query, user_id}})
}

get_user_post_by_uid = ({ user_id, cursor, count }) => {
  return r('https://api-t2.tiktokv.com/aweme/v1/aweme/post/', {qs: {...query, user_id, max_cursor: cursor, count}})
}

search_user = ({ keyword, cursor, count }) => {
  return r('https://api-t2.tiktokv.com/aweme/v1/discover/search/', {qs: {...query, keyword, count, type: 1}})
}

search_hashtag = ({ keyword, cursor, count }) => {
  return r('https://api-t2.tiktokv.com/aweme/v1/challenge/search/', {qs: {...query, keyword, count}})
}

get_post_by_hashtag_id = ({ ch_id, cursor, count }) => {
  return r('https://api-t2.tiktokv.com/aweme/v1/challenge/aweme/', {qs: {...query, ch_id, cursor, count}})
}

// search_user({ keyword: '46511973', cursor: 0, count: 1 })
//   // .then(resp => console.log(resp.user_list))
//   .then(resp => resp.user_list[0].user_info.uid)
//   .then(user_id => get_user_post_by_uid({ user_id, count: 100 }))
//   .then(resp => console.log(resp.aweme_list.map(a => a.video.download_addr.url_list[0])))

// search_hashtag({ keyword: 'migente', cursor: 0, count: 1})
//   .then(resp => resp.challenge_list[0].challenge_info.cid)
//   .then(cid => get_post_by_hashtag_id({ ch_id: cid, cursor: 0, count: 100 }))
//   .then(resp => console.log(resp.aweme_list.map(a => a.video.download_addr.url_list[0])))

module.exports = { search_hashtag }