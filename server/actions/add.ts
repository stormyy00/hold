import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddLink,
  deleteLink,
  updateLink,
  updateLinkCount,
} from "../queries/getLinks";
import { AddFolder } from "../queries/folder";

export const useAddLinkMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      link,
      folderId,
    }: {
      title: string;
      link: string;
      folderId?: string;
    }) => {
      const domain = new URL(link).hostname.replace(/^www\./, "");
      return await AddLink(title, "", link, domain, folderId ?? null);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error) => {
      console.error("Error adding link:", error);
    },
  });
};

export const useUpdateCountMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await updateLinkCount(id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error) => {
      console.error("Failed to update link count:", error);
    },
  });
};

export const useAddFolderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      return await AddFolder(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error) => {
      console.error("Error adding folder:", error);
    },
  });
};

export const useUpdateLinkMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      link,
    }: {
      id: string;
      title: string;
      link: string;
    }) => {
      const domain = new URL(link).hostname.replace(/^www\./, "");
      return await updateLink(id, title, "", link, domain);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error) => {
      console.error("Error updating link:", error);
    },
  });
};

export const useDeleteLinkMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteLink(id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error) => {
      console.error("Error deleting link:", error);
    },
  });
};
