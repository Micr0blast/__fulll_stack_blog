import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext.js'
import PropTypes from 'prop-types'

export function App({children}) {
  const queryClient = new QueryClient()
  return (
    <div>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </QueryClientProvider>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired
}