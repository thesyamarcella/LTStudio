import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Mantra } from './components/Mantra';
import { Why } from './components/Why';
import { WorkflowIntelligence } from './components/WorkflowIntelligence';
import { EcosystemArchitecture } from './components/EcosystemArchitecture';
import { Products } from './components/Products';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BuiltForMeFirst } from './components/BuiltForMeFirst';
import { Principles } from './components/Principles';
import { Footer } from './components/Footer';
import { Product } from './types';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans antialiased selection:bg-[#1A1A1A] selection:text-[#F9F8F6]">
        {/* Navigation */}
        <Navbar />

        <main>
          {/* Hero Section */}
          <Hero onOpenProductDetail={(product) => setSelectedProduct(product)} />

          {/* The LTStudio Mantra */}
          <Mantra />

          {/* Why Section */}
          <Why />

          {/* Workflow Intelligence Engine */}
          <WorkflowIntelligence />

          {/* Ecosystem Architecture Map */}
          <EcosystemArchitecture />

          {/* Products in the Ecosystem */}
          <Products onOpenProduct={(product) => setSelectedProduct(product)} />

          {/* Built For Me First */}
          <BuiltForMeFirst />

          {/* Principles */}
          <Principles />
        </main>

        {/* Footer */}
        <Footer />

        {/* Product Detail Inspector Modal */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </LanguageProvider>
  );
}
