# TestAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

# PROJECT NOTES:
Since I had issues with API of https://worldtimeapi.org/ I used https://app.ipgeolocation.io/ instead.
It requires to register and get an API key to use it.
Register as Individual it gives free 1000 requests to API , should be enough for test

After registering change value of apiKey in the environment.ts file to one from website.
