
// Requires
const Request = require('request-promise-native')

// Globals
const apiUrl = 'http://localhost:1337',
  userAgent = 'sportdec-challenge-client'

console.info('Welcome in Twitter-GithubAPIs! Start typing commands to play with both APIs')

// Commands
// Github
window.gitSearchRepo = (searchQuery, sort, order) => {
  const options = {
    method: 'POST',
    uri: `${apiUrl}/github/search-repo`,
    headers: { 'User-Agent': userAgent },
    json: true,
    body: { searchQuery, sort, order }
  }

  Request(options)
    .then(res => console.log(res))
    .catch(err => { throw err })

  return 'waiting for async operations...'
}

window.gitSearchUser = (searchQuery, sort, order) => {
  const options = {
    method: 'POST',
    uri: `${apiUrl}/github/search-user`,
    headers: { 'User-Agent': userAgent },
    json: true,
    body: { searchQuery, sort, order }
  }

  Request(options)
    .then(res => console.log(res))
    .catch(err => { throw err })

  return 'waiting for async operations...'
}

window.gitCreateRepo = (token, name, description, homepage, privateBool) => {
  const options = {
    method: 'POST',
    uri: `${apiUrl}/github/create-repo`,
    headers: { 'User-Agent': userAgent },
    json: true,
    body: { token, name, description, homepage, privateBool }
  }

  Request(options)
    .then(res => console.log('Github repo created successfully', res))
    .catch(err => { throw err })

  return 'waiting for async operations...'
}

window.gitDeleteRepo = (token, name) => {
  const options = {
    method: 'POST',
    uri: `${apiUrl}/github/delete-repo`,
    headers: { 'User-Agent': userAgent },
    json: true,
    body: { token, name }
  }

  Request(options)
    .then(() => console.log('Github repo deleted successfully'))
    .catch(err => { throw err })

  return 'waiting for async operations...'
}

// Twitter
window.twAuth = () => {
  Request(`${apiUrl}/twitter/auth`)
    .then(res => console.log(res))
    .catch(err => { throw err })

  return 'waiting for async operations...'
}
if (location.search) {
  Request(`${apiUrl}/twitter/auth${location.search}`)
    .then(res => console.log(res))
    .catch(err => { throw err })
}

window.twUsername = () => {
  Request(`${apiUrl}/twitter/username`)
    .then(res => console.log(`Your username is ${res}`))
    .catch(err => { throw err })

  return 'waiting for async operations...'
}

window.twSearchTweet = searchQuery => {
  Request(`${apiUrl}/twitter/search-tweet?q=${searchQuery}`)
    .then(res => console.log(JSON.parse(res)))
    .catch(err => { throw err })

  return 'waiting for async operations...'
}

// Lebowsky special command
window.gimmeTheDude = () => {
  Request(`${apiUrl}/lebowsky/dude`)
    .then(res => console.log(JSON.parse(res)))
    .catch(err => { throw err })

  return 'waiting for async operations...'
}
