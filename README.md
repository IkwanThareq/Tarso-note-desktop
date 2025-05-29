# How to run the app localy

# Disclaimer

This project is still under development, but you also can use it as reference, all of setup environtment still on research and development to ensure the stability and robust.
and also i still working on the UI side and other fucntionality for increasing productivity


# Tech Stack
1. Svelte
2. electron
3. API (soon)

# Info
using 2 seperate terminal for running the svete and the electron

# Setup 
if you want create a similar project i use to build this how i done 

1. npm create svelte@latest my-note-app or using this npx sv create my-note-app
2. cd to the directory. For this is my-note-app 
3. npm install
4. npm install electron --save-dev (inside the project)
5. Create electron/main.ts
6. Create electron/preload.ts
7. Update your vite.config.ts like below
```bash
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [sveltekit()],
});
```

8. Edit src/routes/+page.svelte for the UI as you like
9. Declare types for window.api in src/app.d.ts like below
```bash
export {};

declare global {
  interface Window {
    api: {
      saveNote(content: string): Promise<{ success: boolean }>;
      loadNote(): Promise<{ success: boolean; content?: string }>;
    };
  }
}
```

10. In package.json (because i use vite in the project is like this)
```bash
"scripts": {
  "dev": "vite dev",
  "electron": "electron ."
}
```
11. adding this line on package.json
```bash
"type": "module",
  "main": "dist-electron/main.cjs",  // ⬅️ Adding this line
```
12. create file on your root project called 
```bash 
tsconfig.electron.json
```
and include this 
```bash 
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist-electron",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "allowJs": true
  },
  "include": ["electron"]
}

```
12. after that compile main.ts using this 
```bash
npx tsc --project tsconfig.electron.json
```
after that if you got issue you can change the file extension from main.js to main.cjs
result from guide number 12 is you can see on your project in dist-electron/main.js

#Step to running the app on local machine

1. run the svelte first using this 
```bash 
npm run dev
```
2. after the svelte running, run this command for running the electron app
```bash
npm run electron
```   
the app will pop up and show, 


# Issue
The common issue you will find is some time the end point or port for the electron to call is not match for example you will get error like this
```bash
with error: ERR_CONNECTION_REFUSED
//in terminal that running electron
```
for that the solution i got is like below
```bash 
svelte localhost: 6000
// but electron load using:
win.loadURL('localhost:5173');
```
the electron app will not show any UI, for that you need to change the port to 6000  in main.ts for example and compile again using step number 12






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
