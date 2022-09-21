import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCards = ({ numOfCards }) => {

    return (
        <div className="cards">
            <SkeletonTheme>
                {[...Array(numOfCards)].map(element => (
                    <div className="card">
                        <Skeleton className="card-img" borderRadius="1.6rem 1.6rem 0 0"/>
                        <Skeleton 
                            borderRadius="3.2rem"
                            baseColor="#cccccc"
                            height="3.2rem"
                            width="7rem"
                            className="card-discount-skeleton game-discount-percentage" />
                        <div className="card-content-skeleton">
                            <Skeleton width="40%" />
                            <Skeleton width="60%" />
                        </div>    
                    </div>
                ))}
            </SkeletonTheme>
        </div>
    )
}

export default SkeletonCards;
