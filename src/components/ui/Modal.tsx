import React, { useEffect } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
  }[size]

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#090909]/80 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className={`w-full ${sizeClass} bg-[#141414] border border-[#262626] rounded-[20px] p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden`}
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1a1a1a]">
          {title && (
            <h3 className="text-[18px] font-medium tracking-tight text-white">{title}</h3>
          )}
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-[#1c1c1c] text-[#999999] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
