import React from "react";
import "../styles/card.css";

const Card = (promps) => {
  const colorRecibido = promps.color;
  let color;
  if (colorRecibido == "GOLD") {
    color = "bg-[url('/public/goldCard.jpg')] bg-cover bg-center";
  } else if (colorRecibido == "TITANIUM") {
    color =
      "bg-[url('https://i.pinimg.com/originals/40/c8/78/40c87825702a67b2d462d57fc4d60d91.jpg')] bg-cover bg-center";
  } else if (colorRecibido == "BLACK") {
    color = "bg-[url('/public/cardBlack.jpg')] bg-cover bg-center";
  }else if(colorRecibido == "SILVER"){
    color = "bg-[url('https://media.istockphoto.com/id/679479658/photo/silver-foil-texture-background.jpg?s=612x612&w=0&k=20&c=8M_Mo9Ig_OFsr4wTFtfZq8KziQYewrQEtuMCk250N7A=')] bg-cover bg-center";
  }

  return (
    <div className="perspective-1000">
      <div
        className={`Card w-[338px] h-48 p-4 text-2xl rounded-2xl flex flex-col justify-between ${color} ${
          colorRecibido === "BLACK" || colorRecibido === "TITANIUM"
            ? "text-white"
            : "text-black"
        } card relative`}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-4 card-front rounded-2xl">
          <div className="flex justify-between">
            <img src="/public/chip.jpg" alt="" className="chip w-14" />
            <h2 className="text-sm">{promps.type} CARD </h2>
          </div>
          <p>{promps.number}</p>
          <p className="text-sm">{promps.number.slice(-4)} </p>
          <div className="flex items-center justify-between">
            <p>{promps.name} </p>
            <p className="text-sm">
              VALID {promps.expiration.slice(5, 7)}/
              {promps.expiration.slice(8, 10)}
            </p>
          </div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-between py-4  card-back rounded-2xl">
          <div className={` bg-black w-full h-10 ${colorRecibido == "BLACK" ? "border-white border" : "border-black" }`}></div>
          <div className="flex items-center ">
            <p className="w-full mx-5 text-black bg-white text-end">
              CVV {promps.cvv}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;