"use server";

import { authenticate } from "@/utils/auth";
import { db } from "../db";
import { folders } from "../db/schema";
import { and, eq } from "drizzle-orm";

export const AddFolder = async (name: string) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  await db
    .insert(folders)
    .values({
      userId: uid,
      name,
    })
    .execute();
  return {
    message: "Folder Created",
    status: 200,
  };
};

export const getFolders = async () => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  const result = await db
    .select()
    .from(folders)
    .where(eq(folders.userId, uid))
    .execute();
  return {
    message: "Folders retrieved",
    status: 200,
    result,
  };
};

export const updateFolder = async (id: string, name: string) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  const result = await db
    .update(folders)
    .set({ name })
    .where(and(eq(folders.id, id), eq(folders.userId, uid)))
    .returning();
  return {
    message: "Folder updated",
    status: 200,
    result,
  };
};

export const deleteFolder = async (id: string) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  const result = await db
    .delete(folders)
    .where(and(eq(folders.id, id), eq(folders.userId, uid)))
    .returning();
  return {
    message: "Folder deleted",
    status: 200,
    result,
  };
};
