

import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";


function ShareIcon({ children, type, title }) {

  const url = typeof window !== "undefined" ? window.location.href : "";

  let shareButton: any;
  switch (type) {
    case "facebook":
      shareButton = (
        <FacebookShareButton url={url} title={title}>
          {children}
        </FacebookShareButton>
      );
      break;

    case "twitter":
      shareButton = (
        <TwitterShareButton url={url} title={title}>
          {children}
        </TwitterShareButton>
      );
      break;

    case "whatsapp":
      shareButton = (
        <WhatsappShareButton url={url} title={title}>
          {children}
        </WhatsappShareButton>
      );
      break;
    case "linkedin":
      shareButton = (
        <LinkedinShareButton url={url} title={title}>
          {children}
        </LinkedinShareButton>
      );
      break;
    case "telegram":
      shareButton = (
        <TelegramShareButton url={url} title={title}>
          {children}
        </TelegramShareButton>
      );
      break;

    default:
      shareButton = null;
  }

  return shareButton;
}

export default ShareIcon;
