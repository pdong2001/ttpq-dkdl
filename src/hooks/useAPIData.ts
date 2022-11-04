import { useEffect } from 'react';
import { APIError, APIStatus, RequestData } from '~/apis/common/type';
import { UnhandledError } from '~/apis/common/constant';

const useAPIData = <DataType>(
  response: RequestData,
  handlers: {
    onFullfilled?: (data: DataType) => void;
    onRejected?: (error: APIError) => void;
    onPending?: () => void;
  },
) => {
  const { onFullfilled, onPending, onRejected } = handlers;

  useEffect(() => {
    if (response.status === APIStatus.FULLFILLED && onFullfilled) {
      onFullfilled(response.data!);
    }
    if (response.status === APIStatus.REJECTED && onRejected) {
      onRejected(response.error || UnhandledError);
    }
    if (response.status === APIStatus.PENDING && onPending) {
      onPending();
    }
  }, [response.status, response.data, response.error, onFullfilled, onPending, onRejected]);
};

export default useAPIData;
