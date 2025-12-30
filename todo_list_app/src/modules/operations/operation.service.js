import { BASE_URL } from "../../config/constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";



export const useGetTask = (token) => {
    return useQuery({
        queryKey: ['get-tasks'],
        queryFn: async () => {
            const res = await axios.get(`${BASE_URL}/task/get`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(res.data);

            return res?.data
        }
    })
}

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const res = await axios.post(`${BASE_URL}/task/create`, data)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-tasks'] })
        }
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id, priority) => {
            console.log("this is from service:", data);

            const res = await axios.put(`${BASE_URL}/task/update/${id}`)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-tasks'] })
        }

    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            console.log("id in service page:", id);

            const res = await axios.delete(`${BASE_URL}/task/delete/${id}`)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-tasks'] })
        }

    })
}

export const useGetSingleTask = (id) => {
console.log("this is the id from service page:",id);

    return useQuery({
        queryKey: ['single-task',id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axios.get(`${BASE_URL}/task/get/${id}`)
            return res?.data?.data
        }
    })
}