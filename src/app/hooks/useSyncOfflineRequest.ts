import { useEffect } from 'react';
import { getRequests, clearRequests } from '../utils/localStorageUtil';
import axiosApi from '../../axiosApi';

const useSyncOfflineRequests = () => {
  useEffect(() => {
    const syncRequests = async () => {
      if (navigator.onLine) {
        const requests = getRequests();
        for (const request of requests) {
          try {
            await axiosApi.post('/orders.json', request.data);
          } catch (error) {
            console.error('Error syncing request:', error);
          }
        }
        clearRequests();
      }
    };

    window.addEventListener('online', syncRequests);

    syncRequests();

    return () => {
      window.removeEventListener('online', syncRequests);
    };
  }, []);
};

export default useSyncOfflineRequests;
