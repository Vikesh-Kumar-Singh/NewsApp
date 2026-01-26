import React, { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Homepage() {
    let [pages, setPage] = useState(1)
    let [articles, setArticles] = useState([])
    let [totalResults, setTotslResult] = useState(0)

    let [q, setq] = useState("All")
    let [language, setLanguage] = useState("")
    let [searchParams] = useSearchParams()

    useEffect(() => {
        setq(searchParams.get("q") ?? "All")
        setLanguage(searchParams.get("language") ?? "hi")
    }, [searchParams])

    async function getAPIData() {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=24&page=1&sortBy=publishedAt&language=${language}&apiKey=3abafca5ba6f427c977645a29c053fe1`)
        response = await response.json()
        console.log(response)
        if (response.status === "ok") {
            setArticles(response.articles)
            setTotslResult(response.totalResults)
        }

    }

    let fetchData = async () => {
        setPage(pages + 1)
        let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=24&page=${pages}&sortBy=publishedAt&language=${language}&apiKey=3abafca5ba6f427c977645a29c053fe1`)
        response = await response.json()
        console.log(response)
        if (response.status === "ok") {
            setArticles(articles.concat(response.articles))

        }

    }

    useEffect(() => {
        getAPIData()
    }, [q, language])

    return (
        <>
            <div className="container my-5">
                <InfiniteScroll
                    dataLength={articles.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={articles.length < totalResults}
                    loader={<h4>Loading...</h4>}

                >


                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {
                            articles.map((item, index) => {
                                return <NewsItem
                                    key={index}
                                    source={item.source.name}
                                    title={item.title}
                                    description={item.description}
                                    url={item.url}
                                    pic={item.urlToImage}
                                    date={item.publishedAt}
                                />


                            })
                        }

                    </div>
                </InfiniteScroll>
            </div>
        </>


    )
}