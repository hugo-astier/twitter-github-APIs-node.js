
// Requires
const Request = require('request-promise-native')
const TwitterAPI = require('node-twitter-api')
const Open = require('open')

// Globals
const twitter = new TwitterAPI({
  consumerKey: sails.config.externals.providers.TWITTER_CONSUMERKEY,
  consumerSecret: sails.config.externals.providers.TWITTER_CONSUMERSECRET,
  callback: 'http://localhost:1337/'
})
let twitterAuth

module.exports = {

  auth: (req, res) => {
    if (!req.query.oauth_token || !req.query.oauth_verifier) {
      twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
        if (error) { res.serverError(error) }
        else {
          req.session.twitterAuth = { init: false, requestTokenSecret }
          Open(`https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}`)
          res.send(200, `First authent step done. Please allow now app's permissions in the freshly opened Twitter tab.`)
        }
      })
    }
    else {
      twitter.getAccessToken(req.query.oauth_token, req.session.twitterAuth.requestTokenSecret, req.query.oauth_verifier, (error, accessToken, accessTokenSecret, results) => {
        if (error) { res.serverError(error) }
        else {
          req.session.twitterAuth = { accessToken, accessTokenSecret }
          res.send(200, `Twitter authentication successful. You can now execute other Twitter API commands.`)
        }
      })
    }
  },

  username: (req, res) => {
    twitter.verifyCredentials(req.session.twitterAuth.accessToken, req.session.twitterAuth.accessTokenSecret, (error, data, response) => {
      if (error) { res.serverError(error) }
      else {
        res.send(200, data['screen_name'])
      }
    })
  },

  searchTweet: (req, res) => {
    const searchQuery = req.query.q
    const profileOauth = {
        consumer_key: twitter.consumerKey,
        consumer_secret: twitter.consumerSecret,
        token: req.session.twitterAuth.accessToken,
        token_secret: req.session.twitterAuth.accessTokenSecret
      },
      options = {
        url: `https://api.twitter.com/1.1/search/tweets.json?q=${searchQuery}`,
        oauth: profileOauth,
        json: true
      }
    Request(options)
      .then(response => {
        // Clean results
        // Only keep 'completed_in', 'count' and 'query' on search metadata
        response.search_metadata = service.cleanJson(response.search_metadata, ['completed_in', 'count', 'query'])
        // Only keep 'created_at', 'text' and 'user' on tweets
        response.statuses = service.cleanJsonArray(response.statuses, ['created_at', 'text', 'user'])
        // Only keep 'screen_name' and 'name' on the inner 'user' property
        response.statuses.forEach(status => {
          status.user = service.cleanJson(status.user, ['screen_name', 'name'])
        })

        res.send(200, response)
      })
      .catch(err => res.serverError(err))
  }

}
