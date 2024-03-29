# Readder 📖

Read your favorite text subreddits posts based on how much time you have.

Also available as an [iOS app](https://github.com/sleepyfran/readder-ios).

## ⚙️ Building

Readder is built with F# using Fable to compile it to JavaScript, which means you'll need:

- .NET to build the F# side of things. Get started [here](https://dotnet.microsoft.com/en-us/).
- Node.js to run the JavaScript code. Head over [here](https://nodejs.org/en/) to grab it.

Once you have everything setup, you can start the local server by running:

```bash
pnpm install # Install dependencies.
pnpm start # Run!
```

> This project uses `pnpm` to handle JavaScript dependencies, but if you don't want to install it you can use `npm`. Just make sure you don't introduce any new dependencies in the `package.json` without `pnpm`, since the lockfile is **only** for `pnpm`.

This will run the Vite server and you'll be able to reach the page in http://localhost:3000/.

## ️🎉 Contributing

Every contribution is welcome! Just take a look at the issues to see what's on the making right now or open your own issue if you want any feature to be implemented.

Consider using the [gitmoji CLI](https://github.com/carloscuesta/gitmoji-cli) to follow the commit style 😄

## 💬 Credits

- Based on Angel Munoz's Fable.Lit template: https://github.com/AngelMunoz/Fable.Lit.Templates

- Favicon created by [Eucalyp](https://www.flaticon.com/authors/eucalyp)
