import React, { useEffect, useState } from "react";
import SkeletonCards from "../Skeleton/SkeletonCards";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const removeDuplicateData = (data) => {
    let unique = data.filter(({internalName}, index, arr) => index === arr.findIndex(element => element.internalName === internalName));

    return unique;
}

const fetchData = async () => {
    const url1 = "https://www.cheapshark.com/api/1.0/deals?AAA&metacritic=80&onSale=1&sortBy=recent";
    const url2 = "https://www.cheapshark.com/api/1.0/deals?AAA&metacritic=89&onSale=1&sortBy=Release";

    let responses = await Promise.all([fetch(url1), fetch(url2)]);

    // if (!responses.ok) {
    //     let message = `An error has ocurred: ${responses.status}`;
    //     throw new Error(message); 
    // }

    let latestDeals = await responses[0].json();
    let popularDeals = await responses[1].json();
    return { latest: latestDeals, popular: popularDeals };
}  


const Home = () => {
    const [latestDeals, setLatestDeals] = useState({ length: 0, games: [] });
    const [popularDeals, setPopularDeals] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const arrowPagination = data => {
        return { length: data.length, games: data.slice(currentIndex, currentIndex + 4) };
    }

    const previousPage = () => {
        if (currentIndex !== 0) {
            setCurrentIndex(previousIndex => previousIndex - 4);
        }
    }

    const nextPage = () => {
        if (currentIndex < (latestDeals.length - 4)) {
            setCurrentIndex(previousIndex => previousIndex + 4);
        }
    }

    useEffect(() => {
        let data = async () => {
            let res = await fetchData();
            let uniqueLatest = removeDuplicateData(res.latest);
            let uniquePopular = removeDuplicateData(res.popular);
            setLatestDeals(arrowPagination(uniqueLatest));
            setPopularDeals(uniquePopular);
            setIsLoading(false);
            console.log(latestDeals, popularDeals);
        };

        setIsLoading(true);
        data();  
    }, [currentIndex])

    return (
        <div className="container">
            <header>
                <div className="top-bar">
                    <div className="logo"><span>game</span>deals</div>
                    <nav className="top-bar-navigation">
                        <ul>
                            <li>Games</li>
                            <li>Contact Us</li>
                        </ul>
                        <button className="btn-secondary-light-bg">Sign In</button>
                    </nav>
                    <img className="top-bar-menu-icon" src="/icons/menu-icon.svg" alt="menu icon"></img>
                </div>
                <div className="search">
                    <input type="search" placeholder="Find your game" />
                    <button><img src="/icons/search-icon.svg" alt="search icon"></img></button>
                </div>
                <div className="featured-games">
                    <div className="featured-card">
                        <div className="featured-card-content">
                            { isLoading
                            ? 
                            <SkeletonTheme>
                                <Skeleton 
                                baseColor="#cccccc"
                                className="game-discount-percentage game-discount-percentage-skeleton" />
                            </SkeletonTheme>
                            :
                            <div className="game-discount-percentage">-63%</div>
                            }
                            <h3>Horizon Zero Dawn Complete Edition</h3>
                            { isLoading 
                            ?
                            <Skeleton width="40%"/>
                            : 
                            <p>€18.74 <span className="featured-card-price">€49.99</span></p>
                            }
                        </div>
                        <img className="featured-card-bg" src="/images/zero-dawn.jpg" alt="cover"></img>
                    </div>
                    <div className="featured-cards-small">
                        <div className="featured-card-small">
                            <div className="featured-card-content">
                                <h3>V-Rising</h3>
                                { isLoading
                                ? <Skeleton width="40%" />
                                :
                                <p>€18.74 <span className="featured-card-price">€49.99</span></p>
                                }
                            </div>
                            <img className="featured-card-bg" src="/images/v-rising.jpg" alt="cover"></img>
                        </div>
                        <div className="featured-card-small">
                            <div className="featured-card-content">
                                { isLoading
                                ? 
                                <SkeletonTheme>
                                <Skeleton 
                                baseColor="#cccccc"
                                borderRadius="3.2rem"
                                height="3.2rem"
                                width="7rem"
                                className="game-discount-percentage" />
                                </SkeletonTheme>
                                :
                                <div className="game-discount-percentage">-20%</div>
                                }
                                <h3>Elden Ring</h3>
                                { isLoading
                                ? <Skeleton width="40%" />
                                :
                                <p>€18.74 <span className="featured-card-price">€49.99</span></p>
                                }
                            </div>
                            <img className="featured-card-bg" src="/images/elden-ring.jpg" alt="cover"></img>
                        </div>
                    </div>
                </div>
            </header>
            <section className="main-content">
                <section className="latest-deals">
                    <div className="card-section-heading">
                        <h1>Latest Deals</h1>
                        <div className="section-arrows">
                            <img onClick={() => previousPage()} src="/icons/arrow.svg" alt="back arrow"></img>
                            <img onClick={() => nextPage()} className="arrow-in-circle-mid" src="/icons/arrow.svg" alt="next arrow"></img>
                        </div>
                    </div>
                    { isLoading 
                    ?
                    <SkeletonCards numOfCards={4} />
                    :
                    <div className="cards">
                        {latestDeals.games.map(game => {
                                return (
                                    <div className="card">
                                        <img className="card-img" src="/images/no-mans-sky.webp" alt="cover"></img>
                                        <div className="card-discount game-discount-percentage">{`-${Math.floor(parseInt(game.savings))}%`}</div>
                                        <div className="card-content">
                                            <h3>{game.title}</h3>
                                            <p>{`€${game.salePrice}`} <span>{`€${game.normalPrice}`}</span></p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    }
                </section>
                <section className="popular-deals">
                    <div className="popular-deals-heading">
                        <h1>Popular Deals</h1>
                        <button>
                            View all
                            <img className="chevron-circle" src="/icons/chevron-circle.svg" alt="next arrow"></img>
                        </button>
                    </div>
                    { isLoading
                    ?
                    <SkeletonCards numOfCards={8} />
                    :
                    <div className="cards">
                        {popularDeals.slice(0, 8).map(game => {
                            return (
                                <div className="card">
                                    <img className="card-img" src="/images/god-of-war.jpg" alt="cover"></img>
                                    <div className="card-discount game-discount-percentage">{`-${Math.floor(parseInt(game.savings))}%`}</div>
                                    <div className="card-content card-content-dark-bg">
                                        <h3>{game.title}</h3>
                                        <p>{`€${game.salePrice}`} <span>{`€${game.normalPrice}`}</span></p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    }
                </section>
            </section>
            <footer>
                <div className="footer-content">
                    <div className="footer-logo-and-social">
                        <div className="logo"><span>game</span>deals</div>
                        <div className="footer-social-icons">
                            <img src="/icons/facebook.svg" alt="facebook icon"></img>
                            <img src="/icons/twitter.svg" alt="twitter icon"></img>
                        </div>
                    </div>
                    <div className="footer-quick-links">
                        <h5>Games</h5>
                        <ul>
                            <li><a href="#">Latest Deals</a></li>
                            <li><a href="#">Popular Deals</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h5>Get in Touch</h5>
                        <a href="#">Contact</a>
                    </div>
                </div>
                <div className="footer-copyright">
                    Copyright © 2022 gamedeals. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Home;