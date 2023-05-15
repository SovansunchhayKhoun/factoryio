// eslint-disable-next-line no-unused-vars
import React, {useRef, useEffect, useState, useContext} from 'react';
import Transition from '../../utils/Transition.jsx';
import ProductContext from "../../context/ProductContext.jsx";
import AdminPopUp from "./AdminPopUp.jsx";

function CreateItemModal({
                           // eslint-disable-next-line react/prop-types
                           id,
                           // eslint-disable-next-line react/prop-types
                           modalOpen,
                           // eslint-disable-next-line react/prop-types
                           setModalOpen
                         }) {

  const modalContent = useRef(null);
  const { errors} = useContext(ProductContext)

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [qty,setQty] =useState("");
  const [type,setType] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState();
  const storeItem = async (e) => {
    e.preventDefault()
    const formValues = new FormData;
    formValues.append("name", name);
    formValues.append("price", price);
    formValues.append("qty", qty);
    formValues.append("type", type);
    formValues.append("description", description);
    formValues.append("image", image);
    await fetch("http://127.0.0.1:8000/api/v1/products",{
      method: "POST",
      body: formValues
    })
    location.reload()
  }
  // close on click outside
  useEffect(() => {
    const clickHandler = ({target}) => {
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen
  }, [modalOpen]);

  return (
    <>
      {/*/!* Modal backdrop *!/*/}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div ref={modalContent} className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
          <form className="space-y-6 p-12"
                onSubmit={storeItem}
          >
            <div>
              <label htmlFor="ProductName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Name</label>
              {errors.name && <span className="text-sm text-red-400">{errors.name[0]}</span>}
              {errors.image && <span className="text-sm text-red-400">{errors.image[0]}</span>}
              <input type="name" name="name" id="name"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     onChange={(e) => setName(e.target.value)}
                     required/>
            </div>
            <div className="flex gap-8">
              <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Qty</label>
              <input type="number" name="qty" id="qty"
                     onChange={(e) => setQty(e.target.value)}
                     min="1"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price</label>
              <input type="number" name="price" id="price"
                     onChange={(e) => setPrice(e.target.value)}
                     min="1"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
            </div>
            <div>
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Type</label>
              <input name="type" id="type"
                     onChange={(e) => setType(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
            </div>
            <div>
              <label htmlFor="ProductName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description</label>
              <input name="description" id="description"
                     onChange={(e) => setDescription(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Image</label>
              <input name="image" id="image"
                     type="file"
                     onChange={(e) => setImage(e.target.files[0])}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     />
            </div>
            <button type="submit"
              // onClick={() => setModalOpen(!modalOpen)}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Create
            </button>
          </form>
        </div>
      </Transition>
      {/* Modal backdrop */}

    </>
  );
}

export default CreateItemModal;
