
// Requires
const Request = require('request-promise-native')
const GitHub = require('github-api')

// Globals
const apiUrls = sails.config.externals.providers,
  userAgent = sails.config.externals.userAgent

module.exports = {
  searchRepo: (req, res) => {
    // Get data back
    let { searchQuery, sort, order } = req.body
    // Prepare the query
    if (sort) searchQuery += `&sort=${sort}`
    if (order) searchQuery += `&order=${order}`
    // Request options
    const options = {
      uri: apiUrls.Git_SearchRepo + searchQuery,
      headers: { 'User-Agent': userAgent },
      json: true
    }

    const async = async () => {
      try {
        // get repos
        const repos = await Request(options)
        // Clean results: only keep name & Github Url properties
        repos.items = service.cleanJsonArray(repos.items, ['name', 'html_url'])
        res.send(200, repos)
      }
      catch (err) { res.negotiate(err) }
    }
    async()
  },

  searchUser: (req, res) => {
    // Get data back
    let { searchQuery, sort, order } = req.body
    // Prepare the query
    if (sort) searchQuery += `&sort=${sort}`
    if (order) searchQuery += `&order=${order}`
    // Request options
    const options = {
      uri: apiUrls.Git_SearchUser + searchQuery,
      headers: { 'User-Agent': userAgent },
      json: true
    }

    const async = async () => {
      try {
        // Get users
        const users = await Request(options)
        // Clean results: only keep name & profile Url properties
        users.items = service.cleanJsonArray(users.items, ['login', 'html_url'])
        res.send(200, users)
      }
      catch (err) { res.serverError(err) }
    }
    async()
  },

  createRepo: (req, res) => {
    const { token, name, description, homepage, privateBool } = req.body

    // basic auth
    const gh = new GitHub({ token })
    const me = gh.getUser()
    const options = { name }
    if (description) options.description = description
    if (homepage) options.homepage = homepage
    options.privateBool = !!privateBool

    me.createRepo(options)
      .then(response => res.send(200, response.data))
      .catch(err => res.serverError(err))
  },

  deleteRepo: (req, res) => {
    const { token, name } = req.body

    // basic auth
    const gh = new GitHub({ token })
    const me = gh.getUser()

    const async = async () => {
      try {
        const profile = await me.getProfile()
        const repo = gh.getRepo(profile.data.login, name)
        const deleteRepo = await repo.deleteRepo()
        res.send(200)
      }
      catch (err) { res.serverError(err) }
    }
    async()
  }
}
