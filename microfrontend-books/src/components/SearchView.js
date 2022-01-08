import React from "react";

class SearchView extends React.Component {
    render() {
        return (
            <>
                <div id="searchDiv">
                    <form className="search-form" onSubmit={(e) => onSubmit(this.props, e)}>
                        <input className="search-input" name="searchText" placeholder="Search books" type="search"></input>
                        <button type="submit" className="search-button">
                            <svg className="submit-button">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#searchSymbol"></use>
                            </svg>
                        </button>
                    </form>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" display="none">
                        <symbol id="searchSymbol" viewBox="0 0 32 32">
                            <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
                        </symbol>
                    </svg>
                </div>
            </>
        );
    }
}

const token = JSON.parse(localStorage.getItem("token"))

const onSubmit = (props, e) => {
    e.preventDefault();
    var searchText = e.target.elements.searchText.value;
    props.setSearch(searchText);
    if (searchText === "") return;

    var currentPage = 1;
    props.setLoading("loading")
    var url = new URL(
        `http://localhost:3020/books/search/${searchText}/${currentPage}`
    );

    fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET",
    })
        .then((res) => res.json())
        .then((r) => {
            props.setLoading("")
            var myData = []
            Object.values(r).forEach((element) => {
                var cover = ""
                var number_of_pages = "Not specified"
                if (element.hasOwnProperty('cover'))
                    cover = element.cover.medium
                if (element.hasOwnProperty('number_of_pages'))
                    number_of_pages = element.number_of_pages
                element.cover = cover
                element.number_of_pages = number_of_pages

                myData.push(element)
            });
            props.setData(myData)
        });
};


export default SearchView;