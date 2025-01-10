import { useContext, createContext, useState, Dispatch, SetStateAction, ReactNode, FC } from "react";
import PropTypes from 'prop-types'


// TODO replacing symmetric keys for asymmetric keys via OAuth
// TODO store tokens int httpOnly cookies
// TODO token invalidation
interface StateContextType {
    token: string | null,
    setToken: Dispatch<SetStateAction<string | null>>
}

export const AuthContext = createContext<StateContextType>({
    token: null,
    setToken: () => {},
})

interface ContextProviderProps {
    children?: ReactNode
}

export const AuthContextProvider: FC<ContextProviderProps> = ({children}) => {
    const [token, setToken] = useState<string | null>(null)

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.element.isRequired
}

export const useAuth = ():[string | null, Dispatch<SetStateAction<string | null>>] => {
    const {token, setToken} = useContext(AuthContext)
    return [token, setToken]
}