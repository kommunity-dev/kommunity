# How I'm creating PRs in the repository from a lambda function

## 1. get the reference for the master branch

```js
const masterRef = await octokit.git.getRef({
  owner: "kompanion",
  repo: "kommunity-content",
  ref: "heads/master",
});
const masterSha = masterRef.object.sha;
```

```json
// sample response
{
    "ref": "refs/heads/master",
    "node_id": "MDM6UmVmMTc5MzQ0NjY5Om1hc3Rlcg==",
    "url": "https://api.github.com/repos/kompanion/kommunity-content/git/refs/heads/master",
    "object": {
        "sha": "9fef3927aca334598b1a12afd5d3825eabca09c4",
        "type": "commit",
        "url": "https://api.github.com/repos/kompanion/kommunity-content/git/commits/9fef3927aca334598b1a1c4fasdd3825eabca09c4"
    }
}
```

## 2. create a branch with the name of the sent URL and the username of the collaborator

```js
const newBranchPath = `${slugifyString(url)}-${username}`;
const newBranchRef = await octokit.git.createRef({
  owner: "kompanion",
  repo: "kommunity-content",
  ref: `heads/${newBranchPath}`,
  sha: masterSha,
});
const newBranchSha = newBranchRef.object.sha;
```

## 3. create a file under the new branch

```js
// transform the JSON into a buffered string
// in order to send it to GH as base64
const bufferedContent = Buffer.from(JSON.stringify(fileContent), 'ascii');

const newFileRef = await octokit.repos.createFile({
  owner: "kompanion",
  repo: "kommunity-content",
  path: `content/${slugifyString(url)}`,
  message: `Submission of the ${url} by ${username}`,
  content: bufferedContent.toString('base64'),
  branch: newBranchPath,
});
// see the example response in
// https://developer.github.com/v3/repos/contents/#create-a-file
```

## 4. create a PR for the newly-created branch into master

```js
const PRref = await octokit.pulls.create({
  owner: "kompanion",
  repo: "kommunity-content",
  head: newBranchPath,
  base: "master",
  title: `${username} - add ${url}`,
  body: `Add [${url}](${url}) to the [kompanion kommunity directory](${url}).\n**By:** ${username}`
}).then(console.log).catch(console.error)
```

## TODO

- Find a way to add PRs under the collaborator's name