import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Goal, Eye, Heart, Users, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/landing/footer"
import { LandingHeader } from "@/components/landing/landing-header"

export default function AboutUsPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: "Inovasi Berkelanjutan",
      description: "Kami terus berinovasi untuk memberikan solusi terbaik dan paling relevan bagi pengguna kami.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Fokus Pengguna",
      description: "Kebutuhan dan kepuasan pengguna adalah prioritas utama kami dalam setiap pengembangan.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: "Integritas & Transparansi",
      description: "Kami menjunjung tinggi kejujuran dan keterbukaan dalam setiap aspek bisnis kami.",
    },
  ]

  return (
    <section className=" bg-gray-50">
      <LandingHeader />
      <div className="container mx-auto px-4 text-center py-20 md:py-24">
        <Badge variant="secondary" className="mb-4 text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
          Tentang Kami
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-in fade-in-up duration-500">
          Misi Kami untuk Mempermudah Hidup Anda
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-in fade-in-up duration-700 delay-100">
          Smart Pantry Manager didirikan dengan visi untuk merevolusi cara Anda mengelola dapur dan makanan. Kami
          percaya bahwa teknologi dapat membuat hidup lebih mudah, lebih efisien, dan lebih berkelanjutan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left animate-in fade-in-up duration-700 delay-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
              <Goal className="w-7 h-7 text-green-600 mr-3" />
              Misi Kami
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Misi kami adalah memberdayakan setiap rumah tangga dan bisnis kecil untuk mengelola inventaris makanan
              mereka dengan cerdas, mengurangi pemborosan, dan mengoptimalkan penggunaan sumber daya. Kami berkomitmen
              untuk menyediakan solusi yang intuitif, inovatif, dan berkelanjutan.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-xl animate-in fade-in-up duration-700 delay-300">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Our Mission"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-xl animate-in fade-in-up duration-700 delay-400">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Our Vision"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="text-left animate-in fade-in-up duration-700 delay-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
              <Eye className="w-7 h-7 text-green-600 mr-3" />
              Visi Kami
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Menjadi platform manajemen pantry terkemuka di dunia, yang dikenal karena inovasi, kemudahan penggunaan,
              dan dampak positifnya terhadap lingkungan dan gaya hidup sehat. Kami membayangkan dunia di mana tidak ada
              makanan yang terbuang sia-sia.
            </p>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 mt-16 animate-in fade-in-up duration-700 delay-600">
          Nilai-nilai Inti Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in-up"
              style={{ animationDelay: `${index * 100 + 700}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                  {value.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  )
}
