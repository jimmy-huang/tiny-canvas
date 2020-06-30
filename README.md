# Tiny Canvas

It's a very basic demo that draws into a canvas. The purpose is to experiment with exposing few new features coming to Universal Stylus Initiative hardware. Information about USI can be found [here](https://universalstylus.org/).

## Working on tiny canvas

This project makes use of ECMAScript Modules (ESM) and runs them directly in the browser using [Snowpack](snowpack.dev). If you install new dependencies using `npm` like `npm install --save @material/mwc-button`, then please run `npx snowpack` afterwards to generate the new modules in `web_modules` folder. Also, the `web_modules` folder should be committed. Make sure to update the package.json file accordingly.

To install app dependencies and but any further steps, run

```bash
$ npm install
```

ESM compatible modules can be found using [pika.dev](pika.de). Material design web components can be found by searching for `@material/mwc-`. You can try out the demo page here: [Material Web Components demo](https://mwc-demos.glitch.me/)

Then run

```bash
$ npx snowpack --optimize
```

To test in the browser, run

```bash
$ npm run start
```

Because this demo uses a Service Worker it is recommended you keep the devtools open and check the "Bypass for network" option in the Application Tab. This will ensure that everytime you refresh the Service Worker is ignored (useful for development only).

To build, run

```bash
$ npm run build
```

Then you can git push and you're ready to submit a PR.

This demo is being developed by :

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/200px-Intel-logo.svg.png" alt="Intel" style="width:35px;"/>