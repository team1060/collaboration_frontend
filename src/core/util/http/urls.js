export const API_URL = {
  // MEMBER-REST
  SIGNUP: "/member/insert",
  SIGNIN: "/member/login",
  LOGOUT: "/member/logout",
  REFRESH_TOKEN: "/member/refresh",

  // CATEGORY-REST
  CATEGORY_INSERT: "/category/insert",

  // BOARD-REST
  BOARD_QNA_INSERT: "/board/QnaInsert",
  BOARD_NOTICE_INSERT: "/board/Noticeinsert",

  // CATEGORY-VIEW
  CATEGORY_GET: (categoryNo) => `/category/${categoryNo}`,
  CATEGORY_PARENT_GET: (categoryNo) => `/category/parentNo/${categoryNo}`,
  CATEGORY_LIST_GET: "/category/list",
  CATEGORY_LIST_DETAILS_GET: (categoryNo) => `/board/category/${categoryNo}`,

  // BOARD-VIEW
  BOARD_LIST_GET: "/board/list",
  BOARD_CATEGORY_GET: (categoryNo) => `/board/category/${categoryNo}`,
  BOARD_LIST_BOARDNO_GET: (boardNo) => `board/list/${boardNo}`,

  // RESERVE_GET: (email) => `/reservation/confirm/${email}`,
  // RESERVE_POST: "/reservation/detail",
  // RESERVE_CANCLE_POST: (reserve_no) => `/reservation/cancel/${reserve_no}`,
  // RESERVE_CANCLE_GET: (email) => `reservation/confirm/cancel/${email}`,
  // COURSE_LIST_GET: "/admin/course",
  // COURSE_POST: "/admin/course",
  // COURSE_PUT: (course_no) => `/admin/course/${course_no}`,
  // COURSE_DELETE: (course_no) => `/admin/course/${course_no}`,
  // COURSE_GET: (course_no) => `/admin/course/${course_no}`,
  // GOLF_LIST_GET: "/admin/golf",
  // GOLF_GET: (golf_no) => `/golf/${golf_no}`,
  // GOLF_REGION_GET: (region) => `/golf/info/${region}`,
  // MEMBER_LIST_GET: "/member/join",
  // MEMBER_POST: "/member/join",
  // MEMBER_PUT: (email) => `/member/admin/memberupdate/${email}`,
  // MEMBER_DELETE: (email) => `/member/${email}`,
  // MYPAGE_SIGNIN: "/member/mypage/login",
  // NICKNAME_GET: (email) => `/member/getEmail/${email}`,
  // NICKNAME_PUT: "/member/mypage/modify",
  // MEMBER_SEND: "member/find",
  // PW_SUBMIT: "/member/login/email",
  // PW_SEND: "/member/modify/pw",
  // PW_PUT: "/member/mypage/modify",
  // IS_ADMIN: (email) => `/member/isAdmin?email=${email}`,
  // DEL_MEMBER_GET: "/member/deljoin",
  // EMAIL_SUBMIT: "/member/login/email",
  // EMAIL_GET: "/member/join/login/email",
  // AUTH_PUT: (email) => `/member/permissions/${email}`,
  // PRODUCT_LIST_GET: "/product",
  // PRODUCT_GET: (product_no) => `/products/${product_no}`,
  // PRODUCT_POST: "/api/admin/products/insert",
  // PRODUCT_PUT: (product_no) => `/admin/products/${product_no}`,
  // PRODUCT_DELETE: (product_no) => `/product/${product_no}`,
  // BRAND_GET: "/brand",
  // PAYMENT_LIST_GET: "/payment/paymentByMember",
  // PAYMENT_LIST_COUNT_GET: "/payment/paymentByMemberCount",
};

/** 토큰 필요없는 URL */
export const HEADER_NOT_REQUIRED_URLS = [API_URL.SIGNIN, API_URL.SIGNUP];

/** FormData로 전송 필요한 URL */
export const FORM_DATA_REQUIRED_URLS = [
  API_URL.BOARD_QNA_INSERT,
  // API_URL.PRODUCT_POST,
  // API_URL.PRODUCT_PUT,
];
