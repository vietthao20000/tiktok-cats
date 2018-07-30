const express = require('express')
const Router = express.Router();
const { search_hashtag } = require(__dirname + '/api')
const request = require('request')
const fs = require('fs')

score = (aweme) => (aweme.statistics.share_count * 9 + aweme.statistics.comment_count * 6 + aweme.statistics.digg_count * 2)

Router.get('/videos/:keyword', (req, res) => {
  keyword = req.params.keyword
  count = 1
  cursor = 0

  if (req.query.limit) {
    count = parseInt(req.query.limit)
  }

  if (req.query.cursor) {
    cursor = parseInt(req.query.cursor)
  }
  
  search_hashtag({ keyword, cursor: 0, count: 1 })
    .then(resp => resp.challenge_list[0].challenge_info)
    .then(hashtag => 
      get_post_by_hashtag_id({ ch_id: hashtag.cid, cursor, count })
        .then(res => {
          res.post_count = hashtag.user_count
          return res
        })
    )
    .then(resp => {
      resp.aweme_list = resp.aweme_list        
      .sort((a, b) => score(b)  - score(a))
      .map(a => {
        a.video.download_addr.url_list = a.video.download_addr.url_list.map(url => url.replace('watermark=1', 'watermark=0'))
        return a
      })

      return resp
    })
    .then(final => res.json(final))
})

module.exports = Router;