"use server";

import { authenticate } from "@/utils/auth";
import { db } from "../db";
import { folders, links } from "../db/schema";
import { and, asc, eq, sql } from "drizzle-orm";

// POST
export const AddLink = async (
  title: string,
  description: string,
  url: string,
  domain: string,
  folderId: string | null = null,
) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  console.time("AddLink");
  const [result] = await db
    .insert(links)
    .values({
      userId: uid,
      folderId,
      title,
      description,
      url,
      domain,
    })
    .returning();
  console.timeEnd("AddLink");
  return {
    message: "Link added",
    status: 200,
    result: [
      {
        id: result.id,
        title: result.title,
        url: result.url,
        domain: result.domain,
        openedCount: result.openedCount,
      },
    ],
  };
};

// GET
export const GetLinks = async () => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    throw new Error(`Authentication Error: ${message}`);
  }

  const result = await db
    .select({
      id: links.id,
      folderId: links.folderId,
      folderName: folders.name,
      title: links.title,
      url: links.url,
      domain: links.domain,
      openedCount: links.openedCount,
    })
    .from(links)
    .leftJoin(folders, eq(links.folderId, folders.id))
    .where(and(eq(links.userId, uid)))
    .orderBy(asc(links.createdAt));

  return {
    message: "Links retrieved",
    status: 200,
    result: result.map(
      ({ id, folderId, folderName, title, url, domain, openedCount }) => {
        return {
          id,
          folderId,
          folderName,
          title,
          url,
          domain,
          openedCount,
        };
      },
    ),
  };
};

// UPFATE
export const updateLink = async (
  id: string,
  title: string,
  description: string,
  url: string,
  domain: string,
) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  console.time("updateLink");
  await db
    .update(links)
    .set({
      title,
      description,
      url,
      domain,
    })
    .where(eq(links.id, id))
    .execute();
  console.timeEnd("updateLink");

  return {
    message: "Link updated",
    status: 200,
  };
};

// UPDATE
export const updateLinkCount = async (id: string) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  const [openedCount] = await db
    .update(links)
    .set({
      openedCount: sql`${links.openedCount} + 1`,
    })
    .where(eq(links.id, id))
    .returning({ openedCount: links.openedCount });

  return {
    message: "Count updated",
    status: 200,
    result: openedCount,
  };
};

// DELETE
export const deleteLink = async (id: string) => {
  const { uid, message, auth } = await authenticate();
  if (auth !== 200 || !uid) {
    return {
      message: `Authentication Error: ${message}`,
      status: auth,
    };
  }
  console.time("deleteLink");
  const [result] = await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, uid)))
    .returning();
  console.timeEnd("deleteLink");
  console.log(result);
  return {
    message: "Link deleted",
    status: 200,
    result,
  };
};
