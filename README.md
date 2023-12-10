# Checkpoint

![thumb](/public/print.png)

## Checkpoint is an open-source platform that make it possible for you to share your experience with various games. Our main purpose is to unite the community to build an indie project that represents one of our favorite activities: gaming.

### [Open preview](https://checkpoint.duca.dev)

### How Checkpoint should work?

Checkpoint have some must-have features, here they are:

- [ ] Integration of a game database in order to list and display as many games as possbile
- [ ] Retrieve public information about those games (to bring up what real gamers think about those games) -- this item could possibly be resolved with some youtube gameplay scrapping
- [ ] Retrieve the total amount of the game tasks, so the gamers could mark at what task or campaign they are at this moment and Checkpoint will calculate how many hours or percentage of the game are pending until the campaing is fully completed.
- [ ] Timeline: this feature will make Checkpoint look like a real social media. The timeline must have news about the games publishers or show what games the user friends are playing at this moment.

### About Checkpoint's stack

Checkpoint must be a simple app, so, its stack will be composed by:

- NextJs 14
- Tailwind
- Supabase
- Next UI
- Shadcn
- Vercel

## How to install

To install checkpoint you must follow some steps:

### Cloning the project

Start cloning the project by using the command:

```bash
git clone https://github.com/igorfelipeduca/checkpoint
```

### Installing the project dependencies:

This project was created using bun, so, you must use the command bellow to install this project dependencies:

```bash
bun install
```

Don't you have bun installed? [Click here](https://bun.sh/docs/installation)

### Cloning this project with Vercel

To clone this project and self-host at vercel, you must click at the button below and clone this project in your Vercel personal account.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/igorfelipeduca/checkpoint)

## Installing your own envs

### Creating the supabase project

First you must create your supabase project and set up the databases below:

#### users

```sql
create table
  public.users (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    name text null,
    email text null,
    avatar text null,
    constraint users_pkey primary key (id)
  ) tablespace pg_default;
```

#### users (RLS)

![users rls](/public/users-rls.png)

### Supabase envs

Pick up your `SUPABASE_URL` and `SUPABASE_ANON_KEY` to fill out the `.env` file.

### RAWG API

In order to generate your RAWG api key, visit the [RAWG](https://rawg.io/apidocs) website and click to generate your API key. Create your account and then fill out the `RAWG_API_KEY` at your `.env` file.
