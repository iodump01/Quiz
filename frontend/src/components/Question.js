import React from "react";

const Question = () => {
  return (
    <div className="container maindiv1 mt-5">
      <div className="container pt-3">
        <div className="row">
          <div className="col">
            <h5 className="questionh5">Quesion 1</h5>
          </div>
          <div className="col d-flex justify-content-end">
            <button type="button" className="btn marksbtn1">
              Marks : 10{" "}
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <h4 className="mainquestion">
            What is the full form of the MIM in Cyber Security ?{" "}
          </h4>
        </div>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="Enter your Answer here..."
            className="form-control mt-3"
          />
        </div>
        <div className=" mt-4">
          <button type="button" className="btn checkanswerbtn">
            Check Answer
          </button>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <button type="button" className="btn clearbtn">
                Clear
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button type="button" className="btn submitbtn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
