# iwarket Front end & Back

## Setting up local environment
```bash
npm i
```
Create a `.env.local` file in the top folder 

Add inside :
```bash
NEXT_PUBLIC_API_ENDPOINT="http://localhost:3000/api"
```

> This is if you have "iwarket" setting up and running

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

That's all 🎉

## Folder structure & routing

 - Inside `jsconfig.json`you will find most common used path alias 
 - All application code except `/pages`will be there
 - `@Page`is an app wrapper that works well in SSG, CSR, SSR to pass cache data, setting up custom providers. In case `_app.jsx` is not compatible.
 - `@/ui/` has all ui components in isolation, in case of not passed, they have self managed state
- `@/styles/` handled by build.scss that import all styles needed "including bootstrap" is where app styles live
- `@/utils/`has hooks, and function that can be reuse in other files