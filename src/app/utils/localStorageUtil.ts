const LOCAL_STORAGE_KEY = "offlineRequests";

interface OfflineRequest {
  id: string;
  data: any;
}

export const saveRequest = (request: OfflineRequest) => {
  const requests = getRequests();
  requests.push(request);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requests));
};

export const getRequests = (): OfflineRequest[] => {
  const requests = localStorage.getItem(LOCAL_STORAGE_KEY);
  return requests ? JSON.parse(requests) : [];
};

export const clearRequests = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
