This is a [Next.js](https://nextjs.org/) project using the TMBD movie API.

Visit the live site: [Click Here!](https://movie-api-fe.vercel.app/)

![Filmax-Homepage](https://github.com/LucasMERN/Filmmax-Movie-Hub/assets/94091522/427ecb3e-7336-42ee-929b-3c4c67174d74)

## Getting Started

### 1. Clone the repository:
```bash
git clone <repo link>
```

### 2. Install dependancies:
```bash
npm install
```

### 3. Sign up for an api key and bearer token with [TMBD](https://www.themoviedb.org/)

### 4. Create an .env file and give API_KEY and API_TOKEN the appropriate values from TMBD
```bash
NEXT_PUBLIC_API_KEY=your-key-here
NEXT_PUBLIC_API_TOKEN=your-token-here
```

### 5. Start your development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## TODO

- Add user authentication to allow users to rate, add content to lists, and favorite items - branch name: /feature/auth-pipeline
- Add watch providers to movie and tv show pages to allow users to find out what platforms they can watch the specific media on - branch name: /feature/watch-providers
- Add reviews section to movie and tv show pages to give more insight into the media they are currently viewing - branch name: /feature/reviews
- Add search params for pagination (?page=2) with useSearchParams - branch name: /feature/pagination-params

## Contribution Guidelines

I am always open to accepting contributions. If you are interested in tackling any of the TODO items listed above, please clone the repo, create a feature branch with the todo item branch name, commit your changes and open a PR to the main branch.
If you have contributions that are not listed in the TODO section, please open an issue with a detailed description of the proposed changes and I will reach out in the comments!
