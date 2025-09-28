export interface INoti {
  id: string;
  title: string;
  body: string;
  sendAt: Date;
  isRead: boolean;
}

export interface INotiStatistic {
  unread: number;
}
