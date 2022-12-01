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
};
