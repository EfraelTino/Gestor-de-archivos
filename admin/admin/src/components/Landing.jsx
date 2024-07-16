import React from 'react';

const LandingPage = () => {
  return (
    <div className=" mx-auto px-4">
      <header className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <img src="/path-to-sibi-logo.svg" alt="Sibi" className="h-8" />
          <span className="text-2xl font-bold ml-2">Sibi</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Precios</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Comprobantes</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Ingresar</a></li>
            <li><a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Registrate</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex mt-16">
        <div className="w-1/2 pr-8">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">
            Facturación electrónica para pequeños negocios.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sibi es un aplicativo móvil donde podrás crear tus facturas y boletas de forma rápida, sencilla y sin preocupaciones.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Descargar App
            </button>
            <button className="border border-gray-300 text-gray-600 px-6 py-3 rounded-md hover:bg-gray-100">
              ¿Cómo funciona?
            </button>
          </div>
        </div>
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-red-400 to-green-400 rounded-full opacity-50"></div>
          <img src="/path-to-app-screenshot.png" alt="Sibi App" className="relative z-10 mx-auto" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;