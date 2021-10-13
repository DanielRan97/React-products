import React, {useState} from 'react';

export const ProductContext =  React.createContext({
        products: [],
        toggleFave: (id) => {}
    });

  export default props => {

    const [productState, setProductState] = useState([
        {
          id: 'p1',
          title: 'Red Scarf',
          description: 'A pretty red scarf.',
          isFavorite: false
        },
        {
          id: 'p2',
          title: 'Blue T-Shirt',
          description: 'A pretty blue t-shirt.',
          isFavorite: false
        },
        {
          id: 'p3',
          title: 'Green Trousers',
          description: 'A pair of lightly green trousers.',
          isFavorite: false
        },
        {
          id: 'p4',
          title: 'Orange Hat',
          description: 'Street style! An orange hat.',
          isFavorite: false
        }
      ]);

    const toggleFavorite = (productId) => {
        setProductState(currentPructState => {
            const prodIndex = currentPructState.findIndex(
                p => p.id === productId
              );
              const newFavStatus = !currentPructState[prodIndex].isFavorite;
              const updatedProducts = [...currentPructState];
              updatedProducts[prodIndex] = {
                ...currentPructState[prodIndex],
                isFavorite: newFavStatus
              };
            return updatedProducts;
        });
    };


    return(
        <ProductContext.Provider value={{products: productState, toggleFave: toggleFavorite}}>
            {props.children}
        </ProductContext.Provider>
    );
  };