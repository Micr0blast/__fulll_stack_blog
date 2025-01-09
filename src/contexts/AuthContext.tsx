import { useContext, createContext, useState, Dispatch, SetStateAction, ReactNode, FC } from "react";
import PropTypes from 'prop-types'

interface StateContextType {
    token: string,
    setToken: Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<StateContextType>({
    token: '',
    setToken: () => {},
})

interface ContextProviderProps {
    children?: ReactNode
}

export const AuthContextProvider: FC<ContextProviderProps> = ({children}) => {
    const [token, setToken] = useState<string>('')

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.element.isRequired
}

export const useAuth = () => useContext(AuthContext)