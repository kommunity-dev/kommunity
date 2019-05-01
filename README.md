<h1 style="text-align:center">kompanion.dev</h1>

<h2 style="text-align:center">kommunity-curated content on GatsbyJS and React ✨</h2>

---

Why count on old fashioned link aggregators when you have recommendations by your fellow developers? 😉

kommunity.dev aims to ease your way into learning / getting deeper into GatsbyJS and React by gathering content recommendations from fellow developers. It's still a project in its infancy that you can help shape by contributing with code, ideas and content. **It's open for everyone 🌟**

## Contributing

See the section below for info on contributing with code. For other types of contributions, refer to the [kommunity's contribution page](https://kommunity.dev/contributing) for more info ;)

### Contributing with code

1. Clone this repo;
1. Run `yarn` - this will link all the internal packages and install everything needed to develop the website;
1. Run `yarn develop:www` to run the website and voilà!

The folder structure:

- The Gatsby website is found in `www`;
- The `serverless` folder is still in its early stages and is subject to change;
- Typescript definitions used throughout the project can be acessed under the `types` folder;
- And, finally, `mock-data` is a folder dedicated to host reusable data such as a list of topics :)

Any questions, just file an issue and we'll be happy to solve them :)

**PS:** The CSS right now is a mess, and we know it. Using plain `.css` files is helping a ton with performance and build times, but it's being done in a poor manner at the moment... feel free to propose changes to its structure!

## Infrastructure

- Content is hosted in the [`kompanion/kommunity-content`](https://github.com/kompanion/kommunity-content) repository
- [Gatsby](https://gatsbyjs.org) generates the app based on [React](https://reactjs.org) components
- Components are written in [Typescript](https://www.typescriptlang.org/)
  - code linted [tslint](https://palantir.github.io/tslint/) with [StandardJS](https://standardjs.com/) style
  - and formatted with [Prettier](https://prettier.io/)
- For the styles, kommunity.dev currently uses plain `.css` files
  - [PostCSS](https://postcss.org) transforms the CSS to support older browsers
  - and style is ~poorly~ linted by [stylelint](https://stylelint.io/) (it's not set-up properly yet, so it's not taking much effect)
- We use some helper functions from the `[@kompanion/utils](https://github.com/kompanion/utilities/tree/master/utils)` packages in the code.
- And this repo uses `yarn workspaces` as it's also home to serverless functions and types that can be applied to other side projects 🤗

Feel free to create an issue or PR with suggested changes to the architecture and code!
