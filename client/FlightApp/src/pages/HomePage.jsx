import React from 'react';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Uçuş Ara</h2>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nereden"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Nereye"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Yolcu Sayısı"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition duration-200"
          >
            Ara
          </button>
        </form>
      </section>

      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Öne Çıkan Uçuşlar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["İstanbul - Ankara", "İstanbul - İzmir", "İstanbul - Antalya"].map((flight, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">{flight}</h3>
              <p>{index + 1}0:00 - {index + 1}1:30</p>
              <p className="text-blue-600 font-semibold">₺{(200 + index * 50)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
