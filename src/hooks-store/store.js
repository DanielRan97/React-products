import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
    const setGlobalState = useState(globalState)[1];
    const dispatch = (actionsIndentifier, payLoad) => {
        
    const newState = actions[actionsIndentifier](globalState, payLoad);
        globalState = { ...globalState, ...newState};

        for (const listener of listeners){
            listener(globalState);
        };
    };

    useEffect(() => {
        if(shouldListen) {
            listeners.push(setGlobalState);
        };

        return () => {
            if(shouldListen) {
                listeners = listeners.filter(lis => lis !== setGlobalState);
            };
        };
    }, [setGlobalState, shouldListen]);

    return [globalState, dispatch];
};

export const initStore = (userAction, initialState) => {
    if(initialState) {
        globalState = {...globalState , ...initialState};
    };

    actions = {...actions, ...userAction}
};