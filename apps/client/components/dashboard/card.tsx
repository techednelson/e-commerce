import React from 'react';
import Image from 'next/image';

interface ICard {
  src: string;
}

const Card = ({ src }: ICard) => (
  <div className="flex justify-center pt-8 pb-4">
    <div className="card w-60 bg-base-100 shadow-xl">
      <figure>
        <Image src={src} alt="shoes" width="190" height="190" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline btn-primary btn-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
