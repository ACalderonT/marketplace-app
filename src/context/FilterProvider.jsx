import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const filterContext = createContext();
const handleFilterContext = createContext();

export const useFilterContext = () => {
    return useContext(filterContext);
}

export const useHandleFilterContext = () => {
    return useContext(handleFilterContext)
}

export const FilterProvider = ({ children }) => {
    const [showClearButton, setShowClearButton] = useState(false);
    const [filters, setFilters] = useState({
        tags: [],
        brands: [],
        priceRange: [],
        option: null,
        order: null
    });

    const handleFilters = (key, value) => { 
        filters[key] = value
    }

    const clearAllFilters = () => {
        setFilters({
            tags: [],
            brands: [],
            priceRange: [],
            option: null,
            order: null
        })
        console.log("filters: ", filters)
    }

    const handleShowClearButton = () => {
        console.log("filters: ", filters)
        setShowClearButton(!(
            filters.tags.length === 0 && 
            filters.brands.length === 0 && 
            filters.priceRange.length === 0 && 
            filters.option &&
            filters.order))
        console.log("showClearButton: ", showClearButton)
    }

    return (
        <filterContext.Provider value={filters} >
            <handleFilterContext.Provider value={{handleFilters, clearAllFilters, handleShowClearButton, showClearButton}} >
                { children }
            </handleFilterContext.Provider>
        </filterContext.Provider>
    )
}

FilterProvider.propTypes = {
    children: PropTypes.node
}