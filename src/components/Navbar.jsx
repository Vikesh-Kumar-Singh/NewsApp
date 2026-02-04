import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Navbar() {
    let [q, setq] = useState("")
    let [search, setSearch] = useState("")
    let [language, setLanguage] = useState("")
    let [searchParams] = useSearchParams()
    let navigate = useNavigate()

    function postSearch(e) {
        e.preventDefault()
        navigate(`/?q=${search}&language=${language}`)
        setSearch("")
    }

    useEffect(() => {
        setq(searchParams.get("q") ?? "All")
        setLanguage(searchParams.get("language") ?? "hi")
    }, [searchParams])
    return (
        <nav className="navbar navbar-expand-lg navbar-floating sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand fs-4" to={`/?q=All&language=${language}`}>Snap News</Link>
                <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="material-symbols-outlined text-dark">menu</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item"><Link className={`nav-link ${q === "All" ? 'active' : ''}`} aria-current="page" to={`/?q=All&language=${language}`}>Home</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${q === "Education" ? 'active' : ''}`} aria-current="page" to={`/?q=Education&language=${language}`}>Education</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${q === "Politics" ? 'active' : ''}`} aria-current="page" to={`/?q=Politics&language=${language}`}>Politics</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${q === "Crime" ? 'active' : ''}`} aria-current="page" to={`/?q=Crime&language=${language}`}>Crime</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${q === "Sports" ? 'active' : ''}`} aria-current="page" to={`/?q=Sports&language=${language}`}>Sports</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${q === "Cricket" ? 'active' : ''}`} aria-current="page" to={`/?q=Cricket&language=${language}`}>Cricket</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${q === "Technology" ? 'active' : ''}`} aria-current="page" to={`/?q=Technology&language=${language}`}>Technology</Link></li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Others
                            </a>
                            <ul className="dropdown-menu shadow-sm border-0">
                                <li><Link className="dropdown-item" to={`/?q=World&language=${language}`}>World</Link></li>
                                <li><Link className="dropdown-item" to={`/?q=India&language=${language}`}>India</Link></li>
                                <li><Link className="dropdown-item" to={`/?q=Jokes&language=${language}`}>Jokes</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Language
                            </a>
                            <ul className="dropdown-menu shadow-sm border-0">
                                <li><Link className="dropdown-item" to={`/?q=${q}&language=hi`}>Hindi</Link></li>
                                <li><Link className="dropdown-item" to={`/?q=${q}&language=en`}>English</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex align-items-center" role="search" onSubmit={postSearch}>
                        <input className="form-control me-2 rounded-pill bg-white border px-3 shadow-none search-input-responsive" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." aria-label="Search" />
                        <button className="btn btn-primary rounded-pill px-4" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>


    )
}