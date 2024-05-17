## Replay On-Call Robot Scheduler

This repo holds the code to schedule on-call cycles. The backend on-call calendar ID is hard-coded into the script, and the `credentials.json` is stored in 1Password.

## Running

Make sure to update the start date in the script, and then run:

```
npx ts-node index.ts
```

If you have never run this before and you have properly copied in the `credentials.json` then you will be asked to auth with Google. Then the script should just run and create the events.
