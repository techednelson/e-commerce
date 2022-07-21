import React from 'react';
import Image from 'next/image';

interface ICard {
  src: string;
  name: string;
  price: number;
}

const Card = ({ src, name, price }: ICard) => (
  <div className="flex justify-center pt-8 pb-4">
    <div className="card w-60 bg-base-100 shadow-xl">
      <figure>
        <Image src={src} alt="shoes" width="190" height="190" />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-baseline">
          <div>
            <p className="font-semibold">{name}</p>
          </div>
          <div>
            <p>${price}</p>
          </div>
        </div>
        <div className="card-actions justify-end mt-1">
          <button className="btn btn-outline btn-primary btn-xs">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
