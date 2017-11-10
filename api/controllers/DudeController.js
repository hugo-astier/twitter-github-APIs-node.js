
// Requires
const Request = require('request-promise-native')
const GitHub = require('github-api')
const TwitterAPI = require('node-twitter-api')

// Globals
const externals = sails.config.externals,
  apiUtils = externals.providers,
  userAgent = externals.userAgent

module.exports = {
  gimmeTheDude: (req, res) => {
    // Oauth Authentication profile
    const oauth = {
        consumer_key: apiUtils.TWITTER_CONSUMERKEY,
        consumer_secret: apiUtils.TWITTER_CONSUMERSECRET,
        token: req.session.twitterAuth.accessToken,
        token_secret: req.session.twitterAuth.accessTokenSecret
      },
      // Git Request Options
      gitReqOptions = {
        uri: apiUtils.Git_SearchRepo + 'The Dude',
        headers: { 'User-Agent': userAgent },
        json: true
      },
      // Twitter Request Options for searching tweets
      TwReqOptions = { oauth, json: true }

    const async = async () => {
      try {
        // Get "Football" repos
        let footballRepos = await Request(gitReqOptions)
        // Keep the first 10
        footballRepos = footballRepos.items.slice(0, 10)
        // Clean results: only keep name & Github Url properties
        footballRepos = service.cleanJsonArray(footballRepos, ['name', 'html_url'])

        // Get tweets mentioning those Gihub repo names
        let footballReposTweets = await Promise.all(
          footballRepos.map(item => {
            TwReqOptions.url = `https://api.twitter.com/1.1/search/tweets.json?q=${item.name}`
            return Request(TwReqOptions)
          })
        )
        // Clean results
        footballReposTweets.forEach(footballRepoTweets => {
          // Only keep 'created_at', 'text' and 'user' on tweets
          footballRepoTweets.statuses = service.cleanJsonArray(footballRepoTweets.statuses, ['created_at', 'text', 'user'])
          // Only keep 'screen_name' and 'name' on the inner 'user' property
          footballRepoTweets.statuses.forEach(status => {
            status.user = service.cleanJson(status.user, ['screen_name', 'name'])
          })
        })

        // Associate the tweets to their respective repos
        for (let i = 0; i < footballRepos.length; i++) {
          let footballRepo = footballRepos[i]
          footballRepo.tweets = footballReposTweets[i].statuses
        }

        // Send the repos with their respective tweets
        res.send(200, footballRepos)
      }
      catch (err) { res.negotiate(err) }
    }
    async()
  }
}
