import { Label, Card, Carousel, CarouselContent, CarouselControls, CarouselItem, CardHeader, CardTitle, CardContent } from "xyz-comp";

export default function CarouselPage() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-6 grid-cols-1 gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Default Carousel Component</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel enableDots nextSlideAriaLabel="test" prevSlideAriaLabel="test">
            <CarouselContent>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(val =>
                <CarouselItem key={val}>
                  <div>
                    <Label className="block">Başlık 1</Label>
                    <Label className="text-xs">Metin: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, necessitatibus!</Label>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselControls />
          </Carousel>
        </CardContent>
      </Card>

      <Card >
        <CardHeader>
          <CardTitle>Resimli Carousel Component</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel
            opts={{
              loop: true,
              align: 'center',
              containScroll: false,
            }}
            enableWheel // fare tekerleğiyle geçiş
            enableAutoplay // otomatik oynatmayı aktif edin
            enableFade // Animayonu aktif edin
            autoplayOptions={{
              // Carousel itemler arası geçiş süresi
              delay: 4000,
              // Mouse vb. etkileşim olsa bile autoplay devam etsin 
              stopOnInteraction: false,
              // Focus alınca dursun, focus çıkınca tekrar devam etsin
              stopOnFocusIn: true
            }}
          >
            <CarouselContent >
              <CarouselItem >
                <img src="https://m.media-amazon.com/images/I/71vo29ScpML._AC_UF1000,1000_QL80_.jpg" alt="" />
              </CarouselItem>
              <CarouselItem >
                <img src="https://natukbirkan.itugvo.k12.tr/content/img_cache/860/0/Elif-Karakaya.jpg" alt="" />
              </CarouselItem>
              <CarouselItem >
                <img src="https://m.media-amazon.com/images/I/71vo29ScpML._AC_UF1000,1000_QL80_.jpg" alt="" />
              </CarouselItem>
              <CarouselItem>
                <img src="https://natukbirkan.itugvo.k12.tr/content/img_cache/860/0/Elif-Karakaya.jpg" alt="" />
              </CarouselItem>
            </CarouselContent>
            <CarouselControls />
          </Carousel>
        </CardContent>
      </Card>

      <Card >
        <CardHeader>
          <CardTitle>Dikey Resimli Carousel Component</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel orientation="vertical">
            <CarouselContent className="max-h-96">
              <CarouselItem >
                <img
                  src="https://m.media-amazon.com/images/I/71vo29ScpML._AC_UF1000,1000_QL80_.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem >
                <img
                  src="https://natukbirkan.itugvo.k12.tr/content/img_cache/860/0/Elif-Karakaya.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem >
                <img
                  src="https://m.media-amazon.com/images/I/71vo29ScpML._AC_UF1000,1000_QL80_.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem >
                <img
                  src="https://natukbirkan.itugvo.k12.tr/content/img_cache/860/0/Elif-Karakaya.jpg"
                  alt=""
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselControls />
          </Carousel>
        </CardContent>
      </Card>

      <Card >
        <CardHeader>
          <CardTitle>Dikey Başlık ve Açıklama içeren Carousel Component</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel orientation="vertical" className="mt-32" opts={{ loop: true }}>
            <CarouselContent className="max-h-96">
              <CarouselItem className="min-h-[380px]">
                <Label className="block">Başlık 1</Label>
                <Label className="text-xs">Metin: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, necessitatibus!</Label>
              </CarouselItem>
              <CarouselItem className="min-h-[380px]">
                <Label className="block">Başlık 2</Label>
                <Label className="text-xs">Metin: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, necessitatibus!</Label>
              </CarouselItem>
              <CarouselItem className="min-h-[380px]">
                <Label className="block">Başlık 3</Label>
                <Label className="text-xs">Metin: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, necessitatibus!</Label>
              </CarouselItem>
              <CarouselItem className="min-h-[380px]">
                <Label className="block">Başlık 4</Label>
                <Label className="text-xs">Metin: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, necessitatibus!</Label>
              </CarouselItem>
            </CarouselContent>
            <CarouselControls />
          </Carousel>
        </CardContent>
      </Card>

    </div>
  )
}