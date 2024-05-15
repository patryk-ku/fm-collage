# .fm Collage Creator

Create cover collages of your top albums from last.fm. [Check it out yourself!](https://fm-collage.vercel.app/)

![screenshot](/images/fm-collage-screenshot.png)

This app creates collages entirely on the client side and only uses the server to retrieve data from last.fm without leaking the API key. So the speed of collage creation depends on the performance of the user's hardware and their internet speed. For this reason, the cost of hosting this site is very low.

Created using: [Next.js](https://nextjs.org/) + [TailwindCSS](https://tailwindcss.com/) + [Mantine](https://mantine.dev/) + [Phosphor Icons](https://phosphoricons.com/), and hosted for free on [Vercel](https://vercel.com/).

## Build and host it by yourself

> [!NOTE]
> You will need a last.fm API key which you can easily get [here](https://www.last.fm/api).

There are three main ways how to achieve this:

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpatryk-ku%2Ffm-collage&env=LASTFM_API_KEY&envDescription=Last.fm%20api%20key&envLink=https%3A%2F%2Fwww.last.fm%2Fapi&project-name=fm-collage&repository-name=fm-collage)

### Standard node.js hosting or your own server

```sh
git clone 'https://github.com/patryk-ku/fm-collage'
cd fm-collage
mv .env.example .env
```

Now insert your last.fm API key into `.env` file. Then install all dependencies and build files.

```sh
npm install --omit=dev
npm run build
```

Finally run server.

```sh
npm run start
```

### Standalone export and Node.js hosting without acces to terminal/script execution (e.g. Phusion Passenger)

When building applications using the standard method, the app folder will be over ~700 MB in size. This is a lot and can easily be reduced to a reasonable ~20 MB using [Next.js standalone export](https://nextjs.org/docs/pages/api-reference/next-config-js/output) option. Using this method also allows the site to be served using hosting that use Phusion Passenger or other similar solution.

Do everything as for a normal installation but instead of the `npm run build` use:

```sh
npm run export-standalone
```

The built app files will be waiting for you in the `dist` folder. To start server simply run:

```sh
node app.js
```

> [!CAUTION]
> This method will also export your .env file to the dist folder.

## Development

Run the development server on [http://localhost:3000](http://localhost:3000):

```sh
npm run dev
```
