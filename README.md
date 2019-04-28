<h1 style="text-align:center !important">kompanion.dev</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/0de71404-8492-449a-aca1-3c6366a4e7b3/deploy-status)](https://app.netlify.com/sites/kommunity-beta/deploys)

<h2 style="text-align:center !important">kommunity-curated content on GatsbyJS and React ✨</h2>

Why count on old fashioned link aggregators when you have recommendations by your fellow developers? 😉

kommunity.dev aims to ease your way into learning / getting deeper into GatsbyJS and React by gathering content recommendations from fellow developers. It's still a project in its infancy that you can help shape by contributing with code, ideas and content. **It's open for everyone 🌟**

## Contributing

See [kommunity's contribution page](https://kommunity.dev/contributing) for more info ;)

## Infrastructure

- Content is hosted in the [`kompanion/kommunity-content`](https://github.com/kompanion/kommunity-content) repository
- [Gatsby](https://gatsbyjs.org) generates the app based on [React](https://reactjs.org) components
- Components are written in [Typescript](https://www.typescriptlang.org/)
  - code linted [tslint](https://palantir.github.io/tslint/) with [StandardJS](https://standardjs.com/) style
  - and formatted with [Prettier](https://prettier.io/)
- For the styles, kommunity.dev currently uses plain `.css` files
  - [PostCSS](https://postcss.org) transforms the CSS to support older browsers
  - and style is ~poorly~ linted by [stylelint](https://stylelint.io/) (it's not set-up properly yet, so it's not taking much effect)
- This repo uses `yarn workspaces` as, in the future, it'll also be home to serverless functions that will allow for more advanced features 🤗

Feel free to create an issue or PR with suggested changes to the architecture and code!
