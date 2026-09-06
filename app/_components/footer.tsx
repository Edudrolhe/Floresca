import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react'

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contato */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-purple-700">Floricultura na Web</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <PhoneIcon className="size-4 shrink-0 text-purple-700" />
                (47) 3346-6704
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="size-4 shrink-0 text-purple-700" />
                (47) 98873-8034 (WhatsApp)
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="size-4 shrink-0 text-purple-700" />
                jccomerciodeflores@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-purple-700" />
                Vereador Abraão João Francisco, 3686, Ressacada, Itajaí - SC, CEP 88302-100
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="size-4 shrink-0 text-purple-700" />
                @jcfloresatacado
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-purple-700">Categorias</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Cestas e Kits</li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-purple-700">Informações</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Balneário Camboriú</li>
              <li>Itajaí</li>
            </ul>
          </div>

          {/* Formas de Pagamento */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-purple-700">Formas de Pagamento</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Formas de pagamento</li>
            </ul>
            <h4 className="mt-4 mb-3 text-sm font-bold text-purple-700">Certificações</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Certificação SSL</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-xs text-gray-500">
          © 2024 Floresca Floricultura. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer
