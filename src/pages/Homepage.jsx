import React, { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Homepage() {
    let [articles, setArticles] = useState([])
    let [totalResults, setTotalResult] = useState(0)
    let [nextPage, setNextPage] = useState(null)

    let [q, setq] = useState("news")
    let [language, setLanguage] = useState("en")
    let [searchParams] = useSearchParams()

    // TODO: Replace with your actual NewsData.io API Key (starts with 'pub_')
    const API_KEY = "pub_1cf12de1c67d4d9f839954b108ff1db5";

    useEffect(() => {
        let query = searchParams.get("q")
        if (query === "All" || !query) query = "news"
        setq(query)
        setLanguage(searchParams.get("language") ?? "en")
    }, [searchParams])

    async function getAPIData() {
        try {
            // Reset next page on new search
            setNextPage(null);

            let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${q}&language=${language}`
            let response = await fetch(url)
            let data = await response.json()
            console.log(data)
            if (data.status === "success") {
                setArticles(data.results)
                setTotalResult(data.totalResults)
                setNextPage(data.nextPage)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    let fetchData = async () => {
        if (!nextPage) return;

        try {
            let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${q}&language=${language}&page=${nextPage}`
            let response = await fetch(url)
            let data = await response.json()
            console.log(data)
            if (data.status === "success") {
                setArticles(articles.concat(data.results))
                setNextPage(data.nextPage)
            }
        } catch (error) {
            console.error("Error fetching more data:", error)
        }
    }

    useEffect(() => {
        if (q && language) {
            getAPIData()
        }
    }, [q, language])

    return (
        <>
            <div className="container my-5">
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchData}
                    hasMore={!!nextPage}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {
                            articles.map((item, index) => {
                                return <NewsItem
                                    key={index}
                                    source={item.source_id}
                                    title={item.title}
                                    description={item.description}
                                    url={item.link}
                                    pic={item.image_url}
                                    date={item.pubDate}
                                />
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}