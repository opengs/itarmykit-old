import { Dashboard } from '@pages/Dashboard'
import { NotFound } from '@pages/NotFound'
import { ProfileSelector } from '@pages/ProfileSelector'
import { ScreenLoading } from '@pages/ScreenLoading'
import { jotaiStore } from '@store/userAtom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'
import { HashRouter, Route, Routes } from 'react-router-dom'

export const queryClient = new QueryClient()

export const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={jotaiStore}>
                <HashRouter>
                    <Routes>
                        <Route path='/' index element={<ScreenLoading />} />
                        <Route path='/profiles' element={<ProfileSelector />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </HashRouter>
            </Provider>
        </QueryClientProvider>
    )
}
