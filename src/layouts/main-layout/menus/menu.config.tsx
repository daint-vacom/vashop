import { ROUTE_PATHS } from '@/routing/paths';
import {
  CalendarFold,
  Database,
  GraduationCap,
  House,
  LandPlot,
  NotepadText,
  Trophy,
  User,
} from 'lucide-react';
import { type MenuConfig } from '../../../config/types';

export const MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Trang Chủ',
    icon: House,
    path: ROUTE_PATHS.HOME,
  },
  {
    title: 'Nhân Sự',
    icon: User,
    path: ROUTE_PATHS.EMPLOYEE_MANAGEMENT,
  },
  {
    title: 'Kế Hoạch Năm',
    icon: CalendarFold,
    path: ROUTE_PATHS.YEAR_PLAN,
  },
  {
    title: 'Kỳ Thi',
    icon: Trophy,
    children: [
      { title: 'Kế Hoạch', path: ROUTE_PATHS.EXAM_PLAN },
      { title: 'Đăng Ký', path: ROUTE_PATHS.EXAM_REGISTRATION },
      { title: 'Rà Soát', path: ROUTE_PATHS.EXAM_REVIEW },
      { title: 'Phê Duyệt', path: ROUTE_PATHS.EXAM_APPROVED },
    ],
  },
  {
    title: 'Đề Tài',
    icon: NotepadText,
    children: [
      { title: 'Đăng Ký', path: ROUTE_PATHS.TOPIC_REGISTRATION },
      { title: 'Rà Soát' },
      { title: 'Phê Duyệt', path: ROUTE_PATHS.TOPIC_APPROVED },
    ],
  },
  {
    title: 'Đào Tạo',
    icon: GraduationCap,
    children: [
      { title: 'Kết Quả Bồi Huấn', path: ROUTE_PATHS.EDUCATION_RESULT },
    ],
  },
  {
    title: 'Tổ Chức Thi',
    icon: LandPlot,
    children: [
      { title: 'Lịch Thi', path: ROUTE_PATHS.EXAM_SCHEDULE },
      { title: 'Kết Quả', path: ROUTE_PATHS.EXAM_RESULT },
      { title: 'Quyết Định', path: ROUTE_PATHS.EXAM_DECISION },
    ],
  },
  {
    title: 'Hệ Thống',
    icon: Database,
    children: [
      {
        title: 'Phòng Ban - Tổ/Nhóm',
        path: ROUTE_PATHS.SYSTEM_DEPARTMENT_LIST,
      },
      { title: 'Chức Danh', path: ROUTE_PATHS.SYSTEM_POSITION_LIST },
      { title: 'Chuyên Môn', path: ROUTE_PATHS.SYSTEM_AREA_LIST },
      { title: 'Lương', path: ROUTE_PATHS.SYSTEM_PAYROLL_LIST },
    ],
  },
];
