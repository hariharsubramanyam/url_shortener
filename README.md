# url_shortener
A URL shortener in less than 150 lines of code.

This is a URL shortener web app. With it, you can create a short name (e.g. urlshort) for a long URL (e.g. https://github.com/hariharsubramanyam/url_shortener/).

Then, you can use the short url: `localhost:3000/links/urlshort` to navigate you to the long URL `https://github.com/hariharsubramanyam/url_shortener/`.

This is a simple app I'll use to teach a recitation on Node for MIT's Software Studio class.

The app includes:

1. A client and server
2. A command line tool for getting and setting the URL mappings.
3. Logic for persisting the mappings to a file
4. Logic for generating random short names for URLs

# Usage

```
npm install && node main.js
```
