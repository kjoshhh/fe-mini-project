import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t w-full">
      <div className="flex flex-col px-[64px]">
        <div className="flex justify-between mx-auto w-full py-[100px] md:gap-[64px]">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl">TixID</span>
            </div>
            <p className="text-muted-foreground">
              Platform terpercaya untuk menemukan dan membeli tiket event terbaik di Indonesia.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="outline">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex md:gap-20 justify-between">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Tautan Cepat</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Beranda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Jelajahi Event</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Buat Event</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Bantuan</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold">Kategori</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Konser Musik</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Olahraga</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Teater & Seni</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Seminar</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Festival</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Hubungi Kami</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@eventtix.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+62 21 1234 5678</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>Jl. Sudirman No. 123<br />Jakarta 10220, Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full py-[24px]">
          <p className="text-muted-foreground text-sm">
            © 2025 EventTix. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-foreground transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}