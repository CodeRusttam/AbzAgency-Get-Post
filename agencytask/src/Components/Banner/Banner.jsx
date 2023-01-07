import React from "react";
function Banner() {
  return (
    <div
      className="h-[580px] flex justify-center custom-image bg-cover object-cover bg-center md: items-center"
    >
      <div className="p-10 flex flex-col items-center text-center" style={{width: '380px'}}>
        <h1
          className="font-normal text-4xl mb-5"
          style={{ color: "rgba(255, 255, 255, 1)"}}
        >
          Test assignment for front-end developer
        </h1>
        <p
          className="text-base font-normal mb-6 opacity-70"
          style={{ color: "rgba(255, 255, 255, 1)" }}
        >
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button className="btn">Sign Up</button>
      </div>
    </div>
  );
}

export default Banner;
