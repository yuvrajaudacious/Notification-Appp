import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loginApi,
  addUser,
  addNotification,
  getNotification,
  isReadNotification,
  isDeleteNotification,
  isReadAllNotification,
} from "../../services/services";

// export const useLoginApi = (data: object) => {
//   return useQuery(["login"], () => loginApi(data));
// };

export const useLoginAuth = () => {
  const queryClient = useQueryClient();
  return useMutation(loginApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Login"]);
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["addUser"]);
    },
  });
};

export const useAddNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(addNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(["addNotification"]);
    },
  });
};
export const useIsReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(isReadNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(["isReadNotification"]);
    },
  });
};

export const useIsReadAllNotification = () => {
  return useQuery(["readAllNotification"], isReadAllNotification);
};

export const useGetNotification = (params: object) => {
  return useQuery(["notification"], getNotification, params);
};



export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(isDeleteNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Delete"]);
    },
  });
};