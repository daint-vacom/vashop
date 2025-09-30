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
    path: ROUTE_PATHS.ORDER_MANAGEMENT,
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
      { title: 'Đối tác', path: ROUTE_PATHS.CATEGORIES.PARTNER },
      { title: 'Nhóm đối tác', path: ROUTE_PATHS.CATEGORIES.PARTNER_GROUP },
      { title: 'Nhân viên', path: ROUTE_PATHS.CATEGORIES.EMPLOYEE },
      { title: 'Nhóm hàng', path: ROUTE_PATHS.CATEGORIES.PRODUCT_GROUP },
      { title: 'Tài khoản ngân hàng', path: ROUTE_PATHS.CATEGORIES.BANK },
      { title: 'Phòng ban', path: ROUTE_PATHS.CATEGORIES.DEPARTMENT },
      { title: 'Kho Hàng', path: ROUTE_PATHS.CATEGORIES.WAREHOUSE },
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
