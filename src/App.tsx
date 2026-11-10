import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from '@/context/LanguageContext'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import TermsPage from '@/pages/TermsPage'
import AdminDashboard from '@/pages/AdminDashboard'
import { NotFoundPage, ServerErrorPage } from '@/pages/ErrorPage'
import ErrorBoundary from '@/components/ErrorBoundary'
import './index.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#141414',
                color: '#ffffff',
                border: '1px solid #262626',
                borderRadius: '100px',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 500,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#141414',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff5577',
                  secondary: '#141414',
                },
              },
            }}
          />
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
