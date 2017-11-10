# Twitter-GithubAPIs

> - The following commands must be run in **Twitter-GithubAPIs** directory.
> - Node.js version >= 8.0.0 has to be installed on your system.

## Start application

### 1. Remove local.js from the Git index
```
git rm --cached config/local.js
```

### 2. Install global npm packages & dependencies

```
npm install -g sails
npm install
```

### 3. Set the Twitter API keys
- Edit config/local.js: Set your Twitter Consumer and Consumer Secret Keys.
- To create your Twitter app -> https://apps.twitter.com/. Set Callback URL (in Settings) to "http://localhost:1337".

### 4. Run application

```
sails lift
```

## Usage

All commands are run from the browser's console. Open http://localhost:1337 and open the console:
- Chrome: Press Ctrl+Shift+J (Windows / Linux) or Cmd+Opt+J (Mac)
- Firefox: Press Ctrl+Shift+K (Windows / Linux) or Cmd+dOpt+K (Mac)


## Commands

### Github

```
gitSearchRepo(searchQuery[, sort, order])
```
Find repositories via various criteria.
Parameters:
https://developer.github.com/v3/search/#search-repositories

```
gitSearchUser(searchQuery[, sort, order])
```
Find users via various criteria.
Parameters:
https://developer.github.com/v3/search/#search-users

```
gitCreateRepo(token, name[, description, homepage, privateBool])
```
Create a repository.
Parameters:
  - token: Required. Your personal Github access token (https://github.com/settings/tokens). Make sure when creating or editing your token to check these checkboxes:
    - repo
    - user
    - delete_repo
  - name: Required. The name of the repository.
  - description: A short description of the repository.
  - homepage: A URL with more information about the repository.
  - privateBool: Either true to create a private repository or false to create a public one. Creating private repositories requires a paid GitHub account. Default: false.

```
gitDeleteRepo(token, name)
```
Delete a repository.
Parameters:
  - token: Required. Your personal Github access token (https://github.com/settings/tokens). Make sure when creating or editing your token to check these checkboxes:
    - repo
    - user
    - delete_repo
  - name: Required. The name of the repository.

### Twitter

```
twAuth()
```
Authenticate.
All Twitter commands need authentication, as well as  `gimmeTheDude()`. Once authenticated, your authentication token will be stored in sessions, which means it would have to be regenerated when restarting the app, or cleaning your cookies.

```
twUsername()
```
Get your Twitter username.

```
twSearchTweet(searchQuery)
```
Returns a collection of relevant Tweets matching a specified query.
Parameters:
  - searchQuery: A UTF-8, URL-encoded search query of 500 characters maximum, including operators. Queries may additionally be limited by complexity. (https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html)

### Lebowsky special command

```
gimmeTheDude()
```
Search for "The Dude" projects on GitHub, then, for each project, search for any tweets mentioning it. Output the Github summary of each project together with a list of recent tweets.
Important: `twAuth()` needs to be run before.

## Dev

Run `npm run dev` to get started. This will check if your code pass the linter, lift the app and watch the files to reload the app automatically when change occurs. More options of scripts are available, check package.json -> scripts.
