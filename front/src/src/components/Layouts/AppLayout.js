import { useAuth } from '@/hooks/auth'
import Footer from './Footer'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div>
            <div className="min-h-screen">
                {/* Page Content */}
                <main className="">{children}</main>
            </div>
            <footer className="mx-3 flex justify-between items-end">
                <Footer user={user} />
            </footer>
        </div>
    )
}

export default AppLayout
