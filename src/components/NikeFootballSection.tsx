export default function NikeFootballSection() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Green lighting effect background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Nike swooshes with green glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Top swooshes */}
          <div className="absolute -top-20 -left-10 w-16 h-8">
            <div className="w-full h-full bg-green-400 transform rotate-12 rounded-sm opacity-80 blur-sm"></div>
          </div>
          <div className="absolute -top-20 left-10 w-16 h-8">
            <div className="w-full h-full bg-green-400 transform -rotate-12 rounded-sm opacity-80 blur-sm"></div>
          </div>

          {/* Center Nike swoosh */}
          <div className="w-20 h-12 mx-auto">
            <div className="w-full h-full bg-green-400 rounded-sm opacity-90"></div>
          </div>

          {/* Bottom swoosh */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-12 h-6">
            <div className="w-full h-full bg-green-400 rounded-sm opacity-70 blur-xs"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 py-24 px-4 text-center">
        {/* Watch button */}
        <div className="mb-12">
          <button className="flex items-center bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors mx-auto">
            <span className="mr-2">Watch</span>
            <div className="w-0 h-0 border-l-4 border-l-black border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
          </button>
        </div>

        {/* Main heading */}
        <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-none">
          NIKE FOOTBALL: THE HOME OF<br />
          TERRIFYING SKILL
        </h2>

        <p className="text-lg mb-12 max-w-md mx-auto">
          We're here to reprogram your game.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Shop
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}
