export const ROUTE_PATHS = {
  HOME: '/',

  EMPLOYEE_MANAGEMENT: '/quan-ly-nhan-su',

  EMPLOYEE_DETAIL: (employeeCode: string = ':employeeCode') =>
    `/quan-ly-nhan-su/${employeeCode}`,

  YEAR_PLAN: '/quan-ly-ke-hoach-nam',

  YEAR_PLAN_DETAIL: (planId: string = ':planId') =>
    `/quan-ly-ke-hoach-nam/${planId}`,

  YEAR_PLAN_ADMIN_DEPARTMENT_DETAIL: (
    planId: string = ':planId',
    departmentId: string = ':departmentId',
  ) => `/quan-ly-ke-hoach-nam/${planId}/phong-ban/${departmentId}`,

  YEAR_PLAN_ADMIN_EXAM_DETAIL_DEPARTMENT: (
    planId: string = ':planId',
    departmentId: string = ':departmentId',
    examId: string = ':examId',
  ) =>
    `/quan-ly-ke-hoach-nam/${planId}/phong-ban/${departmentId}/ky-thi/${examId}`,

  YEAR_PLAN_EXAM_DETAIL_ADMIN: (
    planId: string = ':planId',
    round: string = ':round',
    type: string = ':type',
  ) => {
    if (round === ':round' && type === ':type')
      return `/quan-ly-ke-hoach-nam/${planId}/tong-hop/ky-thi`;

    const params = new URLSearchParams();
    if (round) params.set('round', round);
    if (type) params.set('type', type);

    return `/quan-ly-ke-hoach-nam/${planId}/tong-hop/ky-thi/${params.toString() ? `?${params.toString()}` : ''}`;
  },

  YEAR_PLAN_EXAM_DETAIL_DEPARTMENT: (
    planId: string = ':planId',
    examId: string = ':examId',
  ) => `/quan-ly-ke-hoach-nam/${planId}/ky-thi/${examId}`,

  EXAM: '/quan-ly-ky-thi',

  EXAM_PLAN: '/quan-ly-ky-thi/ke-hoach',

  EXAM_PLAN_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-ky-thi/ke-hoach/${examId}`,

  EXAM_REGISTRATION: '/quan-ly-ky-thi/dang-ky',

  EXAM_REGISTRATION_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-ky-thi/dang-ky/${examId}`,

  EXAM_REVIEW: '/quan-ly-ky-thi/ra-soat',

  EXAM_REVIEW_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-ky-thi/ra-soat/${examId}`,

  EXAM_REVIEW_DEPARTMENT_DETAIL: ({
    examId = ':examId',
    departmentId = ':departmentId',
  }: {
    examId?: string;
    departmentId?: string;
  } = {}) => `/quan-ly-ky-thi/ra-soat/${examId}/phong-ban/${departmentId}`,

  EXAM_APPROVED: '/quan-ly-ky-thi/phe-duyet',

  EXAM_APPROVED_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-ky-thi/phe-duyet/${examId}`,

  TOPIC: '/quan-ly-de-tai',

  TOPIC_REGISTRATION: '/quan-ly-de-tai/dang-ky',

  TOPIC_REGISTRATION_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-de-tai/dang-ky/${examId}`,

  TOPIC_REVIEW: '/quan-ly-de-tai/ra-soat',

  TOPIC_REVIEW_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-de-tai/ra-soat/${examId}`,

  TOPIC_REVIEW_DEPARTMENT_DETAIL: ({
    examId = ':examId',
    departmentId = ':departmentId',
  }: {
    examId?: string;
    departmentId?: string;
  } = {}) => `/quan-ly-de-tai/ra-soat/${examId}/phong-ban/${departmentId}`,

  TOPIC_APPROVED: '/quan-ly-de-tai/phe-duyet',

  TOPIC_APPROVED_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-de-tai/phe-duyet/${examId}`,

  EDUCATION: '/quan-ly-dao-tao',

  EDUCATION_RESULT: '/quan-ly-dao-tao/ket-qua',

  EDUCATION_RESULT_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-dao-tao/ket-qua/${examId}`,

  EXAM_SCHEDULE: '/quan-ly-ky-thi/lich-thi',

  EXAM_SCHEDULE_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-ky-thi/lich-thi/${examId}`,

  EXAM_RESULT: '/quan-ly-ky-thi/ket-qua',

  EXAM_RESULT_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-ky-thi/ket-qua/${examId}`,

  EXAM_DECISION: '/quan-ly-ky-thi/quyet-dinh',

  EXAM_DECISION_DETAIL: (examId: string = ':examId') =>
    `/quan-ly-ky-thi/quyet-dinh/${examId}`,

  SYSTEM: '/he-thong',
  SYSTEM_DEPARTMENT_LIST: '/he-thong/phong-ban',
  SYSTEM_POSITION_LIST: '/he-thong/chuc-danh',
  SYSTEM_AREA_LIST: '/he-thong/chuyen-mon',
  SYSTEM_PAYROLL_LIST: '/he-thong/bang-luong',

  AUTH: '/auth',
  ERROR: '/error',
  ERROR_404: '/error/404',

  CHANGE_PASSWORD: '/change-password',
} as const;
