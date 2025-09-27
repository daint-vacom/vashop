// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useAuth } from '@/auth/context/auth-context';
// import { INoti, INotiStatistic } from '@/models/noti.model';
// import { initMessaging, messaging } from '@/utilities/firebase';
// import { onMessage } from 'firebase/messaging';
// import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
// // import {
// //   getNotisApi,
// //   getNotiStatisticsApi,
// // } from '@/services/notification.service';

// const NotiContext = createContext<{
//   notis: INoti[];
//   statistics: INotiStatistic;
//   resetStatistics: () => void;
//   fetchNotifications: () => void;
//   fetchNextPage: () => void;
//   hasNextPage: boolean | undefined;
//   isFetchingNextPage: boolean;
//   onFirebaseMessage: () => void;
//   resetFetchNotifications: () => void;
// } | null>(null);

// function FirebaseMessageHandler({
//   onMessage: handleMessage,
// }: {
//   onMessage: () => void;
// }) {
//   useEffect(() => {
//     if (!messaging) return;
//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log('Message received: ', payload);
//       // Trigger statistics refetch when receiving Firebase message
//       handleMessage();
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [handleMessage, messaging]);

//   return null;
// }

// function NotiProvider({ children }: { children: React.ReactNode }) {
//   const queryClient = useQueryClient();
//   const [notis, setNotis] = useState<INoti[]>([]);
//   const [statistics, setStatistics] = useState<INotiStatistic>({ unread: 0 });
//   const [shouldFetchNotis, setShouldFetchNotis] = useState(false);

//   // Invalidate queries when employee changes
//   useEffect(() => {
//     if (employee) {
//       initMessaging();
//       queryClient.invalidateQueries(['notifications', employee.id]);
//       queryClient.invalidateQueries(['notifications/statistics', employee.id]);
//     }
//   }, [employee, queryClient]);

//   // Notifications list
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery<INoti[]>({
//       queryKey: ['notifications', employee?.id],
//       queryFn: ({ pageParam = 1 }) =>
//         getNotisApi({ page: pageParam, limit: 5 }),
//       getNextPageParam: (lastPage, pages) =>
//         lastPage.length === 5 ? pages.length + 1 : undefined,
//       retry: 0,
//       refetchOnWindowFocus: false,
//       enabled: !!employee && shouldFetchNotis,
//     });

//   // Statistics
//   const { data: notiStatistics } = useQuery<INotiStatistic>({
//     queryKey: ['notifications/statistics', employee?.id],
//     queryFn: getNotiStatisticsApi,
//     retry: 0,
//     refetchOnWindowFocus: false,
//     enabled: !!employee,
//   });

//   useEffect(() => {
//     if (data) setNotis(data.pages.flat());
//   }, [data]);

//   useEffect(() => {
//     if (notiStatistics) setStatistics(notiStatistics);
//   }, [notiStatistics]);

//   const resetStatistics = () => {
//     queryClient.invalidateQueries(['notifications/statistics', employee?.id]);
//   };

//   const fetchNotifications = () => {
//     if (notis.length === 0) {
//       setShouldFetchNotis(true);
//     } else {
//       fetchNextPage();
//     }
//   };

//   const resetFetchNotifications = () => {
//     setShouldFetchNotis(false);
//   };

//   const onFirebaseMessage = () => {
//     queryClient.invalidateQueries(['notifications/statistics', employee?.id]);
//     setNotis([]);
//   };

//   return (
//     <NotiContext.Provider
//       value={{
//         notis,
//         statistics,
//         resetStatistics,
//         fetchNotifications,
//         fetchNextPage,
//         hasNextPage,
//         isFetchingNextPage,
//         onFirebaseMessage,
//         resetFetchNotifications,
//       }}
//     >
//       <FirebaseMessageHandler onMessage={onFirebaseMessage} />
//       {children}
//     </NotiContext.Provider>
//   );
// }

// function useNoti() {
//   const ctx = useContext(NotiContext);
//   if (!ctx) {
//     throw new Error('useNoti phải được dùng trong NotiProvider');
//   }
//   return ctx;
// }

// export { NotiProvider, useNoti };
