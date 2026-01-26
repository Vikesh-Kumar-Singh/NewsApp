import React from "react";

export default function NewsItem(props) {
    return (
        <div className="col">
            <div className="card news-card h-100">
                <img src={props.pic ? props.pic : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="card-img-top" alt={props.title} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold fs-6">{props.title}</h5>
                    <div className="source d-flex justify-content-between text-secondary mb-2" style={{ fontSize: '0.8rem' }}>
                        <p className="mb-0">{props.source}</p>
                        <p className="mb-0">{new Date(props.date).toLocaleDateString()}</p>
                    </div>
                    <p className="card-text text-secondary flex-grow-1" style={{ fontSize: '0.9rem' }}>{props.description ? props.description.slice(0, 100) + "..." : "Read the full article for more details."}</p>
                    <a href={props.url} target="_blank" rel="noreferrer" className="btn btn-primary w-100 mt-3">Read More</a>
                </div>
            </div>
        </div>
    )
}