// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    apiUrl: 'https://api.flickr.com/services/rest/?api_key=b63ccebada7c4f0ab2a4508dc7217fdc&format=json&nojsoncallback=1'
};
