# Website for Chris Poulles

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=chris-poulles)

This is the source code for [chris-poulles.com](https://chris-poulles.com), the website of cinematographer Chris Poulles.

## Code architecture
All the code that makes up the site can be found in the `src` folder. The main entry point from which the site is built is `index.hbs`. It is written in the [Handlebars templating language](https://handlebarsjs.com/) that is turned into HTML during the build process. During this build all components from `components`, `helpers` and `layouts` are included.
For interactivity `index.js` loads some custom Javascript which can be found in `lib`.
The website is styled with [SCSS](https://sass-lang.com/) which is turned into normal CSS during the build process. The entry point for the styles is `index.scss` with all the styles located in the `styles` folder.

## Build process
The code is turned into a static website that can be uploaded to any hoster (normal HTML, CSS and JS) with a tool called [Webpack](https://webpack.js.org/). The main configuration for this build process can be found in `webpack.common.js`. The build process happens on https://vercel.com/ and is automatically triggered whenever changes are made to the code. If changes are made to the `develop` Git branch the preview version of the site is deployed and some custom configuration from `webpack.dev.js` is used. If changes are made to the `main` Git branch the production (live) version of the site is updated and custom configuration from `webpack.prod.js` is used. 
During the build process content like texts and images is pulled from the related Contentful CMS project. For this to work the Space ID and Access token [environment variables](https://vercel.com/docs/environment-variables) need to be set on Vercel. The values for these can be found in the project settings on Contentful.

## Maintenance information

- **Update content** like images, texts and links on Contentful and trigger a [deployment](https://vercel.com/changelog/manually-create-deployments-by-commit-or-branch-in-the-dashboard) on Vercel 

- **Change code** by pushing changes via Git to the Github repository or directly editing on Github. Changes on `develop` branch -> preview deployment, changes on `main` -> live production deployment

- **DNS & Domain** the domain is registered on https://kas.all-inkl.com. There you need to set the type A record value under Tools > DNS-Settings to the IP that Vercel tells you. Vercel will only show that IP if the configuration mismatches, otherwise everything should be in order. You can check the domain configuration on Vercel under https://vercel.com/chris-poulles-website/chris-poulles-website/settings/domains
