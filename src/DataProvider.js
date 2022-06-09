import { useState, createContext } from "react";

const DataProvider = props => {
    const [cart, setCart] = useState({items: {}, total: 0, size: 0});
    
    return(
        <DataContext.Provider value={{'cart': cart, 'setCart': setCart}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;
export let DataContext = createContext();

