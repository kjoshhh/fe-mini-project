import { Button } from "./ui/button";

export function PromoBanner() {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Bergabung dengan EventTix Pro
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Dapatkan akses eksklusif ke event premium, diskon khusus, dan notifikasi early bird untuk event terbaru!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" variant="secondary" className="px-8">
                Upgrade ke Pro
              </Button>
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop"
              alt="EventTix Pro"
              className="w-80 h-60 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}