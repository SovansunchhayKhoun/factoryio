import {useContext, createContext, useState, useEffect} from "react";
import Axios from "axios";


Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [formValues,setFormValues] = useState({
    name: "",
    price: "",
    qty: "",
    type: "",
    description: ""
  })
  const [errors,setErrros] = useState({})
  const getItems = async () => {
    const apiItems = await Axios.get("products");
    setItems(apiItems.data.data);
  };

  const storeItem = async (e) => {
    e.preventDefault()
    try {
      await Axios.post("products",formValues)
      location.reload()
    }catch (e){
      if(e.response.status === 422){
        setErrros(e.response.data.errors)
      }
    }
  }
  const onChange = (e) => {
    const {name,value} = e.target
    setFormValues({...formValues,[name]:value})
  }

  const getItem = async (id) => {
    const response = await Axios.get(`products/${id}`)
    const apiItem = response.data.data
    setItem(apiItem);
    setFormValues({
      name: apiItem.name,
      qty: apiItem.qty,
      type: apiItem.type,
      price: apiItem.price,
      description: apiItem.description,
    })
  };

  const updateItem = async (e) => {
    e.preventDefault()
    try {
      await Axios.put("products/" + item.id,formValues)
      history.back()
    } catch (e){
      if(e.response.status === 422){
        setErrros(e.response.data.errors)
      }
    }
  }

  return <ProductContext.Provider
    value={{
      items,
      item,
      formValues,
      setFormValues,
      errors,
      storeItem,
      getItems,
      getItem,
      onChange,
      updateItem
    }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
