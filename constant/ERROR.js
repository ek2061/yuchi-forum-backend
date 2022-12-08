export const ERROR = {
  InfoIncomplete: {
    statusCode: 400,
    msg: "請求的欄位不全",
  },
  ServerError: {
    statusCode: 500,
    msg: "伺服器發生錯誤",
  },
  PostNotExist: {
    statusCode: 404,
    msg: "貼文不存在",
  },
  CommentNotExist: {
    statusCode: 404,
    msg: "評論不存在",
  },
  UserAlreadyExist: {
    statusCode: 409,
    msg: "使用者帳戸已存在",
  },
  UserNotExist: {
    statusCode: 404,
    msg: "使用者帳戸不存在",
  },
  PasswordError: {
    statusCode: 400,
    msg: "密碼錯誤",
  },
};
