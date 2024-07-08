import { Flex, Select, Button } from "antd";
import { ClearOutlined, CloseOutlined } from "@ant-design/icons";
import { useFilterContext, useHandleFilterContext } from "../../../context/FilterProvider";
import { useState } from "react";

const OrderBy = () => {
    const filters = useFilterContext();
    const { handleFilters, clearAllFilters, handleShowClearButton, showClearButton } = useHandleFilterContext();

    const [showOrderDropdown, setShowOrderDropDown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(filters.option)
    const [selectedOrder, setSelectedOrder] = useState(filters.option)

    const options = [
        {
            label: "nombre",
            value: "name"
        },
        {
            label: "precio",
            value: "price"
        }
    ]

    const order = [
        {
            label: "mayor a menor",
            value: "DESC"
        },
        {
            label: "menor a mayor",
            value: "ASC"
        }
    ]

    const handleClearFilters = () => {
        clearAllFilters();
        setSelectedOption(null);
        setSelectedOrder(null);
        setShowOrderDropDown(false);
        handleShowClearButton();
    }

    const handleSelectedOption = (value) => {
        handleFilters('option', value);
        setSelectedOption(value);
        setShowOrderDropDown(true);
        handleShowClearButton();
    }

    const handleClearOption = () => {
        handleFilters('option', null);
        setSelectedOption(null);
        setShowOrderDropDown(false);
        handleShowClearButton();
    }

    const handleSelectedOrder = (value) => {
        handleFilters('order', value);
        setSelectedOrder(value);
        handleShowClearButton();
        // Llamar al servicio que trae los datos ordenados
    }

    const handleClearOrder = () => {
        handleFilters('order', null);
        setSelectedOrder(null);
        setShowOrderDropDown(false);
        handleShowClearButton();
    }


    return (
        <>
            <Flex align="center" justify="flex-end" style={{ flexGrow: '1' }} gap={'small'}>
                {
                    showClearButton && (
                        <Button type="link" icon={<ClearOutlined />} onClick={handleClearFilters} >Clear all filters</Button>
                    )
                }
                {
                    showOrderDropdown && (
                        <Button type="link" icon={<CloseOutlined />} onClick={handleClearOrder} >Clear order</Button>
                    )
                }
                <span style={{ fontWeight: '400' }}>Ordenar por</span>
                <Select 
                    options={options}
                    allowClear
                    size="small"
                    variant="borderless"
                    value={selectedOption}
                    style={{width: 100}}
                    onSelect={(value) => handleSelectedOption(value)}
                    onClear={handleClearOption}
                />
                {
                    showOrderDropdown ? (
                        <>
                            <span>de</span>
                                <Select 
                                    options={order}
                                    allowClear
                                    variant="borderless"
                                    size="small"
                                    value={selectedOrder}
                                    style={{width: 140}}
                                    onSelect={(value) => handleSelectedOrder(value)}
                                    onClear={handleClearOrder}
                                />
                        </>
                    )
                    :
                    ""
                }
            </Flex>
        </>
    )
}

export default OrderBy;