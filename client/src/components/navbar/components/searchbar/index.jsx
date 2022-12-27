import React from "react";
import "./styles.scss";
import { useState } from "react";
import { GetSearchResult } from "../../../../api/Search";

const SearchBar = ({ type }) => {
    const [open, setOpen] = useState(false);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState({});
    const [error, setError] = useState(false);

    const handleSubmit = async (value) => {
        if (!value) return;
        try {
            setSearched(true);
            setLoading(true);
            const fetched = await GetSearchResult(value);
            setFetched(fetched.data);
            setError(false);
            setLoading(false);
        } catch (error) {
            setSearched(true);
            setLoading(false);
            setError(true);
            console.log(error);
        }
    };
    return (
        <div className={`wrap ${type}`}>
            <form
                className="search"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e.target[0].value);
                }}
                onChange={() => {
                    setSearched(false);
                    setError(false);
                    setLoading(false);
                    setFetched({});
                }}
                onFocus={() => {
                    setOpen(true);
                }}
                onBlur={() => {
                    if (!fetched?.found) setOpen(false);
                }}
            >
                <input type="text" className="searchTerm" placeholder="Search Courses" />
                <button className="search-img"></button>
            </form>
            {open && (
                <div className={`search-results`}>
                    {searched ? (
                        loading ? (
                            "loading"
                        ) : fetched?.found ? (
                            <>
                                <p
                                    style={{
                                        color: "#fff",
                                        backgroundColor: "#000",
                                        cursor: "pointer",
                                        padding: "10px",
                                    }}
                                    onClick={() => {
                                        if (fetched?.isAvailable)
                                            window.location = "/browse/" + fetched.code;
                                    }}
                                >
                                    {fetched.code}
                                    <br />
                                    {fetched.name}
                                    {!fetched.isAvailable && " || no data"}
                                </p>
                                <span onClick={() => setOpen(false)} style={{ cursor: "pointer" }}>
                                    close
                                </span>
                            </>
                        ) : (
                            "not found"
                        )
                    ) : error ? (
                        "error"
                    ) : (
                        "Press Enter to search"
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
