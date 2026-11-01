// Preloaded with NODE_OPTIONS by scripts/test-timezones.mjs. Windows ignores the TZ variable at
// startup, but honours it when it is assigned inside the process; child processes inherit both.
if (process.env.OPALE_TZ) process.env.TZ = process.env.OPALE_TZ;
