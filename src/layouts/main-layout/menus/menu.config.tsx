import { ROUTE_PATHS } from '@/routing/paths';
import {
  Archive,
  BookCopy,
  CreditCard,
  Database,
  HandCoins,
  House,
  Logs,
  Package,
  ScrollText,
  Settings,
  Users,
} from 'lucide-react';
import { type MenuConfig } from '../../../config/types';

export const MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Trang Chủ',
    icon: House,
    path: ROUTE_PATHS.HOME,
  },
  {
    title: 'Danh Sách Đơn Hàng',
    icon: Logs,
  },
  {
    title: 'Hàng hóa & Dịch vụ',
    icon: Package,
  },
  {
    title: 'Giao dịch Kho',
    icon: Archive,
    children: [
      { title: 'Lập Phiếu Nhập Hàng' },
      { title: 'Hàng Bán Trả Lại' },
      { title: 'Trả Hàng Nhập' },
      { title: 'Lập Phiếu Chuyển Kho' },
      { title: 'Lập Phiếu Kiểm Kê' },
      { title: 'Lập Phiếu Xuất Kho' },
    ],
  },
  {
    title: 'Chứng từ',
    icon: BookCopy,
    children: [
      { title: 'Phiếu Thu Tiền Mặt' },
      { title: 'Phiếu Chi Tiền Mặt' },
      { title: 'Phiếu Thu Ngân Hàng' },
      { title: 'Phiếu Chi Ngân Hàng' },
      { title: 'Phiếu Khác' },
      { title: 'Nhận Hóa Đơn Điện Tử' },
    ],
  },
  {
    title: 'Danh mục',
    icon: Database,
    children: [
      { title: 'Đối tác' },
      { title: 'Nhóm đối tác' },
      { title: 'Nhân viên' },
      { title: 'Nhóm hàng' },
      { title: 'Ngân hàng' },
      { title: 'Phòng ban' },
      { title: 'Kho Hàng' },
    ],
  },
  {
    title: 'Số dư đầu kỳ',
    icon: HandCoins,
    children: [
      { title: 'Tiền mặt' },
      { title: 'Tiền gửi' },
      { title: 'Phải thu' },
      { title: 'Phải trả' },
      { title: 'Tồn kho' },
    ],
  },
  { title: 'Tài khoản', icon: Users },
  { title: 'Chi phí', icon: CreditCard },
  { title: 'Báo cáo', icon: ScrollText },
  { title: 'Cài đặt', icon: Settings },
];
