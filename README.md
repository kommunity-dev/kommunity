# kompanion's website

Why count on old fashioned link aggregators when you have recommendations by your fellow developers? 😉

kommunity.dev aims to ease your way into learning / getting deeper into GatsbyJS and React by gathering content recommendations from fellow developers. It's still a project in its infancy that you can help shape by contributing with code, ideas and content, it's open for everyone 🌟

## Contributing

See [kommunity's contribution page](https://kommunity.dev/contributing) for more info ;)

## TODOS

- **more** (_and more relavant_) **content**

### Nice to have

- [Automatic content submission](https://github.com/kompanion/kommunity/issues/1)
- modal with other recommendations
- Tooltips for skill levels
- Tooltips for the format in the content card
- masonry layout for the content
- filter for the topic when clicking on its tag inside a content card
- Accesible sidebars
- Each content having its own page
  - could help with sharing -> MUST VALIDATE -> won't people be more prone to share the actual link?
  - could help with SEO -> I'm not sure this is the case, but it's worth to take a look
  - it'd probably skyrocket build times, wouldn't it?
  - Consider adding `meta og:image` with images dynamically-generated from the content for better sharing -> a service that does this is https://www.url2png.com/
- Schema JSONLD for better SEO and content linkability
  - Maybe add in the `PageMeta` component
- Consider tapping into web mentions?
  - I honestly have no clue if this is valid

### Needs re-structuring

- Consider CSS modules for certain parts of the app
- Refactor the CSS spaghetti I made when I was anxiously rushing the build process 😅