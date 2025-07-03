import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddFolder,
  deleteFolder,
  moveLinkToFolder,
  updateFolder,
} from "../queries/folder";

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

export const useMoveLinkToFolderMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({
      linkId,
      folderId,
    }: {
      linkId: string;
      folderId: string;
    }) => {
      return await moveLinkToFolder(linkId, folderId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error) => {
      console.error("Error moving link to folder:", error);
    },
  });
};

export const useUpdateFolderMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      return await updateFolder(name, id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error) => {
      console.error("Error updating folder:", error);
    },
  });
};

export const useDeleteFolderMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteFolder(id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error) => {
      console.error("Error deleting folder:", error);
    },
  });
};
