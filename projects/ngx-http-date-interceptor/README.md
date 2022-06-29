# ngx-http-date-interceptor

A simple Angular interceptor, that converts income datestrings in JSON responses to native Date.

## Install

```sh
npm install ngx-http-date-interceptor
```

## Usage

```ts
import { HttpDateInterceptorProvider } from "ngx-http-date-interceptor";

providers: [
  // ...,
  HttpDateInterceptorProvider,
];
```
