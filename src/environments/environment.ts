// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://proxy-sauce.glitch.me/https://creator.zoho.com/api/json/wrapd-information-center/view/Products_Report?authtoken=210a98bfcf52f54ff9739fedfbef4587&scope=creatorapi&zc_ownername=anubhav17&raw=true',
  deliveryUrl : 'https://proxy-sauce.glitch.me/https://creator.zoho.com/api/json/wrapd-information-center/view/Shipment_Report?authtoken=210a98bfcf52f54ff9739fedfbef4587&scope=creatorapi&zc_ownername=anubhav17&raw=true',
  ordersUrl : 'https://proxy-sauce.glitch.me/https://creator.zoho.com/api/json/wrapd-information-center/view/All_Orders?authtoken=210a98bfcf52f54ff9739fedfbef4587&scope=creatorapi&zc_ownername=anubhav17&raw=true',
  firebase : {
    apiKey: "AIzaSyBkxNZoufTcFc7YNPgk2LTyWB38bmPi0wk",
    authDomain: "wrapd-inventory.firebaseapp.com",
    databaseURL: "https://wrapd-inventory.firebaseio.com",
    projectId: "wrapd-inventory",
    storageBucket: "wrapd-inventory.appspot.com",
    messagingSenderId: "68846861834"
  }
};
