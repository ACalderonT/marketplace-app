import { FilterOutlined } from "@ant-design/icons";
import { Button, Form, Select, Slider } from "antd";
import { useFilterContext, useHandleFilterContext } from "../../../context/FilterProvider";
import { useState } from "react";
import tagOptions from '../../../utils/tagOptions.json'
import brandOptions from '../../../utils/brandOptions.json'

const Filters = () => {
    const filters = useFilterContext();
    const { handleFilters, handleShowClearButton } = useHandleFilterContext();

    const [disabledButton, setDisabledButton] = useState(true)

    const handleTagChange = (value) => {
        handleFilters('tags', value);
        handleShowClearButton();
        setDisabledButton(filters.tags.length === 0 && filters.brands.length === 0 && filters.priceRange.length === 0);
    };

    const handleBrandChange = (value) => {
        handleFilters('brands', value);
        handleShowClearButton();
        setDisabledButton(filters.tags.length === 0 && filters.brands.length === 0 && filters.priceRange.length === 0);
    };

    const handlePriceChange = (value) => {
        handleFilters('priceRange', value);
        handleShowClearButton();
        setDisabledButton(filters.tags.length === 0 && filters.brands.length === 0 && filters.priceRange.length === 0);
    };

    const handleSubmit = () => {
           console.log("filters: ", filters);
        
        // LLamar a servicio para Filtrar data
    }

    return(
        <>
            <h1><FilterOutlined /> Filters</h1>
            <Form 
                name="filters"
                layout="vertical"
                labelCol={24}
                wrapperCol={24}
                onFinish={handleSubmit}
                onFinishFailed={() => console.log("On Finish Filed")}
            >
                <Form.Item
                    name="tags"
                    label="Tags"
                >
                    <Select 
                        mode="multiple"
                        allowClear
                        onClear={() => handleFilters('tags', [])}
                        onChange={handleTagChange}
                        options={tagOptions}
                    />
                </Form.Item>

                <Form.Item
                    name="brand"
                    label="Brands"
                >
                    <Select 
                        mode="multiple"
                        allowClear
                        onClear={() => handleFilters('brands', [])}
                        onChange={handleBrandChange}
                        options={brandOptions}
                    />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price range"
                >
                    <Slider 
                        min={0}
                        max={100}
                        range
                        onChangeComplete={handlePriceChange}
                    />
                </Form.Item>

                <Button disabled={disabledButton} type="primary" htmlType="submit" ghost block>Filter</Button>

            </Form>
        </>
    )
};

export default Filters;