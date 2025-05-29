import { createContext, useContext, useState } from 'react';

export const EvaluateContext = createContext();
export const useEvaluate = () => {
	return useContext(EvaluateContext);
};

export default function EvaluateProvider({ children }) {
	const [ evaluate, setEvaluate ] = useState(false);
	return <EvaluateContext.Provider value={[ evaluate, setEvaluate ]}>{children}</EvaluateContext.Provider>;
}
