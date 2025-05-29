import { createContext, useContext, useState} from "react";

export const VocabContext = createContext()
export const useVocab = () => {
    return useContext(VocabContext)
}

function VocabProvider({children}) {
    const [vocab, setVocab] = useState([])

    return (
        <VocabContext.Provider value={[vocab, setVocab]}>
            {children}
        </VocabContext.Provider>
    )
}

export default VocabProvider;