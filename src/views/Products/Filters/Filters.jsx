import { FilterOutlined } from "@ant-design/icons";
import { Button, Form, Select, Slider } from "antd";
import { useFilter } from "../../../context/FilterProvider";
import { useEffect, useState } from "react";
import { fieldOptions, orderOptions } from "../../../utils/orderByOptions";
import { getAllBrands, getAllCategories, getAllProducts, getPriceLimits } from "../../../services/public";
import { formatCurrency } from "../../../utils/helpers";
import PropTypes from 'prop-types';

const Filters = ({ setTotal, setIsLoading, setCurrentPage, setProducts }) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [marks, setMarks] = useState({})

    const [form] = Form.useForm();
    const watchOption = Form.useWatch('option', form)

    const filters = useFilter();

    const handleValuesChange = (changedValues, allValues) => {
        const anyFieldFille = Object.values(allValues).some(value => value !== undefined && value !== '' && value?.length > 0);
        
        if(!anyFieldFille) setCurrentPage('1');
        setIsDisabled(!anyFieldFille)
        filters.setFilters(allValues)
    }

    const handleSubmit = () => {
        setIsLoading(true)
        getAllProducts(1, filters.filters)
        .then((result) => {
            result.data['products'].map((product) => {
                product['img'] = product.images[0]
            })
            setCurrentPage(1)
            setTotal(result.data['total'])
            setProducts(result.data['products'])
        }).catch((error) => {
            console.error(error)
        })
        setIsLoading(false)
    }

    const handleReset = () => {
        form.resetFields()
        filters.clearAllFilters()
        setIsDisabled(true)
        setCurrentPage('1')
    }

    useEffect(() => {
        getAllCategories()
        .then((result) => {
            setCategories(result.data)
        })
        .catch(error => console.error(error))

        getAllBrands()
        .then((result) => {
            setBrands(result.data)

        }).catch(error => console.error(error))

        getPriceLimits()
        .then((result) => { 
            const min = result.data.min === result.data.max ? 0 : result.data.min
            const max = result.data.max 

            setMinPrice(min)
            setMaxPrice(max)

            const markPrice = {}
            markPrice[min] = formatCurrency(min)
            markPrice[max] = formatCurrency(max)

            setMarks(markPrice)
        })
        .catch(error => console.error(error))

        if(filters.filters.categories.length > 0){
            form.setFieldValue('categories', filters.filters.categories)
            form.validateFields()
            handleValuesChange(form.getFieldValue('categories'), form.getFieldsValue(true));
        }
    }, [])

    return(
        <>
            <h1><FilterOutlined /> Filters</h1>
            <Form
                form={form}
                name="filters"
                layout="vertical"
                labelCol={24}
                wrapperCol={24}
                onFinish={handleSubmit}
                onValuesChange={handleValuesChange}
                onFinishFailed={() => console.log("On Finish Filed")}
            >
                { categories?.length > 0 &&
                    <Form.Item
                        name="categories"
                        label="Category"
                    >
                        <Select 
                            mode="multiple"
                            allowClear
                            options={categories}
                        />
                    </Form.Item>
                }

                { brands.length > 0 && 
                    <Form.Item
                        name="brand"
                        label="Brands"
                    >
                        <Select 
                            mode="multiple"
                            allowClear
                            options={brands}
                        />
                    </Form.Item>
                }

                { !(maxPrice === 0 || maxPrice === null) && 
                    <Form.Item
                        name="price"
                        label="Price range"
                    >
                        <Slider 
                            min={minPrice}
                            max={maxPrice}
                            marks={marks}
                            range
                        />
                    </Form.Item>
                }

                <Form.Item
                    name="option"
                    label="Order by"
                >
                    <Select options={fieldOptions} />
                </Form.Item>

                    { watchOption && 
                        <Form.Item
                            name="order"
                            label=""
                        >
                            <Select options={orderOptions} />
                        </Form.Item>
                    }

                <Form.Item>
                    <Button type="primary" htmlType="submit" block disabled={isDisabled}>Filter</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='reset' onClick={handleReset} ghost block disabled={isDisabled}>Reset</Button>
                </Form.Item>

            </Form>
        </>
    )
};

export default Filters;

Filters.propTypes = {
    setTotal: PropTypes.func,
    setIsLoading: PropTypes.func,
    setCurrentPage: PropTypes.func,
    setProducts: PropTypes.func
}
