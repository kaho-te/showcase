import { useAuth } from '@/hooks/auth'
import Footer from './Footer'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div>
            <div className="min-h-screen">
                {/* Page Heading */}
                <header className="bg-white">
                    <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>

                {/* Page Content */}
                <main className="m-4">{children}</main>
            </div>
            <footer className="mx-3 flex justify-between items-end">
                <Footer user={user} />
            </footer>
        </div>
    )
}

export default AppLayout
