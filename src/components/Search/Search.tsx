import * as React from "react";

import NetworkStatus from "../NetworkStatus";
import { stringify } from "query-string";

import { TypedSearchResults } from "./queries";
import { SearchResults } from "./gqlTypes/SearchResults";
import ProductItem from "./ProductItem";
import NothingFound from "./NothingFound";

import { searchUrl } from "../../app/routes";
import { maybe } from "@temp/core/utils";
import { DefaultLoader } from "@components/atoms";
import { Error } from "../Error";
import { OfflinePlaceholder } from "..";

import "./scss/index.scss"

export class Search extends React.Component<any> {
    state = { search: "" }

    submitBtnRef = React.createRef<HTMLButtonElement>();
    node: HTMLDivElement;

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            this.setState({ isActive: true })
        }
        else {
            this.setState({ search: "" });
        }
    }

    get hasSearchPhrase() {
        return this.state.search.length > 0;
    }

    get redirectTo() {
        return { pathname: searchUrl, search: `?${this.searchQs}` };
    }

    get searchQs() {
        return stringify({ q: this.state.search });
    }

    hasResults = (data: SearchResults) =>
        maybe(() => !!data.products.edges.length);

    handleSubmit = (evt: React.FormEvent) => {
        if (this.hasSearchPhrase && this.submitBtnRef.current) {
            this.props.history.push(`${searchUrl}?${this.searchQs}`);
        }

        evt.preventDefault();
    };

    clear() {
        this.setState({ search: "" });
    }

    render() {
        var searchContainerStyle = this.hasSearchPhrase ? "search-container-phrase" : "search-container-nophrase";

        return (
            <>
                <div ref={node => this.node = node}>
                    <div className={searchContainerStyle}>
                        <input className="search-web"
                            placeholder={"Search"}
                            onChange={evt => this.setState({ search: evt.target.value })}
                            value={this.state.search}

                        />
                    </div>

                    <NetworkStatus>
                        {isOnline => {
                            if (this.hasSearchPhrase) {
                                return (
                                    <div className="results-container">
                                        <TypedSearchResults
                                            renderOnError
                                            displayError={false}
                                            errorPolicy="all"
                                            variables={{ query: this.state.search }}
                                        >
                                            {({ data, error, loading }) => {

                                                if (this.hasResults(data)) {
                                                    return (
                                                        <>
                                                            <ul className="results-ul">
                                                                {data.products.edges.map(product => (
                                                                    <div onClick={() => this.clear()}>
                                                                        <ProductItem
                                                                            {...product}
                                                                            key={product.node.id}
                                                                            
                                                                        />
                                                                    </div>

                                                                ))}
                                                            </ul>
                                                            {/* <div>
                                                                {loading ? (
                                                                    <DefaultLoader />
                                                                ) : (
                                                                        // <div className="allresults-container">
                                                                        //     <button
                                                                        //         onClick={() => console.log("clicked")}
                                                                        //         type="submit"
                                                                        //     >
                                                                        //         <FormattedMessage defaultMessage="Show all results" />
                                                                        //     </button>
                                                                        // </div>
                                                                        null
                                                                    )}
                                                            </div> */}
                                                        </>
                                                    );
                                                }

                                                if (error) {
                                                    return isOnline ? (
                                                        <Error error={error.message} />
                                                    ) : (
                                                            <OfflinePlaceholder />
                                                        );
                                                }

                                                return <NothingFound search={this.state.search} />;
                                            }}
                                        </TypedSearchResults>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    </NetworkStatus>
                </div>
            </>
        );
    }
}
