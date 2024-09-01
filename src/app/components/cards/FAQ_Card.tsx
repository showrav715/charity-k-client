
const FAQ_Card = ({
  question,
  answer,
  id,
  removeFAQ_handler,
}: {
  question: string;
  answer: string;
  id: number;
  removeFAQ_handler: any;
}) => {
  return (
    <div className="flex relative items-start w-full gap-[20px]">
      <div className="flex flex-col w-full items-start gap-[16px]">
        {/* Question box */}
        <div className="  w-full">
          <input
            className="border rounded-[8px] border-auc-border-color outline-auc-primary-color py-[16px] px-[12px] w-full  h-full text-[18px] text-auc-text-color-900 font-medium leading-[160%]"
            type="text"
            defaultValue={question}
            autoComplete="off"
            name="specification-name"
            id="specification-name"
            placeholder="Specification Name"
          />
        </div>
        {/* Answer box */}
        <div className="  w-full">
          <textarea
            className=" py-[16px] px-[12px] rounded-[8px] border outline-auc-primary-color border-auc-border-color   w-full h-[90px] "
            autoComplete="off"
            name="productDescriptionBox"
            id="productDescriptionBox"
            defaultValue={answer}
            placeholder=""
          />
        </div>
      </div>
      {/* Delte Button  */}
      <div className="flex  max-768:absolute -top-[17px] -right-[10px] max-768:w-[30px] max-768:h-[30px]  items-center justify-center w-[60px] h-[60px]  bg-auc-white-smoke-color rounded-[8px]">
        <button className="WraperOfHoveredSvg flex items-center justify-center rounded-[8px] transition-all ease-in-out duration-300 hover:bg-auc-light-red-color w-full h-full min-768:p-[14px]" onClick={(e) => removeFAQ_handler(e, id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="#FF4E59"
              className="w-[32px] h-[32px] max-768:w-[16px] max-768:h-[16px]"
            >
              <path
                d="M22.668 5.33333V2.66667C22.668 1.95942 22.387 1.28115 21.8869 0.781049C21.3868 0.280952 20.7085 0 20.0013 0L12.0013 0C11.2941 0 10.6158 0.280952 10.1157 0.781049C9.61559 1.28115 9.33464 1.95942 9.33464 2.66667V5.33333H2.66797V8H5.33464V28C5.33464 29.0609 5.75606 30.0783 6.50621 30.8284C7.25635 31.5786 8.27377 32 9.33464 32H22.668C23.7288 32 24.7463 31.5786 25.4964 30.8284C26.2465 30.0783 26.668 29.0609 26.668 28V8H29.3346V5.33333H22.668ZM14.668 22.6667H12.0013V14.6667H14.668V22.6667ZM20.0013 22.6667H17.3346V14.6667H20.0013V22.6667ZM20.0013 5.33333H12.0013V2.66667H20.0013V5.33333Z"
                // fill="#FF4E59"
              />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default FAQ_Card;
