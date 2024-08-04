import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        priceRange: [],
        option: null,
        order: null
    });

    const setFilter = (key, value) => { 
        filters[key] = value
    }

    const clearAllFilters = () => {
        setFilters({
            categories: [],
            brands: [],
            priceRange: [],
            option: null,
            order: null
        })
    }

    return (
        <FilterContext.Provider value={{ filters, setFilters, setFilter, clearAllFilters }} >
            { children }
        </FilterContext.Provider>
    )
}

export const useFilter = () => useContext(FilterContext);

FilterProvider.propTypes = {
    children: PropTypes.node
}