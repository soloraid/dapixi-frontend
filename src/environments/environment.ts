// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api:"http://localhost:18888/api"
  api: 'https://dapixi.ir/api',
  domain: 'https://dapixi.ir',
  googleLogoURL:
    'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg',
  githubLogoURL: 'https://raw.githubusercontent.com/gilbarbara/logos/c122ccfcfdb15d9958a85696ff2460ac3b01f8ca/logos/github-icon.svg'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
