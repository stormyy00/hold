"use server";

import { authenticate } from "@/utils/auth";
import { db } from "../db";
import { folders, links } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { console } from "inspector";

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

export const getFolderByNameId = async (id: string) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  const result = await db
    .select({
      folderName: folders.name,
    })
    .from(folders)
    .where(and(eq(folders.id, id), eq(folders.userId, uid)))
    .execute();
  return {
    message: "Folder retrieved",
    status: 200,
    result,
  };
};

export const getFolderById = async (folderId: string) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  const result = await db
    .select()
    .from(links)
    .where(and(eq(links.folderId, folderId), eq(links.userId, uid)))
    .execute();

  return {
    message: "Links for folder retrieved",
    status: 200,
    result: result.map(({ id, folderId, title, url, domain, openedCount }) => {
      return {
        id,
        folderId,
        title,
        url,
        domain,
        openedCount,
      };
    }),
  };
};

export const moveLinkToFolder = async (linkId: string, folderId: string) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  console.log("Moving link to folder", linkId, folderId);
  await db
    .update(links)
    .set({ folderId })
    .where(and(eq(links.id, linkId), eq(links.userId, uid)))
    .execute();
  return {
    message: "Link moved to folder",
    status: 200,
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
    .execute();
  return {
    message: "Folder updated",
    status: 200,
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

  await db
    .update(links)
    .set({ folderId: null })
    .where(and(eq(links.folderId, id), eq(links.userId, uid)))
    .execute();
  await db
    .delete(folders)
    .where(and(eq(folders.id, id), eq(folders.userId, uid)))
    .execute();

  return {
    message: "Folder deleted",
    status: 200,
  };
};
