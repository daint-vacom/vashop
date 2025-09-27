// import { ReactNode, useRef } from 'react';
// import { toAbsoluteUrl } from '@/lib/helpers';
// import { cn } from '@/lib/utils';
// import { useNoti } from '@/providers/noti-provider';
// import {
//   Sheet,
//   SheetBody,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet';
// import { NotiItem } from '../../../../partials/notifications/noti-item';

// export function NotificationsSheet({ trigger }: { trigger: ReactNode }) {
//   const {
//     notis,
//     resetStatistics,
//     fetchNotifications,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     resetFetchNotifications,
//   } = useNoti();
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const handleScroll = () => {
//     if (!scrollRef.current) return;
//     const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 100 &&
//       hasNextPage &&
//       !isFetchingNextPage
//     ) {
//       fetchNextPage();
//     }
//   };

//   return (
//     <Sheet
//       onOpenChange={(open) => {
//         if (open) {
//           fetchNotifications();
//         } else {
//           resetStatistics();
//           resetFetchNotifications();
//         }
//       }}
//     >
//       <SheetTrigger asChild>{trigger}</SheetTrigger>
//       <SheetContent className="p-0 gap-0 sm:w-[500px] inset-5 start-auto h-sheet flex flex-col rounded-lg sm:max-w-none [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
//         <SheetHeader className="mb-0">
//           <SheetTitle className="flex px-5 py-3 gap-x-4 items-center">
//             <span>Thông Báo</span>
//             {/* <span className="text-secondary-foreground text-sm font-normal">
//               {notis.length} tin nhắn
//             </span> */}
//           </SheetTitle>
//         </SheetHeader>
//         <SheetBody
//           className={cn(
//             'p-0 border-t border-border',
//             notis.length > 0
//               ? 'grow h-0'
//               : 'flex h-full w-full items-center justify-center pb-12',
//           )}
//         >
//           {notis.length > 0 ? (
//             <div
//               ref={scrollRef}
//               onScroll={handleScroll}
//               className="overflow-y-auto h-full"
//             >
//               <div className="flex flex-col gap-5 py-5">
//                 {notis?.map((item) => (
//                   <NotiItem key={item.id} data={item} />
//                 ))}
//                 {notis.length > 0 && !hasNextPage && (
//                   <div className="text-center text-muted-foreground py-1">
//                     Không còn thông báo nào khác.
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col justify-center gap-y-5 font-medium text-muted-foreground">
//               <img
//                 src={toAbsoluteUrl(
//                   '/media/illustrations/empty-states/empty-notifications.svg',
//                 )}
//                 className="max-h-illustration"
//                 alt="image"
//               />
//               <div>Bạn chưa có thông báo nào cả!</div>
//             </div>
//           )}
//         </SheetBody>
//       </SheetContent>
//     </Sheet>
//   );
// }
