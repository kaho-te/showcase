import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import Footer from './Footer'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                {/* Page Heading */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>

                {/* Page Content */}
                <main className="m-4">{children}</main>
            </div>
            <footer className="mx-3 flex justify-between items-end">
                <Footer />
            </footer>
        </div>
    )
}

export default AppLayout
