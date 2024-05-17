## Replay On-Call Robot Scheduler

This repo holds the code to schedule on-call cycles. All interesting config options (team members, calendar ID, start date, number of weeks to schedule) are configured via `.env.local`, with examples in `.env.sample`. The `credentials.json` is stored in 1Password.

By default the script will assume that you want to start scheduling for the next upcoming Tuesday, unless otherwise specified.

## Running

Make sure to configure everything in `.env.local` and then run:

```
npx ts-node index.ts
```

If you have never run this before and you have properly copied in the `credentials.json` then you will be asked to auth with Google. Then the script should just run and create the events.

I highly recommend creating a test calendar to dry-run this. That way, if you accidentally create 100 bogus calendar events you can easily delete it and try again.
