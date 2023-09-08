import { getDb } from "./db";

// noinspection JSUnusedGlobalSymbols
export const up = async () => {
  const _db = await getDb();
  /*
      Code your update script here!
   */
};

export const down = async () => {
  const db = await getDb();
  /*
      Code you downgrade script here!
   */
};