# How to run the app localy

$Disclaimer

This project is still under development, but you also can use it as reference, all of setup environtment still on research and development to ensure the stability and robust.
and also i still working on the UI side and other fucntionality for increasing productivity


# Tech Stack
1. Svelte
2. electron
3. API (soon)

# Setup 
if you want create a similar project i use to build this how i done 

1. npm create svelte@latest my-note-app
2. cd to the directory. For this is my-note-app
3. npm install
4. npm install electron --save-dev (inside the project)
5. Create electron/main.ts
6. Create electron/preload.ts
7. Update your vite.config.ts











Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
