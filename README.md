# Strapi plugin import-export

## Installation Guide

1. If it doesn't exist, create the plugin directory in your Strapi project's root folder: `mkdir plugins`
2. Navigate to your plugins directory: `cd plugins`
3. Clone the plugin from its repo: `git clone https://github.com/DavidBall117/strapi-plugin-import-export.git import-export`
4. Navigate back to your strapi project's root directory: `cd ..`
5. Rebuild your admin UI and run the project: `yarn build && yarn develop`

## Bugs/TODO
- [ ] TypeError: strapi.notification.toggle is not a function
- [ ] User needs to know when the upload fails due to the single type not being published OR publish the single type with the data given.
