
function CleanContent({ content, classNames }: { content: any; classNames: string|null }) {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: content }}
      className={classNames || "des"}
    ></p>
  );
}

export default CleanContent;
