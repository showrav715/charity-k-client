
import avater from "/assets/images/comment_avater.jpg";
import { translate } from "@/helper/helper";

export default function BlogComments({ comments }) {
  return (
    <div
      className="ch-blog-comments-area"


    >
      <h4 className="comment-heading">
        {comments.length || 0} {translate("Comments On This Post")}
      </h4>

      <div className="comments-wrapper">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="single-comment"
          >
            <img
              src={avater}
              width={60}
              height={60}
              alt="comment image"
              className="comment-avatar"
            />
            <div className="contents-wrapper">
              <div className="top-area">
                <div className="user-infor-wrapper">
                  <h6>{comment.name}</h6>
                  <span className="date-text">{comment.api_date}</span>
                </div>
              </div>
              <p className="comments-reply">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
