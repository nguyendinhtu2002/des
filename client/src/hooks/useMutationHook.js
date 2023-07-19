import { useMutation } from "react-query";

export const useMutationHooks = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        return await fnCallback(data);
      } catch (error) {
        throw new Error("Failed to perform mutation");
       
      }
    },
  });
  return mutation;
};
