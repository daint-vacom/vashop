// import { INoti } from '@/features/notification/models/noti.model';
// import ReactMarkdown from 'react-markdown';
// import { displayDateTime } from '@/lib/date';
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
//   AvatarIndicator,
//   AvatarStatus,
// } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';

// interface Props {
//   data: INoti;
// }

// export function NotiItem({ data }: Props) {
//   return (
//     <div className="flex grow gap-2.5 px-5 pb-5 border-b border-b-border">
//       <Avatar>
//         <AvatarImage src={`/media/avatars/300-1.png`} alt="avatar" />
//         <AvatarFallback>CH</AvatarFallback>
//         <AvatarIndicator className="-end-1.5 -bottom-1.5">
//           <AvatarStatus variant="online" className="size-2.5" />
//         </AvatarIndicator>
//       </Avatar>
//       <div className="flex flex-col gap-3.5">
//         <div className="flex flex-col gap-1">
//           <div className="text-sm font-medium text-mono">
//             {data.title}
//             {!data.isRead && (
//               <Badge variant="primary" appearance="outline" className="ml-2.5">
//                 Mới
//               </Badge>
//             )}
//           </div>

//           <span className="flex items-center text-xs font-medium text-muted-foreground">
//             {displayDateTime(data.sendAt)}
//             {/* <span className="rounded-full size-1 bg-mono/30 mx-1.5"></span> */}
//           </span>
//         </div>
//         <div className="prose font-normal text-secondary-foreground text-sm">
//           <ReactMarkdown>{data.body}</ReactMarkdown>
//         </div>
//       </div>
//     </div>
//   );
// }
