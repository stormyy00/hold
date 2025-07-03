// import { useInfiniteQuery } from "@tanstack/react-query";

// export const useLinks = () =>
//   useInfiniteQuery({
//     queryKey: ["links"],
//     queryFn: async ({ pageParam }) => {
//       const res = await fetch(`/api/links?cursor=${pageParam ?? ""}`);
//       if (!res.ok) throw new Error("Failed to load links");
//       return res.json();
//     },
//     initialPageParam: undefined as number | undefined,
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     refetchOnWindowFocus: false,
//   });

import { useQuery } from "@tanstack/react-query";
import { GetLinks } from "@/server/queries/getLinks";
import { getFolders } from "../queries/folder";

export const useLinks = () => {
  return useQuery({
    queryKey: ["links"],
    queryFn: async () => await GetLinks(),
    select: (data) => data.result,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useFolders = () => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: async () => await getFolders(),
    select: (data) => data.result,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
