# strapi-plugin-import-export

## Installation Guide

1. If it doesn't exist, create the plugin directory in your Strapi project's root folder: `mkdir plugins`
2. Navigate to your plugins directory: `cd plugins`
3. Clone the plugin from its repo: `git clone https://github.com/DavidBall117/strapi-plugin-import-export.git import-export`
4. Navigate back to your strapi project's root directory: `cd ..`
5. Rebuild your admin UI to add the new plugin to the admin panel and run the project: `yarn build && yarn develop`

## Notes

- You can use the `strapi generate:plugin <plugin-name>` utility to generate a local plugin.
- Reference [developer docs](https://strapi.io/documentation/developer-docs/latest/development/local-plugins-customization.html) for more information.
- To enable local plugin development start application with: `yarn develop --watch-admin`

## TODO

- [ ] Complete remove media from data functionality.
