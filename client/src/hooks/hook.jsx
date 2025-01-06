import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useErrors = (errors = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) fallback();
                else
                    toast.error(error?.data?.message || 'Something went wrong');
            }
        });
    }, [errors]);
};

/** 
 * @param {Function} mutationHook 
 * @returns {Array} [isLoading, data, mutate] 
 * @description Custom hook to handle async mutations
 * @unwrap() RTK Query ka special method hai jo promise return karta hai. Ye directly data access karne me help karta hai.
 * @example  WITHOUT UNWRAP() // RTK Query wraps response in this structure:
        // {
        //    data: { success: true, message: "..." },
        //    error: null,
        //    isLoading: false,
        //    ...other metadata
        // }
        // You can access the response data like this:
       // unwrap() directly gives you the response data:
        // { success: true, message: "..." }
 */
const useAsyncMutation = (mutationHook) => {
    const [isLoading, setIsLoding] = useState(false);
    const [data, setData] = useState(null);
    const [mutate] = mutationHook();
    const exectueMutation = async (toastMessage, args) => {
        setIsLoding(true);
        const toastId = toast.loading(toastMessage || 'Updating data...');

        try {
            const response = await mutate(args).unwrap();
            if (response) {
                toast.success(
                    response.message || 'Updated data successfully',
                    {
                        id: toastId,
                    }
                );
                setData(response);
            }
        } catch (error) {
          toast.error(error.data?.message || "Something went wrong", { id: toastId });
        }
        finally {
            setIsLoding(false);
        }
    };
    return [exectueMutation,isLoading,data];
};


const useSocketEvents = (socket, handlers) => {
    useEffect(() => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });
  
      return () => {
        Object.entries(handlers).forEach(([event, handler]) => {
          socket.off(event, handler);
        });
      };
    }, [socket, handlers]);
  };
export { useErrors, useAsyncMutation ,useSocketEvents};
